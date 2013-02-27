#ifndef Box_H
#define Box_H

#include <SFML/Graphics.hpp>
#include <SFML/Window/OpenGL.hpp>
#include <iostream>


////////////////////////////////////////////////////////////////////////////////
// Class name: Box
////////////////////////////////////////////////////////////////////////////////
class Box
{
public:
	Box(GLfloat side_length,GLfloat color[3]);
	Box(Box& box);
	Box();
	~Box();

	void draw();
	GLfloat getLength();

private:
	GLfloat side_length;
	GLfloat color[3];
};


#endif
