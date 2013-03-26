// global values are used for carrying out important 
// collision computations
var ball_array = [];
var _octree = new Octree(0,0,0);
var impulse_total = 0;
var momentum_changes = [];
var impulse_depth = 10;
var startTime = new Date().getTime();

function getRecentImpulse(){
	// update the impulse value
	var impulse_tot = 0;
	//console.log(momentum_changes.length);
	for(var i=0;i < momentum_changes.length;i++) {
		if(momentum_changes[i]){
			impulse_tot += momentum_changes[i];
			//console.log(momentum_changes[i]);
		}
	}
	return impulse_tot;
}

/**
 * Constructor for Ball object
 * with specified position and velocity
 * and default values for radius and mass
 */
function Ball(position,velocity,radius,mass){
	this.position=position;
	this.velocity=velocity;
	this.radius=radius;
	this.mass=mass;
}

/**
 * makes an array of a certain length filled with a certain value
 * copied from http://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
 */
function makeArrayOf(value, length) {
  var arr = [], i = length;
  while (i--) {
    arr[i] = value;
  }
  return arr;
}


/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}


function initWorld() {
	var ball_num =  parseInt($("#ball_number").html());
	var pRange = parseFloat($("#box_length").html());
	var vRange = parseFloat($("#ball_speed").html());
	//Octree test
		var c1 =  vec3.fromValues(-pRange,-pRange,-pRange);
		var c2 =  vec3.fromValues(pRange,pRange,pRange);
		var depth = 0;
		_octree = new Octree(c1,c2,depth);
		//octree.remove(0,0);
		//octree.haveChildren();
		//console.log(octree.depth);
	//end Octree test
	if(document.getElementById("debug").checked){
		// special debug mode for testing collision between two balls
		ball_num = 2;
		$("#ball_number").html(ball_num);
		var ball_size= 3;
		$("#ball_radius").html(ball_size);
		var ball_1 = new Ball(vec3.fromValues(-3,0,0),vec3.fromValues(0,0,0),parseFloat($("#ball_radius").html()),1);
		ball_array.push(ball_1);
		_octree.add(ball_1);
		var ball_2 = new Ball(vec3.fromValues(5.0,2.0,0.0),vec3.fromValues(-vRange,0,0),parseFloat($("#ball_radius").html()),1);
		ball_array.push(ball_2);
		_octree.add(ball_2);
	}else{
		// guarantee that uneven ballnum doesnt generate error
		for (var i=0; i < parseInt(ball_num/2); i++){
			//var pRange = parseFloat($("#box_length").html());
			//var vRange = parseFloat($("#ball_speed").html());
			//var randPos = vec3.fromValues(getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			var randPos = vec3.fromValues(getRandomArbitary(0,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			//var randVel = vec3.fromValues(getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange));
			//var randVel = vec3.fromValues(vRange,vRange,vRange);
			var randVel = vec3.fromValues(-vRange,0,0);
			var iBall = new Ball(randPos,randVel,parseFloat($("#ball_radius").html()),1);
			//console.log(iBall.position);
			ball_array.push(iBall);
			_octree.add(iBall);
			//console.log(ball_array[i].position);
		}
		for (var i=parseInt(ball_num/2); i < ball_num; i++){
			//var pRange = parseFloat($("#box_length").html());
			//var vRange = parseFloat($("#ball_speed").html())*0;
			//var randPos = vec3.fromValues(getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			var randPos = vec3.fromValues(getRandomArbitary(-pRange,0),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			//var randVel = vec3.fromValues(getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange));
			var randVel = vec3.fromValues(0,0,0);
			var iBall = new Ball(randPos,randVel,parseFloat($("#ball_radius").html()),1);
			//console.log(iBall.position);
			ball_array.push(iBall);
			_octree.add(iBall);
			//console.log(ball_array[i].position);
			//octree.add(iBall);
			//octree.fileBall(iBall,iBall.position,true);
			//var ball_set = [];
			//octree.collectBalls(ball_set);
			//console.log(ball_set.length);
		}
	}
}

function handlePhysics(){
	temp_array = makeArrayOf(0,tick_count);
	temp_sub1_array = makeArrayOf(0,tick_count);
	temp_sub2_array = makeArrayOf(0,tick_count);
	var ball_num1 = parseInt($("#ball_number").html()/2);
	for(i=0;i < ball_num1;i++){
		iBall = ball_array[i];
		updatePosition(iBall);
		if(document.getElementById("toggle_display").checked){
			//TODO make color editable
			var ballColor = [0,0,1,1]; 
			drawSphere(iBall.position,ballColor);
		}
		//add velocity to sort array
		sortVelocity(vec3.clone(iBall.velocity)); //could be before too
		sortSub1(vec3.clone(iBall.velocity)); //could be before too
	}
	var ball_num2 = parseInt($("#ball_number").html()/2)+$("#ball_number").html()%2;
	for(i=ball_num1;i < ball_num1+ball_num2;i++){
		iBall = ball_array[i];
		updatePosition(iBall);
		if(document.getElementById("toggle_display").checked){
			//TODO make color editable
			var ballColor = [1,0,0,1]; 
			drawSphere(iBall.position,ballColor);
		}
		//add velocity to sort array
		sortVelocity(vec3.clone(iBall.velocity)); //could be before too
		sortSub2(vec3.clone(iBall.velocity)); //could be before too
	}
	handleBallBallCollisions(ball_array,_octree);
	handleBallWallCollisions(ball_array,_octree);
	velRange_array = temp_array;
	velRange_sub1_array = temp_sub1_array;
	velRange_sub2_array = temp_sub2_array;
	updateStats();
}

