#include "interface.h"


Interface::Interface(){
	// Load from a font file on disk
	if (!InterfaceFont.loadFromFile("LCD.ttf"))
	{
	     std::cout << "could not load font!\n";
	}else{
		Label = sf::Text("Hello", InterfaceFont, 30);
		//Label = sf::Text("Hello", sf::Font::getDefaultFont(), 30);
		Label.setPosition(100.f, 200.f);
	}
	if(debug)std::cout << "interface constructed!\n";
}

Interface::~Interface(){
	if(debug)std::cout << "interface destructed!\n";
}

void Interface::draw(){
}

