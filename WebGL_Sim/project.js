/** 
Collision Simulation
 coded by Chad Daniels on 02/05/2013
**/

var gl;
function initGL(canvas) {
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

/***************** matrices *****************/
var mvMatrix = oldV().mat4.create();
var mvMatrixStack = [];
var pMatrix = oldV().mat4.create();

function mvPushMatrix() {
    var copy = oldV().mat4.create();
    oldV().mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
	if (mvMatrixStack.length == 0) {
		throw "Invalid popMatrix!";
	}
	mvMatrix = mvMatrixStack.pop();
}

function setMatrixUniforms() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
	
	var normalMatrix = mat3.create();
    oldV().mat4.toInverseMat3(mvMatrix, normalMatrix);
    oldV().mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}




/************************** display **********************/
//global
var sceneCenter = [0.0, 0.0, -40.0];
var zoom = -4.0;
var tilt = 90;
var spin = 0;


// rotation variables for cube
var xRot = 0;
var xSpeed = 0;

var yRot = 0;
var ySpeed = 0;

var filter = 0;

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

function drawScene() {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	

	oldV().mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

	oldV().mat4.identity(mvMatrix);
	//mat4.translate(mvMatrix, [0.0, 0.0, zoom]);
	//mat4.multiply(mvMatrix, moonRotationMatrix);
	//mat4.rotate(mvMatrix, degToRad(tilt), [1.0, 0.0, 0.0]);
	
	
	//blending
	var blending = document.getElementById("blending").checked;
	if (blending) {
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		gl.enable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		gl.uniform1f(shaderProgram.alphaUniform, parseFloat(document.getElementById("alpha").value));
	} else {
		gl.disable(gl.BLEND);
		gl.enable(gl.DEPTH_TEST);
	}
		
	//lighting
	var lighting = document.getElementById("lighting").checked;
	gl.uniform1i(shaderProgram.useLightingUniform, lighting);
	if (lighting) {
		gl.uniform3f(
			shaderProgram.ambientColorUniform,
			parseFloat(document.getElementById("ambientR").value),
			parseFloat(document.getElementById("ambientG").value),
			parseFloat(document.getElementById("ambientB").value)
		);
		var lightingDirection = [
			parseFloat(document.getElementById("lightDirectionX").value),
			parseFloat(document.getElementById("lightDirectionY").value),
			parseFloat(document.getElementById("lightDirectionZ").value)
		  ];
		var adjustedLD = vec3.create();
		oldV().vec3.normalize(lightingDirection, adjustedLD);
		oldV().vec3.scale(adjustedLD, -1);
		gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);
		gl.uniform3f(
			shaderProgram.directionalColorUniform,
			parseFloat(document.getElementById("directionalR").value),
			parseFloat(document.getElementById("directionalG").value),
			parseFloat(document.getElementById("directionalB").value)
		);
	}
	
	//drawBox();
	var ball_num =  $("#ball_number").html();
	for(var i=0;i<ball_num;i++){
		//var pos = [0.0,0.0,0.0];
		drawSphere(posV[i]);
		processCollisions(i);
	}
	drawBox();
	
	
}

function drawSphere(posV){
	//moon
	mvPushMatrix();
	gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
		oldV().mat4.identity(mvMatrix);
		oldV().mat4.translate(mvMatrix, sceneCenter);
		oldV().mat4.translate(mvMatrix, [0.0, 0.0, zoom]);
		oldV().mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
		oldV().mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
		oldV().mat4.multiply(mvMatrix, moonRotationMatrix);
		
		
		//translate to specific position
		//position =[posV.e(1),posV.e(2),posV.e(3)];
		//position =[posV,posV.e(2),posV.e(3)];
		oldV().mat4.translate(mvMatrix, posV);
		
		//set texture
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, moonTexture);
		gl.uniform1i(shaderProgram.samplerUniform, 0.5);
		gl.uniform1i(shaderProgram.alphaUniform, 1);

		gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, moonVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
		gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, moonVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexNormalBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, moonVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
		setMatrixUniforms();
		gl.drawElements(gl.TRIANGLES, moonVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	gl.disable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);    
	mvPopMatrix();
}

function drawBox(){
	//cube
	mvPushMatrix();
		oldV().mat4.identity(mvMatrix);
		oldV().mat4.translate(mvMatrix, sceneCenter);
		oldV().mat4.translate(mvMatrix, [0.0, 0.0, zoom]);
		oldV().mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
		oldV().mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
		oldV().mat4.multiply(mvMatrix, moonRotationMatrix);
		
		
		//bind position buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		//bind normal buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		//bind texture buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
		gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
		gl.activeTexture(gl.TEXTURE0);
		//gl.bindTexture(gl.TEXTURE_2D, neheTexture);
		//gl.bindTexture(gl.TEXTURE_2D, crateTextures[filter]);//for switching textures
		//gl.bindTexture(gl.TEXTURE_2D, crateTexture);//for single texture
		gl.bindTexture(gl.TEXTURE_2D, glassTexture);//for stained glass
		gl.uniform1i(shaderProgram.samplerUniform, 0);
		
		
		//draw
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
		setMatrixUniforms();
		gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		//gl.drawArrays(gl.TRIANGLE_STRIP, 0, cubeVertexPositionBuffer.numItems);
	mvPopMatrix();
}

var lastTime = 0;
function animate() {
	var timeNow = new Date().getTime();
	if (lastTime != 0) {
		var elapsed = timeNow - lastTime;

		// variables for arrow rotation of scene
		xRot += (xSpeed * elapsed) / 1000.0;
		yRot += (ySpeed * elapsed) / 1000.0;
		
		drawScene();
	}
	lastTime = timeNow;
}

function tick() {
	requestAnimFrame(tick);
	handleKeys();
	animate();
}

function webGLStart() {
	var canvas = document.getElementById("mycanvas");
	//console.log(ball_num);
	initGL(canvas);
	initShaders();
	initBuffers();
	initTexture();
	initWorldObjects();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	//get mouse events
	canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;
	
	//get keystrokes
	document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
	
	//update the screen
	tick();
}
