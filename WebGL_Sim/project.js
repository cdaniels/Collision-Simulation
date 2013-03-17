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

//default color
var whiteColor = new Float32Array([1, 1, 1, 1]);


/***************** matrices *****************/
var mvMatrix = old_mat4().create();
var mvMatrixStack = [];
var pMatrix = old_mat4().create();

function mvPushMatrix() {
    var copy = old_mat4().create();
    old_mat4().set(mvMatrix, copy);
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
	
	var normalMatrix = old_mat3().create();
    old_mat4().toInverseMat3(mvMatrix, normalMatrix);
    old_mat3().transpose(normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}

function tick() {
	requestAnimFrame(tick);
	handleKeys();
	if(document.getElementById("toggle_display").checked){
		drawScene();
	}
	//drawBox();
	handlePhysics();
	//drawBox();
	drawCage()
}

function webGLStart() {
	var canvas = document.getElementById("mycanvas");
	initGL(canvas);
	initShaders();
	initBuffers();
	initTexture();
	initWorld();

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
