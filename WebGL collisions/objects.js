
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

function initWorldObjects(particle_num) {
	var ball_num =  $("#ball_number").html();
	//var ball_num = particle_num;

	//var ball_num = 20;
	var pRange = 4.0;
	//var vRange = 0.5;
	//var speed = 0.2;
	//var speed =  $("#ball_speed").html();
	var vRange = $("#ball_speed").html();
	console.log(vRange);
	if(document.getElementById("debug").checked){
		// special debug mode for testing collision between two balls
		ball_num = 2;
		var V1 = vec3.fromValues(0,0,0);
		var V2 = vec3.fromValues(0,0,0);
		posV.push(V1);
		velV.push(V2);
		var V1 = vec3.fromValues(1,1,0);
		var V2 = vec3.fromValues(-0.2,0,0);
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
	
	
	
	/*var numStars = 50;

	for (var i=0; i < numStars; i++) {
	  stars.push(new Star((i / numStars) * 5.0, i / numStars));
	}*/
}

function processCollisions(index){

	i = index;
	
	//increment position by velocity vector
	//posV[i] = V3.add(posV[i],velV[i]);
	//var old_posV = posV[i];
	//var new_posV = vec3.create();
	vec3.add(posV[i],velV[i]);
	//posV[i] = new_posV;
	//posV[i][0] += velV[i][0];
	//posV[i][1] += velV[i][1];
	//posV[i][2] += velV[i][2];
	
	// collision detection
	var bound = box_length;
	//var radius = ball_radius;
	var radius =  $("#ball_radius").html();
	var ball_num =  $("#ball_number").html();
	//GLfloat radius = test_ball.getRadius();
	//console.log(posV[i].e(1));
	if ((posV[i][0] - radius <= -bound)||(posV[i][0]  + radius >= bound)){
		velV[i][0] *= -1;
	}if ((posV[i][1] - radius <= -bound)||(posV[i][1] + radius >= bound)){
		velV[i][1] *= -1;
	}if ((posV[i][2] - radius <= -bound)||(posV[i][2] + radius >= bound)){
		velV[i][2] *= -1;
	}
	
	for (var j=0;j<ball_num;j++){
			iPos = vec3.clone(posV[i]);
			jPos = vec3.clone(posV[j]);
			iVel = vec3.clone(velV[i]);
			jVel = vec3.clone(velV[j]);
			if(i!=j){
				var seperation = vec3.create();
				vec3.distance(seperation,iPos,jPos);
				var displacement = vec3.create();
				var netVelocity = vec3.create();
				vec3.subtract(displacement,iPos,jPos);
				vec3.subtract(netVelocity,iVel,jVel);
				
				//if(vec3.dot(netVelocity,displacement)<0){
					// get j mass
					//GLfloat jMass;
					//#collision vector
					//glm::vec3 collisionV = pos_Vectors[i] - pos_Vectors[j];
					//glm::vec3 ncollisionV = collisionV/glm::normalize(collisionV);
					if (seperation <= 2 * radius){
							//#collision vector
							var collisionV = vec3.create();
							vec3.subtract(collisionV,iPos,jPos);
							//ncollisionV = collisionV.toUnitVector();
							var ncollisionV = vec3.create();
							vec3.normalize(ncollisionV,collisionV);
				

							//glm::vec3 ncollisionV = normalize(collisionV);
							iInit = vec3.dot(iVel,ncollisionV);
							jInit = vec3.dot(jVel,ncollisionV);

							//set masses
							//GLfloat iMass = mass_array[i];
							//GLfloat jMass = mass_array[j];

							//mass differences and sum
							//GLfloat mDiffi = iMass - jMass;
							//GLfloat mDiffj = jMass - iMass;
							//GLfloat mSum = iMass + jMass;

							///////////////////////////////////////
							////////////momentum exchange//////////////////
							//glm::vec3 new_veli = (vel_Vectors[i]*mDiffi + 2*jMass*vel_Vectors[j])/mSum;
							//glm::vec3 new_velj = (vel_Vectors[j]*mDiffj + 2*iMass*vel_Vectors[i])/mSum;
							new_veli = (velV[j]);
							new_velj = (velV[i]);
							velV[i] = new_veli;
							velV[j] = new_velj;
							
							// without mass //
							/*iFin = jInit
							jFin = iInit
							iDiff = iFin - iInit
							jDiff = jFin - jInit
							var iProj = vec3.create();
							var jProj = vec3.create();
							var new_veli = vec3.create();
							var new_velj = vec3.create();
							vec3.multiply(iProj,ncollisionV,iDiff)
							vec3.multiply(jProj,ncollisionV,jDiff)
							vec3.add(new_veli,velV[i],iProj)
							vec3.add(new_velj,velV[j],jProj)
							velV[i] = new_veli;
							velV[j] = new_velj;*/

							//wait(0.2);
							//collision_count += 1;
						//}
					}
				//}
				//#apply forces
				//GLfloat g_constant = .0000007;
				//GLfloat g_factor = g_constant / (seperation * seperation) ;
				//glm::vec3 attraction =  g_factor * ncollisionV;
				//acc_Vectors[i] += -attraction;
				//acc_Vectors[j] += attraction;
				
			}
		}
	
}