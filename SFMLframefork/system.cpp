
// links to smfl-system.dll in local folder

#include <SFML/System.hpp>
#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
//#include <GL/gl.h> 
//#include <GL/glu.h> 
#include <iostream>
//#include <boost\random\uniform_real.hpp>
//#include <GL

#include "display.h"
#include "input.h"
#include "world.h"

//#include "CEGUI.h"
//#include "CEGUIOpenGL.h"
//#include "CEGUIRenderer.h"
//#include "RendererModules\OpenGL\CEGUIOpenGLRenderer.h"

sf::Mutex GlobalMutex; // This mutex will be used to synchronize our threads

bool ThreadRunning;

//thread runs simultaneously with main function
class MyThread : public sf::Thread
{
private :
    virtual void Run()
    {
		ThreadRunning = true;
		while (ThreadRunning){
			// Lock the mutex, to make sure no thread will interrupt us while we are displaying text
			sf::Lock Lock(GlobalMutex);

			// Print something...
			for (int i = 0; i < 10; ++i){
				std::cout << "I'm the thread number 2" << std::endl;
				// Get a random float number between -1 and 1
				//float rnum = sf::Randomizer::Random(-1.f, 1.f);
				//std::cout << "Here's a random"<< rnum << std::endl;
			}
			// Cast the parameter back to its real type
			//MyClass* Object = static_cast<MyClass*>(UserData)
			ThreadRunning = false;
		}
    }
};

int main(int argc, char** argv){
	 //system clock
	 sf::Clock Clock;
	 Clock.restart();
	 // model time with this
	 sf::Time ElapsedTime = Clock.getElapsedTime();

	// Create an instance of our custom thread class
    //MyThread Thread;

	// Start it !
	//Thread.Launch();
    //Thread.Run();

	//MyClass Object;
	//sf::Thread Thread(&ThreadFunction, &Object);

	//pause to let the first thread engage
	//sf::Sleep(0.5f);

	 // Lock the mutex, to make sure no thread will interrupt us while we are displaying text
    //sf::Lock Lock(GlobalMutex);
	 // Print something...
    //for (int i = 0; i < 10; ++i)
        //std::cout << "I'm the main thread" << std::endl;

	//sf::VideoMode BestMode = sf::VideoMode::get(0)//best video mode
	//sf::VideoMode DesktopMode = sf::VideoMode::getDesktopMode();// desktop mode

	sf::ContextSettings settings;
	settings.depthBits        = 24; // Request a 24 bits depth buffer
	settings.stencilBits     = 8;  // Request a 8 bits stencil buffer
	settings.antialiasingLevel = 2;  // Request 2 levels of antialiasing
	settings.majorVersion = 3;
	settings.minorVersion = 0;

	sf::RenderWindow window(sf::VideoMode(600, 600, 32), "Default");

	window.setVerticalSyncEnabled(true);
	window.setFramerateLimit(60);
	window.create(sf::VideoMode(600, 600, 32), "Particle Box",sf::Style::Close, settings);
	//Creating a fullscreen window with the best video mode supported
	//App.create(sf::VideoMode::GetMode(0), "SFML Window", sf::Style::Fullscreen);


	//print time each .5 sec
    //while (Clock.GetElapsedTime() < 10.f)
    //{
        //std::cout << Clock.GetElapsedTime() << std::endl;
        //sf::Sleep(0.5f); //pause for .5sec
    //}

	// declare handlers
	Camera camera = Camera();
	//Settings settings = Settings();
	//Interface UI = Interface(settings);
	Interface UI = Interface();
	//World world = World(settings); // camera needed to syncronize rotations during collision loop
	World world = World(); // camera needed to syncronize rotations during collision loop

	InputHandler inputHandler(window,camera);
	DisplayHandler displayHandler(window,camera,world,UI);

	while (window.isOpen())
	{
		sf::Event Event;
		while (window.pollEvent(Event))
		{
			// Resize window
			if (Event.type == sf::Event::Resized){
				//glViewport(0, 0, Event.Size.Width, Event.Size.Height);
				//glViewport(0, 0,600, 600);
			}

			inputHandler.loopInputs();// Process events

			// Window closed
			if (Event.type == sf::Event::Closed){
				window.close();
			}
		}
		displayHandler.loopDisplay();
	}

	// For some reason, we want to terminate the thread
    //Thread.Terminate(); //this is unsafe
	//ThreadRunning = false;
	//Thread.Wait(); //wait for thread to terminate

    return EXIT_SUCCESS;
}