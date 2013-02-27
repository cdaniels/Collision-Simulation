
// links to smfl-system.dll in local folder

#include <SFML/System.hpp>
#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
//#include <GL/gl.h> 
//#include <GL/glu.h> 
#include <iostream>
//#include <GL

#include "display.h"
#include "input.h"
#include "world.h"

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
				float rnum = sf::Randomizer::Random(-1.f, 1.f);
				std::cout << "Here's a random"<< rnum << std::endl;
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
	 Clock.Reset();
	 // model time with this
	 float ElapsedTime = Clock.GetElapsedTime();

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

	//sf::VideoMode BestMode = sf::VideoMode::GetMode(0)//best video mode
	//sf::VideoMode DesktopMode = sf::VideoMode::GetDesktopMode();// desktop mode

	/*sf::WindowSettings Settings;
	Settings.DepthBits         = 24; // Request a 24 bits depth buffer
	Settings.StencilBits       = 8;  // Request a 8 bits stencil buffer
	Settings.AntialiasingLevel = 2;  // Request 2 levels of antialiasing*/
	//sf::RenderWindow App(sf::VideoMode(800, 600, 32), "SFML OpenGL", sf::Style::Close, Settings);
	sf::RenderWindow App(sf::VideoMode(800, 600, 32), "SFML OpenGL", sf::Style::Close);
	
	App.UseVerticalSync(true);
	App.SetFramerateLimit(60);
	App.Create(sf::VideoMode(600, 600, 32), "SFML Window");
	//Creating a fullscreen window with the best video mode supported
	//App.Create(sf::VideoMode::GetMode(0), "SFML Window", sf::Style::Fullscreen);


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

	InputHandler inputHandler(App,camera);
	DisplayHandler displayHandler(App,camera,world,UI);

	while (App.IsOpened())
	{
		sf::Event Event;
		while (App.GetEvent(Event))
		{
			// Resize window
			if (Event.Type == sf::Event::Resized){
				//glViewport(0, 0, Event.Size.Width, Event.Size.Height);
				//glViewport(0, 0,600, 600);
			}


			//inputHandler.loopInputs(camera);// Process events
			//displayHandler.loopDisplay(camera,world);
			//Camera* p_camera = &camera;
			inputHandler.loopInputs();// Process events
			//displayHandler.loopDisplay();

			// Window closed
			if (Event.Type == sf::Event::Closed){
				App.Close();
			}
		}
		displayHandler.loopDisplay();
		//App.Display();
	}

	// For some reason, we want to terminate the thread
    //Thread.Terminate(); //this is unsafe
	//ThreadRunning = false;
	//Thread.Wait(); //wait for thread to terminate

    return EXIT_SUCCESS;
}