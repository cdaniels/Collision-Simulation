#include <SFML/System.hpp>
#include <iostream>

class MyClass : private sf::Thread
{
public :

    void DoSomething()
    {
        Launch();
    }

private :

    virtual void Run()
    {
        // Do something...
    }
};