function updateStats(){
	//averageImpulse();
	var currTime = new Date().getTime();
	var elapsedTime = currTime - startTime;
	var interval = 1; // in seconds
	$("#run_time").html(Math.round(elapsedTime/1000));
	//$("#box_pressure").html(Math.round(impulse_total));
	//console.log(elapsedTime);
	//$("#box_pressure").html(Math.round(impulse_total*100000/elapsedTime)/10);
	if(elapsedTime >= interval * 1000){
		var tot_impulse = getRecentImpulse();
		//console.log(tot_impulse);
		var side_length = parseFloat($("#box_length").html());
		var surface_area = 2*side_length*side_length+(4*side_length*side_length);
		$("#box_area").html(Math.round(surface_area));
		$("#box_pressure").html(Math.round(tot_impulse/(interval*surface_area)));
		momentum_changes = [];
		startTime = currTime;
	}
}

function updatePosition(ball){
	//increment position by velocity vector
	var old_pos = vec3.clone(ball.position);
	vec3.add(ball.position,ball.position,ball.velocity);
	_octree.ballMoved(ball,old_pos);
}

/**
 * Returns a direction vector for the given wall's normal
 */
function getWallDirection(wall){
	switch (wall) {
		case "WALL_LEFT": //WALL_LEFT
		//case 0: //WALL_LEFT
			return vec3.fromValues(-1, 0, 0);
		//case 1: //WALL_RIGHT
		case "WALL_RIGHT": //
			return vec3.fromValues(1, 0, 0);
		//case 2: //WALL_FAR
		case "WALL_FAR": //WALL_FAR
			return vec3.fromValues(0, 0, -1);
		//case 3: //WALL_NEAR
		case "WALL_NEAR": //WALL_NEAR
			return vec3.fromValues(0, 0, 1);
		//case 4: //WALL_TOP
		case "WALL_TOP": //WALL_TOP
			return vec3.fromValues(0, 1, 0);
		case "WALL_BOTTOM": //WALL_BOTTOM
			return vec3.fromValues(0, -1, 0);
		default:
			return vec3.fromValues(0, 0, 0);
	}
}

function testBallWallCollision(iBall,wall){
	var bound = parseFloat($("#box_length").html());
	var iPos = iBall.position;
	var iVel = iBall.velocity;
	var mass = iBall.mass;
	var radius = iBall.radius;
	
	var dir = getWallDirection(wall);
	// check for collision with stopper
	var compression = parseFloat($("#compression").html());
	//var side_length = parseFloat($("#box_length").html());
	//if (vec3.dot(iPos,dir)+ radius >= compression+side_length &&vec3.dot(iVel,dir)>0){
	//}
	//console.log("dir is: "+ dir);
	//TODO add the stpper check to potentialBallWallPairs
	if(vec3.dot(dir,vec3.fromValues(1, 0, 0))==1){
		bound += compression;
		//console.log("new bound is: "bound);
	}
	return (vec3.dot(iPos,dir)+radius > bound && vec3.dot(iVel,dir)>0);
}

//Handles all ball-wall collisions
function handleBallWallCollisions(balls,octree) {
	var bwp_list = [];
	octree.potentialBallWallCollisionsSwitch(bwp_list);
	for(var i = 0; i < bwp_list.length; i++) {
		var bwp = bwp_list[i];
		
		var ball = bwp.ball;
		var wall = bwp.wall;
		if (testBallWallCollision(ball,wall)) {
			//Make the ball reflect off of the wall
			dirV = getWallDirection(wall);
			var ndirV = vec3.create();
			vec3.normalize(ndirV,dirV);
			
			var velProj = vec3.create();
			velProj = vec3.dot(ball.velocity,ndirV);
			
			var velScal = vec3.create();
			var result = vec3.create();
			vec3.multiply(velScal,ndirV,vec3.fromValues(velProj,velProj,velProj));
			vec3.multiply(result,vec3.fromValues(2,2,2),velScal);
			
			var old_vel = vec3.clone(ball.velocity);
			vec3.subtract(ball.velocity,ball.velocity,result);
			var deltaV = vec3.distance(ball.velocity,old_vel);
			momentum_changes.push(ball.mass*deltaV);
		}
	}
}

