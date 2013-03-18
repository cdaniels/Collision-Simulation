

/***************** buffers *****************/

//cube buffers
var cubeVertexPositionBuffer;
var cubeVertexTextureCoordBuffer;
var cubeVertexIndexBuffer;

//sphere buffers
var sphereVertexPositionBuffer;
var sphereVertexNormalBuffer;
var sphereVertexTextureCoordBuffer;
var sphereVertexIndexBuffer;

//cage buffers
var cageVertexPositionBuffer;
//var cageVertexTextureCoordBuffer;
var cageVertexIndexBuffer;

//stopper buffers
//var stopperVertexPositionBuffer;
//var stopperVertexIndexBuffer;

function initBuffers() {
	//sphere buffers
	var latitudeBands = 30;
	var longitudeBands = 30;
	//var radius = ball_radius;
	var radius =  parseFloat($("#ball_radius").html());
	var box_length = parseFloat($("#box_length").html());
	//var box_length = $( ".selector" ).slider( "value" );

	var vertexPositionData = [];
    var normalData = [];
    var textureCoordData = [];
    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      var theta = latNumber * Math.PI / latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        var phi = longNumber * 2 * Math.PI / longitudeBands;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;
        var u = 1 - (longNumber / longitudeBands);
        var v = 1 - (latNumber / latitudeBands);
		
		normalScalar = -1; // normal is inverted for blending purposes
        normalData.push(x*normalScalar);
        normalData.push(y*normalScalar);
        normalData.push(z*normalScalar);
        textureCoordData.push(u);
        textureCoordData.push(v);
        vertexPositionData.push(radius * x);
        vertexPositionData.push(radius * y);
        vertexPositionData.push(radius * z);
      }
    }
	var indexData = [];
    for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
        var first = (latNumber * (longitudeBands + 1)) + longNumber;
        var second = first + longitudeBands + 1;
        indexData.push(first);
        indexData.push(second);
        indexData.push(first + 1);

        indexData.push(second);
        indexData.push(second + 1);
        indexData.push(first + 1);
      }
    }
	sphereVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
	sphereVertexNormalBuffer.itemSize = 3;
	sphereVertexNormalBuffer.numItems = normalData.length / 3;

	sphereVertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
	sphereVertexTextureCoordBuffer.itemSize = 2;
	sphereVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

	sphereVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
	sphereVertexPositionBuffer.itemSize = 3;
	sphereVertexPositionBuffer.numItems = vertexPositionData.length / 3;

	sphereVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
	sphereVertexIndexBuffer.itemSize = 1;
	sphereVertexIndexBuffer.numItems = indexData.length;

	
	//cube buffers
	var r = box_length; //cube side length
	
	//position
	cubeVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	vertices = [
      // Front face
      -r, -r,  r,
       r, -r,  r,
       r,  r,  r,
      -r,  r,  r,

      // Back face
      -r, -r, -r,
      -r,  r, -r,
       r,  r, -r,
       r, -r, -r,

      // Top face
      -r,  r, -r,
      -r,  r,  r,
       r,  r,  r,
       r,  r, -r,

      // Bottom face
      -r, -r, -r,
       r, -r, -r,
       r, -r,  r,
      -r, -r,  r,

      // Right face
       r, -r, -r,
       r,  r, -r,
       r,  r,  r,
       r, -r,  r,

      // Left face
      -r, -r, -r,
      -r, -r,  r,
      -r,  r,  r,
      -r,  r, -r,
    ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	cubeVertexPositionBuffer.itemSize = 3;
	cubeVertexPositionBuffer.numItems = 24;
	
	//normals
	cubeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    var vertexNormals = [
      // Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      // Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    cubeVertexNormalBuffer.itemSize = 3;
    cubeVertexNormalBuffer.numItems = 24;
	
	//texture
	cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;
	
	//index
	cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;
    
    //cage vertices
    //cage face position
	cageVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cageVertexPositionBuffer);
	vertices = [
      // Top face
		-r, r,-r,
		r, r,-r,
		r, r, r,
		-r, r, r,

      // Bottom face
		-r,-r, -r,
		r,-r, -r,
		r,-r,r,
		-r,-r,r,
    ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	cageVertexPositionBuffer.itemSize = 3;
	cageVertexPositionBuffer.numItems = 8;
	
	//index
	cageVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cageVertexIndexBuffer);
    var cageVertexIndices = [
	  0, 1, 2, 3,	 // Top face
      0, 4, 7, 3,    // Front face
      2, 6, 7, 3, 	 // Left face
      2, 6, 5, 1,    // Back face
      0, 4, 5, 1    // Right face
      //5, 6, 7, 4    // Right face
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cageVertexIndices), gl.STATIC_DRAW);
    cageVertexIndexBuffer.itemSize = 4;
    cageVertexIndexBuffer.numItems = 20;
    
    
	//stopper face position
	stopperVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, stopperVertexPositionBuffer);
	vertices = [

      // Bottom face
		r,r, r,
		r,-r, r,
		r,-r,-r,
		r,r,-r,
    ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	stopperVertexPositionBuffer.itemSize = 3;
	stopperVertexPositionBuffer.numItems = 4;
	
	//index
	stopperVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stopperVertexIndexBuffer);
    var stopperVertexIndices = [
	  0, 1, 2, 3,	 // Top face
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(stopperVertexIndices), gl.STATIC_DRAW);
    stopperVertexIndexBuffer.itemSize = 4;
    stopperVertexIndexBuffer.numItems = 4;
}



