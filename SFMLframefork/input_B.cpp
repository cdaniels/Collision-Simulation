
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
	const sf::Input& Input = m_window.GetInput();
	if (Input.IsKeyDown(sf::Key::Left)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(0.0,-1.0,0.0);
		//m_camera.turn(glm::vec3(0,-1,0));
		if(debug)std::cout << "LEFT!" <<std::endl;
	};
	if (Input.IsKeyDown(sf::Key::Right)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(0.0,1.0,0.0);
		//m_camera.turn(glm::vec3(0,1,0));
		if(debug)std::cout << "RIGHT!" <<std::endl;
	};
	if (Input.IsKeyDown(sf::Key::Up)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(-1.0,0.0,0.0);
		//m_camera.turn(glm::vec3(-1,0,0));
		if(debug)std::cout << "UP!" <<std::endl;
	};
	if (Input.IsKeyDown(sf::Key::Down)){
		//GLfloat cam_pos[3] = {0.0,0.0,0.0};
		//GLfloat cam_rot[3] = {1.0,0.0,0.0};
		//m_camera.setViewPort(cam_pos,cam_rot);
		m_camera.incrementRotation(1.0,0.0,0.0);
		//m_camera.turn(glm::vec3(1,0,0));
		if(debug)std::cout << "DOWN!" <<std::endl;
	};
	if(Input.IsMouseButtonDown(sf::Mouse::Right)){
	};
	if(Input.IsJoystickButtonDown(0, 1)){
	};
	if(Input.GetMouseX()){
	};
	if(Input.GetMouseY()){
	};
	if(Input.GetJoystickAxis(1, sf::Joy::AxisX)){
	};
	if(Input.GetJoystickAxis(1, sf::Joy::AxisY)){
	};
	if(Input.GetJoystickAxis(1, sf::Joy::AxisPOV)){
	};
	if(Input.IsKeyDown(sf::Key::Escape)){
		m_window.Close();
	};
	if (Input.IsKeyDown(sf::Key::F1)){
		sf::Image Screen = m_window.Capture();
		Screen.SaveToFile("screenshot.jpg");
	}
 }