/*function handleBallWallCollisions(iBall){
	var bound = parseFloat($("#box_length").html());
	var bwp_list =[];
	//potentialBallWallCollisions(bwps, balls, octree);
	
	var iPos = iBall.position;
	var iVel = iBall.velocity;
	var mass = iBall.mass;
	var radius = iBall.radius;
	for(k=0;k<6;k++){
		if(testBallWallCollisions(iBall,k)){
			dirV = getWallDirection(k);
			var ndirV = vec3.create();
			vec3.normalize(ndirV,dirV);
			
			var velProj = vec3.create();
			velProj = vec3.dot(iBall.velocity,ndirV);
			
			var velScal = vec3.create();
			var result = vec3.create();
			vec3.multiply(velScal,ndirV,vec3.fromValues(velProj,velProj,velProj));
			vec3.multiply(result,vec3.fromValues(2,2,2),velScal);
			
			var old_vel = vec3.clone(iBall.velocity);
			vec3.subtract(iBall.velocity,iBall.velocity,result);
			var deltaV = vec3.distance(iBall.velocity,old_vel);
			momentum_changes.push(iBall.mass*deltaV);
		}
	}
	// check for collision with stopper
	var compression = parseFloat($("#compression").html());
	var side_length = parseFloat($("#box_length").html());
	if (((iPos[0]  + radius >= compression+side_length)&&(iVel[0]>=0))){
		iVel[0] *= -1; // reverse direction
		impulse_total += 2*mass*Math.abs(iVel[0]); // add change to total impulse
		momentum_changes.push(2*mass*Math.abs(iVel[0]));
	}
}*/

function testBallBallCollision(iBall,jBall){
	//potentialBallBallCollisions(bbp_list,ball_array,_octree);
	
	var iPos = iBall.position;
	var iVel = iBall.velocity;
	var jPos = jBall.position;
	var jVel = jBall.velocity;
	var seperation = vec3.distance(iPos,jPos);
	//console.log("seperation is: " + seperation);
	if (seperation <= (iBall.radius + jBall.radius)){
		var displacement = vec3.create();
		var netVelocity = vec3.create();
		vec3.subtract(displacement,iPos,jPos);
		vec3.subtract(netVelocity,iVel,jVel);
		// only collide balls headed toward one another
		return(vec3.dot(netVelocity,displacement)<0);
	}
	else{
		return false;
	}
}

//Handles all ball-ball collisions
function handleBallBallCollisions(balls,octree) {
	var bbp_list = [];
	potentialBallBallCollisions(bbp_list, balls, octree);
	for(var i = 0; i < bbp_list.length; i++) {
		var bbp = bbp_list[i];
		
		var b1 = bbp.ball1;
		var b2 = bbp.ball2;
		if (testBallBallCollision(b1, b2)) {
			//Make the balls reflect off of each other
			var iPos = b1.position;
			var iVel = b1.velocity;
			var jPos = b2.position;
			var jVel = b2.velocity;
			
			//#collision vector
			//console.log("Collision!");
			var collisionV = vec3.create();
			vec3.subtract(collisionV,iPos,jPos);
			var ncollisionV = vec3.create();
			vec3.normalize(ncollisionV,collisionV);

			iInit = vec3.dot(iVel,ncollisionV);
			jInit = vec3.dot(jVel,ncollisionV);
			
			//#elastic collision
			var iFin = jInit;
			var jFin = iInit;
			var iDiff = iFin - iInit;
			var jDiff = jFin - jInit;
			var iProj = vec3.create();
			var jProj = vec3.create();
			vec3.multiply(iProj,ncollisionV,vec3.fromValues(iDiff,iDiff,iDiff));
			vec3.multiply(jProj,ncollisionV,vec3.fromValues(jDiff,jDiff,jDiff));
			var new_veli = vec3.create();
			var new_velj = vec3.create();
			vec3.add(new_veli,iVel,iProj);
			vec3.add(new_velj,jVel,jProj);
			b1.velocity = new_veli;
			b2.velocity  = new_velj;
		}
	}
}

/*function handleBallBallCollisions(iBall,jBall){
	var bbp_list = [];
	bbp_list = potentialBallBallCollisions(bbp_list,ball_array,_octree);
	console.log(bbp_list.length);
	
	if (testBallBallCollisions(iBall,jBall)){
		var iPos = iBall.position;
		var iVel = iBall.velocity;
		var jPos = jBall.position;
		var jVel = jBall.velocity;
		
		//#collision vector
		//console.log("Collision!");
		var collisionV = vec3.create();
		vec3.subtract(collisionV,iPos,jPos);
		var ncollisionV = vec3.create();
		vec3.normalize(ncollisionV,collisionV);

		iInit = vec3.dot(iVel,ncollisionV);
		jInit = vec3.dot(jVel,ncollisionV);
		
		//#elastic collision
		var iFin = jInit;
		var jFin = iInit;
		var iDiff = iFin - iInit;
		var jDiff = jFin - jInit;
		var iProj = vec3.create();
		var jProj = vec3.create();
		vec3.multiply(iProj,ncollisionV,vec3.fromValues(iDiff,iDiff,iDiff));
		vec3.multiply(jProj,ncollisionV,vec3.fromValues(jDiff,jDiff,jDiff));
		var new_veli = vec3.create();
		var new_velj = vec3.create();
		vec3.add(new_veli,iVel,iProj);
		vec3.add(new_velj,jVel,jProj);
		iBall.velocity = new_veli;
		jBall.velocity  = new_velj;
	}
}*/


