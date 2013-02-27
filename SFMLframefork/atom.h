#ifndef ATOM_H
#define ATOM_H

#include <SFML/Graphics.hpp>
#include <SFML/Window/OpenGL.hpp>
#include <iostream>


////////////////////////////////////////////////////////////////////////////////
// Class name: Atom
////////////////////////////////////////////////////////////////////////////////
class Atom
{
public:
	Atom(GLfloat radius,GLfloat mass,sf::Color);
	Atom(Atom& atom);
	Atom();
	~Atom();

	GLfloat getRadius();
	GLfloat getMass();
	void draw();

private:
	GLfloat radius;
	GLfloat mass;
	sf::Color color;
};


#endif
