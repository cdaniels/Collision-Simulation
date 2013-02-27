#include "box.h"

Box::Box(GLfloat side_length,GLfloat color[3]){
	this->side_length = side_length;
	this->color[0] = color[0];
	this->color[1] = color[1];
	this->color[2] = color[2];
	std::cout << "Box constructed!\n";
}

Box::Box(){
	this->side_length = 50.0;
	this->color[0] = 0.0;
	this->color[1] = 0.0;
	this->color[2] = 0.0;
	std::cout << "Box default constructed!\n";

	/*//cube buffers
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
    cubeVertexIndexBuffer.numItems = 36;*/
}

Box::Box(Box& box){
}

Box::~Box(){
	std::cout << "Box destructed!\n";
}

GLfloat  Box::getLength(){
	return this->side_length;
}

void Box::draw(){
//void Box::draw(mvMatrix,rotationMatrix,zoom,sceneCenter){
	//### Draw Box

	GLint r = side_length; //for ease of display
    glBegin(GL_LINE_LOOP);           //# Start Drawing The Cube
    glColor3f(color[0],color[1],color[2]) ;         //# Set The Color To Green
    glVertex3f( r, r,-r);      //# Top Right Of The Quad (Top)
    glVertex3f(-r, r,-r);      //# Top Left Of The Quad (Top)
    glVertex3f(-r, r, r);      //# Bottom Left Of The Quad (Top)
    glVertex3f( r, r, r);      //# Bottom Right Of The Quad (Top)
    glEnd();
        
    glBegin(GL_LINE_LOOP);
    glColor3f(color[0],color[1],color[2]) ;         
    glVertex3f( r,-r, r);      //# Top Right Of The Quad (Bottom)
    glVertex3f(-r,-r, r);     //# Top Left Of The Quad (Bottom)
    glVertex3f(-r,-r,-r);      //# Bottom Left Of The Quad (Bottom)
    glVertex3f( r,-r,-r);      //# Bottom Right Of The Quad (Bottom)
    glEnd();
        
    glBegin(GL_LINES);
    glColor3f(color[0],color[1],color[2]) ;         
    glVertex3f( r, r, r);      //# Top Right Of The Quad (Front)
    glVertex3f( r,-r, r);      //# Bottom Right Of The Quad (Front)
    glVertex3f(-r, r, r);      //# Top Left Of The Quad (Front)
    glVertex3f(-r,-r, r);     // # Bottom Left Of The Quad (Front)
    glEnd();
        
    glBegin(GL_LINES); 
    glColor3f(color[0],color[1],color[2]) ;         
    glVertex3f( r,-r,-r);      //# Bottom Left Of The Quad (Back)
    glVertex3f( r, r,-r);      //# Top Left Of The Quad (Back)
    glVertex3f(-r,-r,-r);      //# Bottom Right Of The Quad (Back)
    glVertex3f(-r, r,-r);     //# Top Right Of The Quad (Back)
    glEnd();

	/*//cube
	mvPushMatrix();
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, sceneCenter);
		mat4.translate(mvMatrix, [0.0, 0.0, zoom]);
		mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
		mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
		mat4.multiply(mvMatrix, moonRotationMatrix);
		
		//mat4.rotate(mvMatrix, degToRad(zRot), [0, 0, 1]);
		
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
	mvPopMatrix();*/
}