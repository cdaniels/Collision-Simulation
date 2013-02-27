

#ifndef CAMERA_H
#define CAMERA_H

#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
#include <SFML/Window/OpenGL.hpp>
#include <glm/glm.hpp>
#include <iostream>


////////////////////////////////////////////////////////////////////////////////
// Class name: Camera
////////////////////////////////////////////////////////////////////////////////
class Camera
{
public:
	//InputHandler(sf::Window& w_ptr);const sf::Input& Input
	Camera(GLfloat[],GLfloat[]);
	Camera(Camera& camera);
	Camera();
	~Camera();

	void syncViewPort();
	void setViewPort(GLfloat[],GLfloat[]);
	void incrementRotation(GLfloat,GLfloat,GLfloat);
	//void setEyePosition(glm::vec3);
	//void setViewDirection(glm::vec3);
	//void turn(glm::vec3);
	GLfloat getPosition();
	GLfloat getRotation();

private:
	//sf::Image Screen;
	GLfloat rotspeed;
	GLfloat pos[3];
	GLfloat rot[3];
	//glm::vec3 eye;
	//glm::vec3 center;

	static const bool debug = false;
};


#endif
