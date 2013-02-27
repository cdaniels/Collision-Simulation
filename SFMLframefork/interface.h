//interface.h
// header for the user interface
// handles the 2d overlay on which text is displayed

#ifndef INTERFACE_H
#define INTERFACE_H

#include <SFML/Graphics.hpp>
#include <SFML/Window/OpenGL.hpp>
#include <iostream>

/*#include "Gwen/Gwen.h"
#include "Gwen/Skins/Simple.h"
#include "Gwen/Skins/TexturedBase.h"
#include "Gwen/UnitTest/UnitTest.h"
#include "Gwen/Input/Windows.h"*/

////////////////////////////////////////////////////////////////////////////////
// Class name: DisplayHandler
////////////////////////////////////////////////////////////////////////////////
class Interface
{
public:
	Interface();
	~Interface();
	void draw();
private:
	static const int stringNumber = 4;

	sf::Font InterfaceFont;
	//sf::String Text[stringNumber];
	sf::Text Label;

	static const bool debug = true;
};


#endif
