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

#include "octree.h"
#include <vector>


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
	//bool testBallBallCollision(int,int);
	void runSimulation(GLint);

	GLint getBallNumber();
	
private:
	//adress of camera for syncronizing
	//Camera& m_camera;
	
	static const int ballNumber = 350;
	//static const int typeNumber = 4;
	//GLfloat ballSpeed;

	//GLfloat ballSize;
	//GLfloat boxSize;

	Box frame_box;
	//Atom test_ball;
	//Atom atom_type[typeNumber];

	//int collision_count;
	//int bond_count;

	// create arrays for ball positions and velocities and acceleration
	//glm::vec3 pos_Vectors[ballNumber];
	//glm::vec3 vel_Vectors[ballNumber];
	//glm::vec3 acc_Vectors[ballNumber];
	//GLfloat mass_array[ballNumber];
	//GLuint type_array[ballNumber];
	//GLbool bond_array[][];

	//Returns a random float from 0 to < 1
	float randomFloat();

	const float GRAVITY = 8.0f;
	const float BOX_SIZE = 12.0f; //The length of one side of the box
	//The amount of time between each time that we handle collisions and apply the
	//effects of gravity
	const float TIME_BETWEEN_UPDATES = 0.01f;
	const int TIMER_MS = 25; //The number of milliseconds to which the timer is set

	//Stores information regarding a ball
	struct Ball {
		glm::vec3 v; //Velocity
		glm::vec3 pos; //Position
		float r; //Radius
		glm::vec3 color;
	};

	std::vector<Ball*> _balls; //All of the balls in play
	float _angle; //The camera angle
	Octree* _octree; //An octree with all af the balls
	//The amount of time until performUpdate should be called
	float _timeUntilUpdate;

	enum Wall {WALL_LEFT, WALL_RIGHT, WALL_FAR, WALL_NEAR, WALL_TOP, WALL_BOTTOM};
};


#endif