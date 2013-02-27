

#ifndef INPUT_H
#define INPUT_H

#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
#include <SFML/Window/OpenGL.hpp>
#include <glm/glm.hpp>
#include <iostream>

#include "camera.h"

////////////////////////////////////////////////////////////////////////////////
// Class name: InputHandler
////////////////////////////////////////////////////////////////////////////////
class InputHandler
{
public:
	//InputHandler(sf::Window& w_ptr);const sf::Input& Input
	InputHandler(sf::RenderWindow& window,Camera& camera);
	~InputHandler();

	//void syncCamera(Camera& camera);
	void loopInputs();
private:
	sf::RenderWindow& m_window;
	Camera& m_camera;
	//sf::Image Screen;

	static const bool debug = false;
};


#endif
