
#include"input.h"


InputHandler::InputHandler(sf::RenderWindow& window,Camera& camera)
:m_window(window),m_camera(camera)
{
	if(debug)std::cout << "inputHandler constructed!\n";
	//this->window_ptr = w_ptr;
}

InputHandler::~InputHandler()
{
	if(debug)std::cout << "inputHandler destructed!\n";
}

//void InputHandler::syncCamera(Camera& camera){
//	std::cout << "camera synced\n";
//}

void InputHandler::loopInputs(){
	//Input.IsKeyDown(sf::Key::Left);
	//sf::Window App = m_window;
	//const sf::Input& Input = m_window.;
	if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(0.0,-1.0,0.0);
		//m_camera.turn(glm::vec3(0,-1,0));
		if(debug)std::cout << "LEFT!" <<std::endl;
	};
	if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(0.0,1.0,0.0);
		//m_camera.turn(glm::vec3(0,1,0));
		if(debug)std::cout << "RIGHT!" <<std::endl;
	};
	if (sf::Keyboard::isKeyPressed(sf::Keyboard::Up)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(-1.0,0.0,0.0);
		//m_camera.turn(glm::vec3(-1,0,0));
		if(debug)std::cout << "UP!" <<std::endl;
	};
	if (sf::Keyboard::isKeyPressed(sf::Keyboard::Down)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(1.0,0.0,0.0);
		//m_camera.turn(glm::vec3(1,0,0));
		if(debug)std::cout << "DOWN!" <<std::endl;
	};
	if(sf::Mouse::isButtonPressed(sf::Mouse::Left)){
		// get the global mouse position (relatively to the desktop)
		//sf::Vector2i globalPosition = sf::Mouse::getPosition();
		
		// get the local mouse position (relatively to a window)
		//sf::Vector2i localPosition = sf::Mouse::getPosition(m_window);
	};
	if (sf::Joystick::isConnected(0))
	{
		// joystick number 0 is connected
		/*// check how many buttons joystick number 0 has
		unsigned int buttonCount = sf::Joystick::getButtonCount(0);

		// check if joystick number 0 has a Z axis
		bool hasZ = sf::Joystick::hasAxis(0, sf::Joystick::Z);
		// is button 1 of joystick number 0 pressed?
		if (sf::Joystick::isButtonPressed(0, 1))
		{
			// yes: shoot!
			gun.fire();
		}

		// what's the current position of the X and Y axes of joystick number 0?
		float x = sf::Joystick::getAxisPosition(0, sf::Joystick::X);
		float y = sf::Joystick::getAxisPosition(0, sf::Joystick::Y);
		character.move(x, y);*/
	}
	
	if(sf::Keyboard::isKeyPressed(sf::Keyboard::Escape)){
		m_window.close();
	};
	if (sf::Keyboard::isKeyPressed(sf::Keyboard::F1)){
		sf::Image Screen = m_window.capture();
		Screen.saveToFile("screenshot.jpg");
	}
 }
