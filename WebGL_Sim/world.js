// global values are used for carrying out important 
// collision computations
var posV = [];
var velV = [];

var impulse_total = 0;
var startTime = new Date().getTime();

var tick_count = 10;
var temp_array = makeArrayOf(0,tick_count);
var velRange_array = makeArrayOf(0,tick_count);

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
	//console.log(vRange);
	//console.log(tick_range);
	for(i=0;i<=tick_count;i++){
		var velMag = vec3.length(velocity);
		//console.log(velMag);
		//console.log(i * tick_range);
		if( (velMag > (2*(i) * tick_range))&&
			(velMag < (2*(i+1) * tick_range))){
				temp_array[i] += 1;
		}
	}
}

function initWorld() {
	var ball_num =  parseInt($("#ball_number").html());
	var bound = parseFloat($("#box_length").html());
	//var bound = $( ".selector" ).slider( "value" );
	var pRange = bound;
	var vRange = parseFloat($("#ball_speed").html());
	console.log("box_length is: " + bound);
	console.log("pRange is: " + pRange);
	console.log("vRange is: " + vRange);
	if(document.getElementById("debug").checked){
		// special debug mode for testing collision between two balls
		ball_num = 2;
		$("#ball_number").html(ball_num);
		posV.push(vec3.fromValues(0,0,0));
		velV.push(vec3.fromValues(0,0,0));
		posV.push(vec3.fromValues(5.0,1.0,0.0));
		velV.push(vec3.fromValues(-vRange,0,0));
	}else{
		for (var i=0; i < ball_num; i++){
			var randPos = vec3.fromValues(getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			var randVel = vec3.fromValues(getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange));
			posV.push(randPos);
			velV.push(randVel);
		}
	}
	// create size of empty graph array
	for(i=0;i<tick_count;i++){
		temp_array.push(1);
	}
}

function handlePhysics(){
	temp_array = makeArrayOf(0,tick_count);
	//drawBox();
	
	var ball_num = $("#ball_number").html();
	for(i=0;i < ball_num;i++){
		//console.log("loop"+i);
		processCollisions(i);
		drawSphere(posV[i]);
		//add velocity to sort array
		//sortVelocity(vec3.clone(velV[i])); //could be before too
	}
	velRange_array = temp_array;
	drawBox();
}

function processCollisions(index){
	i = index;
	
	var currTime = new Date().getTime() - startTime;
	$("#run_time").html(Math.round(currTime/1000));
	//$("#box_pressure").html(Math.round(impulse_total));
	$("#box_pressure").html(Math.round(impulse_total*100000/currTime)/10);
	//console.log(currTime/1000);
	
	//increment position by velocity vector
	vec3.add(posV[i],posV[i],velV[i]);
	
	iPos = vec3.clone(posV[i]);
	iVel = vec3.clone(velV[i]);
	
	// collision detection
	var bound = parseFloat($("#box_length").html());
	//var bound = $( ".selector" ).slider( "value" );
	var pRange = bound;
	var radius =  parseFloat($("#ball_radius").html());
	var mass = 1; // mass for each particle
	//console.log("radius is: " + radius);
	var ball_num =  parseInt($("#ball_number").html());

	if (((iPos[0] - radius <= -bound)&&(iVel[0]<=0))||((iPos[0]  + radius >= bound)&&(iVel[0]>=0))){
		velV[i][0] *= -1; // reverse direction
		impulse_total += 2*mass*Math.abs(velV[i][0]); // add change to total impulse
		//setTimeout("impulse_total-=2*Math.abs(velV[i][0])",1000);
		//console.log(impulse);
	}if (((iPos[1] - radius <= -bound)&&(iVel[1]<=0))||((iPos[1] + radius >= bound)&&(iVel[1]>=0))){
		velV[i][1] *= -1;
		//console.log(impulse);
		impulse_total += 2*mass*Math.abs(velV[i][1]);
		//setTimeout("impulse_total-=2*Math.abs(velV[i][1])",1000);
	}if (((iPos[2] - radius <= -bound)&&(iVel[2]<=0))||((iPos[2] + radius >= bound)&&(iVel[2]>=0))){
		velV[i][2] *= -1;
		var z_change = 2*mass*Math.abs(velV[i][2]);
		impulse_total += z_change;
		//setTimeout("decrement_impulse(z_change,10000)");
		//setTimeout("impulse_total-=2*Math.abs(velV[i][2])",1000);
		//console.log(impulse);
	}
	
	
	for (var j=0;j<ball_num;j++){
		//iPos = vec3.clone(posV[i]);
		jPos = vec3.clone(posV[j]);
		//iVel = vec3.clone(velV[i]);
		jVel = vec3.clone(velV[j]);

		if(i!=j){
			//var seperation = vec3.create();
			//vec3.distance(seperation,iPos,jPos);
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
					//glm::vec3 iProj = ncollisionV * iDiff ;
					//glm::vec3 jProj = ncollisionV * jDiff;
					vec3.multiply(iProj,ncollisionV,vec3.fromValues(iDiff,iDiff,iDiff));
					vec3.multiply(jProj,ncollisionV,vec3.fromValues(jDiff,jDiff,jDiff));
					var new_veli = vec3.create();
					var new_velj = vec3.create();
					//new_veli = vel_Vectors[i] + iProj;
					//new_velj = vel_Vectors[j] + jProj;
					vec3.add(new_veli,iVel,iProj);
					vec3.add(new_velj,jVel,jProj);
					velV[i] = new_veli;
					velV[j] = new_velj;
				}
			}
		}
	}
}
