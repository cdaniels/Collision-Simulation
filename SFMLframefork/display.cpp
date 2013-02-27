
#include"Display.h"


DisplayHandler::DisplayHandler(sf::RenderWindow& window,Camera& camera,World& world,Interface& UI)
: m_window(window),m_camera(camera),m_world(world),m_UI(UI)
{
	std::cout << "displayHandler constructed!\n";
	//this->window_ptr = w_ptr;
	GLfloat cam_pos[3] = {0.0,0.0,-200.f};
	GLfloat cam_rot[3] = {0.0,0.0,0.0};
	m_camera.setViewPort(cam_pos,cam_rot);

	//boxRGB[0] = 0.0;//Red
	//boxRGB[1] = 1.0;//Green
	//boxRGB[2] = 0.0;//Blue
	//this->frame_box = Box(50,boxRGB);
	//ballRGB[0] = 0.0;//Red
	//ballRGB[1] = 0.0;//Green
	//ballRGB[2] = 0.5;//Blue
	//this->test_ball = Atom(5,1.0,ballRGB);

	//***********OpenGL init*************//
	// Set color and depth clear value
	glClearDepth(1.f);
	glClearColor(0.5f, 0.5f, 0.5f, 0.5f);

	// Enable Z-buffer read and write
	glEnable(GL_DEPTH_TEST);
	glDepthMask(GL_TRUE);
	glDepthFunc(GL_LESS);
	glEnable(GL_CULL_FACE); // face culling

	//glShadeModel(GL_SMOOTH);             //# Enables Smooth Color Shading
	glEnable(GL_COLOR_MATERIAL); // lets colors appear in light

	// enable lighting
	glEnable (GL_LIGHTING);
	GLfloat lightAmbient[]= { 0.5f, 0.5f, 0.5f, 0.5f };		
	GLfloat ambientPosition[] = {0,50,0,1};		
	glLightfv(GL_LIGHT0, GL_SPECULAR, lightAmbient);	
	glLightfv(GL_LIGHT1, GL_POSITION, ambientPosition);
	glEnable (GL_LIGHT1);

	// Setup a perspective projection
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(90.f, 1.f, 1.f, 500.f);
}

DisplayHandler::~DisplayHandler()
{
	std::cout << "displayHandler destructed!\n";
}

//void DisplayHandler::loopDisplay(Camera& camera){
void DisplayHandler::loopDisplay(){
	m_window.setActive();
	//Camera m_camera(camera);
	//glViewport(0, 0,600, 600);
	//gluLookAt(0,0,1, 0,0,0, 0,1,0);
	
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();


	/// disable Lighting
	glDisable(GL_LIGHTING);

	//sync camera view
	m_camera.syncViewPort();

	//draw box
	m_world.drawBoundry();
	//test_ball.draw();

	///enable lighting
	glEnable(GL_LIGHT0);
	glEnable(GL_LIGHT1);
	glEnable(GL_LIGHTING);

	glLoadIdentity();
	//m_camera.syncViewPort();
	//m_world.simulate();

	for(int i=0; i<m_world.getBallNumber() ; i++)
	{
		//run collision detection for ball i
		m_camera.syncViewPort();
		m_world.runSimulation(i);
	}


	//glLoadIdentity();
	//sf::Text label = m_UI.getLabel();
	//m_window.draw(label);
	// Create a graphical text to display
	//sf::Font font;
    //if (!font.loadFromFile("LCD.ttf"))
         //return 0;
	//	m_window.close();
     //sf::Text text("Hello SFML", font, 50);
	 // Draw the string

	m_window.pushGLStates(); //save the current OpenGL state

    //m_window.draw(m_UI.getLabel());

	m_window.popGLStates(); //restore the saved OpenGL state to the way it was before we drew the text
	 

	// Clear the screen (fill it with black color)
    //m_window.Clear(sf::Color(200, 0, 0));

	// Display window contents on screen
	m_window.display();
 }
