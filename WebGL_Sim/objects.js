
//var ball_num = document.getElementById("ball_number").innerHTML();
//var ball_num =  $("#ball_number").html();
//var ball_num = 10;
var posV = [];
var velV = [];

//var V1 = $V([3,4,5]);
//var V2 = $V([9,-3,0]);
//var V1 = vec3.create();
//var V2 = vec3.create();
/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

function initWorldObjects() {
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
		var V1 = vec3.fromValues(0,0,0);
		var V2 = vec3.fromValues(0,0,0);
		posV.push(V1);
		velV.push(V2);
		var V1 = vec3.fromValues(5.0,1.0,0.0);
		var V2 = vec3.fromValues(-vRange,0,0);
		posV.push(V1);
		velV.push(V2);
	}else{
		for (var i=0; i < ball_num; i++){
			var V1 = vec3.fromValues(getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange),getRandomArbitary(-pRange,pRange));
			var V2 = vec3.fromValues(getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange),getRandomArbitary(-vRange,vRange));
			posV.push(V1);
			velV.push(V2);
		}
	}
}

function processCollisions(index){
	i = index;
	
	//increment position by velocity vector
	vec3.add(posV[i],velV[i]);
	
	iPos = vec3.clone(posV[i]);
	iVel = vec3.clone(velV[i]);
	
	// collision detection
	var bound = parseFloat($("#box_length").html());
	//var bound = $( ".selector" ).slider( "value" );
	var pRange = bound;
	var radius =  parseFloat($("#ball_radius").html());
	//console.log("radius is: " + radius);
	var ball_num =  parseInt($("#ball_number").html());
	//console.log("radius is: " + radius);
	//console.log("box_length is: " + bound);
	//console.log(posV[i].e(1));
	//if (((posV[i][0] - radius <= -bound)&&(velV[i][0]<=0))||((posV[i][0]  + radius >= bound)&&(velV[i][0]>=0))){
	//	velV[i][0] *= -1;
	//}if (((posV[i][1] - radius <= -bound)&&(velV[i][1]<=0))||((posV[i][1] + radius >= bound)&&(velV[i][1]>=0))){
	//	velV[i][1] *= -1;
	//}if (((posV[i][2] - radius <= -bound)&&(velV[i][2]<=0))||((posV[i][2] + radius >= bound)&&(velV[i][2]>=0))){
	//	velV[i][2] *= -1;
	//}
	if (((iPos[0] - radius <= -bound)&&(iVel[0]<=0))||((iPos[0]  + radius >= bound)&&(iVel[0]>=0))){
		velV[i][0] *= -1;
	}if (((iPos[1] - radius <= -bound)&&(iVel[1]<=0))||((iPos[1] + radius >= bound)&&(iVel[1]>=0))){
		velV[i][1] *= -1;
	}if (((iPos[2] - radius <= -bound)&&(iVel[2]<=0))||((iPos[2] + radius >= bound)&&(iVel[2]>=0))){
		velV[i][2] *= -1;
	}
	
	
	for (var j=0;j<ball_num;j++){
			//iPos = vec3.clone(posV[i]);
			jPos = vec3.clone(posV[j]);
			//iVel = vec3.clone(velV[i]);
			jVel = vec3.clone(velV[j]);
			//iPos = posV[i];
			//jPos = posV[j];
			//iVel = velV[i];
			//jVel = velV[j];
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
				//if(vec3.dot(netVelocity,displacement)<0){
					if (seperation <= 2 * radius){
						//#collision vector
						//console.log("Collision!");
						/*var collisionV = vec3.create();
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
						velV[j] = new_velj;*/

						new_veli = (velV[j]);
						new_velj = (velV[i]);
						velV[i] = new_veli;
						velV[j] = new_velj;
					}
				//}
			}
		}
	
}
