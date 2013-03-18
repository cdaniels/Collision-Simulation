// global values are used for carrying out important 
// collision computations
var ball_array = [];

var impulse_total = 0;
var startTime = new Date().getTime();

var tick_count = 10;
var temp_array = makeArrayOf(0,tick_count);
var velRange_array = makeArrayOf(0,tick_count);

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

function sortVelocity(velocity){
	var vRange = parseFloat($("#ball_speed").html());
	var tick_range = vRange/tick_count;
	for(j=0;j<=tick_count;j++){
		var velMag = vec3.length(velocity);
		if( (velMag > (2*(j) * tick_range))&&
			(velMag < (2*(j+1) * tick_range))){
				temp_array[j] += 1;
		}
	}
}

function initWorld() {
	var ball_num =  parseInt($("#ball_number").html());
	var bound = parseFloat($("#box_length").html());
	var pRange = bound;
	var vRange = parseFloat($("#ball_speed").html());
	console.log("box_length is: " + bound);
	console.log("pRange is: " + pRange);
	console.log("vRange is: " + vRange);
	if(document.getElementById("debug").checked){
		// special debug mode for testing collision between two balls
		ball_num = 2;
		$("#ball_number").html(ball_num);
		position_array.push(vec3.fromValues(0,0,0));
		velocity_array.push(vec3.fromValues(0,0,0));
		position_array.push(vec3.fromValues(5.0,1.0,0.0));
		velocity_array.push(vec3.fromValues(-vRange,0,0));
	}else{
		for (var i=0; i < ball_num; i++){
			var randPos = vec3.fromValues(getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			var randVel = vec3.fromValues(getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange));
			var iBall = new Ball(randPos,randVel,parseFloat($("#ball_radius").html()),1);
			//console.log(iBall.position);
			ball_array.push(iBall);
			//console.log(ball_array[i].position);
		}
	}
}

function handlePhysics(){
	temp_array = makeArrayOf(0,tick_count);
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
	}
	velRange_array = temp_array;
}

function processCollisions(index){
	i = index;
	
	var currTime = new Date().getTime() - startTime;
	$("#run_time").html(Math.round(currTime/1000));
	//$("#box_pressure").html(Math.round(impulse_total));
	$("#box_pressure").html(Math.round(impulse_total*100000/currTime)/10);
	//console.log(currTime/1000);
	
	//increment position by velocity vector
	iBall = ball_array[i];
	vec3.add(iBall.position,iBall.position,iBall.velocity);
	
	// collision detection
	var bound = parseFloat($("#box_length").html());
	//var bound = $( ".selector" ).slider( "value" );
	var pRange = bound;
	var radius =  parseFloat($("#ball_radius").html());
	var mass = 1; // mass for each particle
	//console.log("radius is: " + radius);
;
	handleBallWallCollisions(iBall);

	var ball_num =  parseInt($("#ball_number").html());
	for (var j=0;j<ball_num;j++){
		jBall = ball_array[j];
		if(i!=j){
			handleBallBallCollisions(iBall,jBall);
		}
	}
}

function handleBallWallCollisions(iBall){
	var bound = parseFloat($("#box_length").html());
	var iPos = iBall.position;
	var iVel = iBall.velocity;
	var mass = iBall.mass;
	var radius = iBall.radius;
	//var bound = $( ".selector" ).slider( "value" );
	if (((iPos[0] - radius <= -bound)&&(iVel[0]<=0))||((iPos[0]  + radius >= bound)&&(iVel[0]>=0))){
		iVel[0] *= -1; // reverse direction
		impulse_total += 2*mass*Math.abs(iVel[0]); // add change to total impulse
	}if (((iPos[1] - radius <= -bound)&&(iVel[1]<=0))||((iPos[1] + radius >= bound)&&(iVel[1]>=0))){
		iVel[1] *= -1; // reverse direction
		impulse_total += 2*mass*Math.abs(iVel[1]);
	}if (((iPos[2] - radius <= -bound)&&(iVel[2]<=0))||((iPos[2] + radius >= bound)&&(iVel[2]>=0))){
		iVel[2] *= -1; // reverse direction
		var z_change = 2*mass*Math.abs(iVel[2]);
		impulse_total += z_change;
	}
	// check for collision with stopper
	var compression = parseFloat($("#compression").html());
	var side_length = parseFloat($("#box_length").html());
	if (((iPos[0]  + radius >= compression+side_length)&&(iVel[0]>=0))){
		iVel[0] *= -1; // reverse direction
		impulse_total += 2*mass*Math.abs(iVel[0]); // add change to total impulse
	}
}

function handleBallBallCollisions(iBall,jBall){
	var iPos = iBall.position;
	var iVel = iBall.velocity;
	var mass = iBall.mass;
	var radius = iBall.radius;
	var jPos = jBall.position;
	var jVel = jBall.velocity;
	var seperation = vec3.distance(iPos,jPos);
	//console.log("seperation is: " + seperation);
	var displacement = vec3.create();
	var netVelocity = vec3.create();
	vec3.subtract(displacement,iPos,jPos);
	vec3.subtract(netVelocity,iVel,jVel);
	
	// only collide balls headed toward one another
	if(vec3.dot(netVelocity,displacement)<0){
		if (seperation <= 2 * radius){
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
}


