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
		var ball_1 = new Ball(vec3.fromValues(0,0,0),vec3.fromValues(0,0,0),parseFloat($("#ball_radius").html()),1);
		ball_array.push(ball_1);
		var ball_2 = new Ball(vec3.fromValues(5.0,1.0,0.0),vec3.fromValues(-vRange,0,0),parseFloat($("#ball_radius").html()),1);
		ball_array.push(ball_2);
	}else{
		for (var i=0; i < ball_num/2; i++){
			var vRange = parseFloat($("#ball_speed").html());
			var randPos = vec3.fromValues(getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			//var randVel = vec3.fromValues(getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange));
			var randVel = vec3.fromValues(vRange,vRange,vRange);
			var iBall = new Ball(randPos,randVel,parseFloat($("#ball_radius").html()),1);
			//console.log(iBall.position);
			ball_array.push(iBall);
			//console.log(ball_array[i].position);
		}
		for (var i=ball_num/2; i < ball_num; i++){
			var vRange = parseFloat($("#ball_speed").html())*0;
			var randPos = vec3.fromValues(getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			var randVel = vec3.fromValues(getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange));
			var iBall = new Ball(randPos,randVel,parseFloat($("#ball_radius").html()),1);
			//console.log(iBall.position);
			ball_array.push(iBall);
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
	var ball_num1 = $("#ball_number").html()/2;
	for(i=0;i < ball_num1;i++){
		processCollisions(i);
		if(document.getElementById("toggle_display").checked){
			//TODO make color editable
			var ballColor = [0,0,1,1]; 
			drawSphere(ball_array[i].position,ballColor);
		}
		//add velocity to sort array
		sortVelocity(vec3.clone(ball_array[i].velocity)); //could be before too
		sortSub1(vec3.clone(ball_array[i].velocity)); //could be before too
	}
	var ball_num2 = $("#ball_number").html()/2;
	for(i=ball_num1;i < ball_num1+ball_num2;i++){
		processCollisions(i);
		if(document.getElementById("toggle_display").checked){
			//TODO make color editable
			var ballColor = [1,0,0,1]; 
			drawSphere(ball_array[i].position,ballColor);
		}
		//add velocity to sort array
		sortVelocity(vec3.clone(ball_array[i].velocity)); //could be before too
		sortSub2(vec3.clone(ball_array[i].velocity)); //could be before too
	}
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
		$("#box_pressure").html(Math.round(tot_impulse/interval));
		momentum_changes = [];
		startTime = currTime;
	}
}

function processCollisions(index){
	i = index;
	
	//increment position by velocity vector
	iBall = ball_array[i];
	var old_pos = vec3.clone(iBall.position);
	vec3.add(iBall.position,iBall.position,iBall.velocity);
	_octree.ballMoved(iBall,old_pos);
	
	
	// collision detection
	handleBallWallCollisions(iBall);
	var ball_num =  parseInt($("#ball_number").html());
	for (var j=0;j<ball_num;j++){
		jBall = ball_array[j];
		if(i!=j){
			handleBallBallCollisions(iBall,jBall);
		}
	}
}

/**
 * Returns a direction vector for the given wall's normal
 */
function getWallDirection(wall){
	switch (wall) {
		case 0: //WALL_LEFT
			return vec3.fromValues(-1, 0, 0);
		case 1: //WALL_RIGHT
			return vec3.fromValues(1, 0, 0);
		case 2: //WALL_FAR
			return vec3.fromValues(0, 0, -1);
		case 3: //WALL_NEAR
			return vec3.fromValues(0, 0, 1);
		case 4: //WALL_TOP
			return vec3.fromValues(0, 1, 0);
		case 5: //WALL_BOTTOM
			return vec3.fromValues(0, -1, 0);
		default:
			return vec3.fromValues(0, 0, 0);
	}
}

function testBallWallCollisions(iBall,wall){
	var bound = parseFloat($("#box_length").html());
	var iPos = iBall.position;
	var iVel = iBall.velocity;
	var mass = iBall.mass;
	var radius = iBall.radius;
	
	var dir = getWallDirection(wall);
	return (vec3.dot(iPos,dir)+radius > bound && vec3.dot(iVel,dir)>0);
}

function handleBallWallCollisions(iBall){
	var bound = parseFloat($("#box_length").html());
	var bbp_list =[];
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
}

function testBallBallCollisions(iBall,jBall){
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

function handleBallBallCollisions(iBall,jBall){
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
}


