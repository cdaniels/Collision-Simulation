#include "atom.h"

Atom::Atom(GLfloat radius,GLfloat mass,sf::Color color){
	this->radius = radius;
	this->color = color;
	std::cout << "Atom constructed!\n";
}

Atom::Atom(){
	this->radius = 10.0;
	this->color = sf::Color(0,0,0);
	std::cout << "Atom default constructed!\n";
}

Atom::Atom(Atom& atom){
}

Atom::~Atom(){
	std::cout << "Atom destructed!\n";
}

GLfloat Atom::getRadius(){
	return this->radius;
}

GLfloat Atom::getMass(){
	return this->mass;
}

void Atom::draw(){
	GLfloat r = (float)color.r/255;
	GLfloat g = (float)color.g/255;
	GLfloat b = (float)color.b/255;
	glColor3f(r,g,b);
	gluSphere(gluNewQuadric(),radius,10,10);
	//glutSolidSphere( radius, 10.0, 10.0);
}