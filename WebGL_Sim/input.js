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
	xSpeed = 0;
	ySpeed = 0;
  }
  
  function handleKeys() {
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
      ySpeed -= 1;
    }
    if (currentlyPressedKeys[39]) {
      // Right cursor key
      ySpeed += 1;
    }
    if (currentlyPressedKeys[38]) {
      // Up cursor key
      xSpeed -= 1;
    }
    if (currentlyPressedKeys[40]) {
      // Down cursor key
      xSpeed += 1;
    }
  }
  
  var mouseDown = false;
  var lastMouseX = null;
  var lastMouseY = null;

  var sphereRotationMatrix = old_mat4().create();
  old_mat4().identity(sphereRotationMatrix);
  
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
