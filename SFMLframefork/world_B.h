#ifndef WORLD_H
#define WORLD_H

#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
#include <SFML/OpenGL.hpp>
#include <glm/glm.hpp>
#include <iostream>

//include scene files
#include "camera.h"
#include "box.h"
#include "atom.h"


////////////////////////////////////////////////////////////////////////////////
// Class name: World
////////////////////////////////////////////////////////////////////////////////
class World
{
public:
	//World(GLfloat[],GLfloat[]);
	//World(Camera& camera);
	World();
	World(World& world);
	~World();

	//void syncViewPort();
	//void setViewPort(GLfloat[],GLfloat[]);
	//void incrementRotation(GLfloat,GLfloat,GLfloat);
	//GLfloat getPosition();
	//GLfloat getRotation();

	void drawBoundry();
	bool testBallBallCollision(int,int);
	void runSimulation(GLint);

	GLint getBallNumber();
	
private:
	//adress of camera for syncronizing
	//Camera& m_camera;
	
	static const int ballNumber = 350;
	static const int typeNumber = 4;
	GLfloat ballSpeed;

	//GLfloat ballSize;
	//GLfloat boxSize;

	Box frame_box;
	Atom test_ball;
	Atom atom_type[typeNumber];

	int collision_count;
	int bond_count;

	// create arrays for ball positions and velocities and acceleration
	glm::vec3 pos_Vectors[ballNumber];
	glm::vec3 vel_Vectors[ballNumber];
	glm::vec3 acc_Vectors[ballNumber];
	//GLfloat mass_array[ballNumber];
	GLuint type_array[ballNumber];
	//GLbool bond_array[][];
};


#endif