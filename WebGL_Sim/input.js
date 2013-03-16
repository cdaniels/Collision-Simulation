var currentlyPressedKeys = {};

  function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
	
	switch(event.keyCode){
		case 37: case 39: case 38:  case 40: // Arrow keys
		case 32: case 33: case 34: event.preventDefault(); break; // Space, Pg-up Pg-down
		default: break; // do not block other keys
    }

    if (String.fromCharCode(event.keyCode) == "F") {
      filter += 1;
      if (filter == 3) {
        filter = 0;
      }
    }
  }

  function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
	//rotSpeed =0;
  }
  

// rotation variables for cube
var rotSpeed =2;
var xRot = 0;
var yRot = 0;

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

var sphereRotationMatrix = old_mat4().create();
old_mat4().identity(sphereRotationMatrix);
  
function handleKeys() {
	var newRotationMatrix = old_mat4().create();
	old_mat4().identity(newRotationMatrix);
    if (currentlyPressedKeys[33]) {
      // Page Up
      zoom += 0.1;
    }
    if (currentlyPressedKeys[34]) {
      // Page Down
      zoom -= 0.1;
    }
	if (currentlyPressedKeys[27]) {
      tilt += 2;
    }
    if (currentlyPressedKeys[28]) {
      tilt -= 2;
	}
    if (currentlyPressedKeys[37]) {
      // Left cursor key
	  //old_mat4().rotate(newRotationMatrix, degToRad(rotSpeed), [0, -1, 0]);
	  yRot -= 1;
    }
    if (currentlyPressedKeys[39]) {
      // Right cursor key
	  //old_mat4().rotate(newRotationMatrix, degToRad(rotSpeed), [0, 1, 0]);
	   yRot += 1;
    }
    if (currentlyPressedKeys[38]) {
      // Up cursor key
      //old_mat4().rotate(newRotationMatrix, degToRad(rotSpeed), [-1, 0, 0]);
      xRot -= 1;
    }
    if (currentlyPressedKeys[40]) {
      // Down cursor key
      //old_mat4().rotate(newRotationMatrix, degToRad(rotSpeed), [1, 0, 0]);
      xRot += 1;
    }
    //old_mat4().multiply(newRotationMatrix, sphereRotationMatrix, sphereRotationMatrix);
  }
  
  var mouseDown = false;
  var lastMouseX = null;
  var lastMouseY = null;
  
  function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }

  function handleMouseUp(event) {
    mouseDown = false;
  }
  
  function handleMouseMove(event) {
    if (!mouseDown) {
      return;
    }
    var newX = event.clientX;
    var newY = event.clientY;

    var deltaX = newX - lastMouseX;
    var newRotationMatrix = old_mat4().create();
    old_mat4().identity(newRotationMatrix);
    old_mat4().rotate(newRotationMatrix, degToRad(deltaX / 10), [0, 1, 0]);

    var deltaY = newY - lastMouseY;
    //mat4.rotate(newRotationMatrix, degToRad(deltaY / 10), [1, 0, 0]);

    old_mat4().multiply(newRotationMatrix, sphereRotationMatrix, sphereRotationMatrix);

    lastMouseX = newX
    lastMouseY = newY;
  }
