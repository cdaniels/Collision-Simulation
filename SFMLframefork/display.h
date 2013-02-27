

#ifndef DISPLAY_H
#define DISPLAY_H

#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
#include <SFML/Window/OpenGL.hpp>
#include <iostream>

#include "camera.h"
#include "world.h"
#include "interface.h"

//include scene template files
#include "box.h"
#include "atom.h"


////////////////////////////////////////////////////////////////////////////////
// Class name: DisplayHandler
////////////////////////////////////////////////////////////////////////////////
class DisplayHandler
{
public:
	//DisplayHandler(sf::Window& w_ptr);const sf::Input& Input
	DisplayHandler(sf::RenderWindow& window,Camera& camera,World& world,Interface& UI);
	~DisplayHandler();

	//void syncCamera(Camera& camera);
	void loopDisplay();
private:
	GLfloat boxRGB[3];
	GLfloat ballRGB[3];
	//Box frame_box;
	//Atom test_ball;

	// links to other objects
	sf::RenderWindow& m_window;
	Camera& m_camera;
	World& m_world;
	Interface& m_UI;
};


#endif
