WebGL Ideal Gas Simulation Readme
by Alden Chad Daniels 05/01/2013
##################################

-----------------------------Program Description-----------------------------

The Ideal Gas SImulation program is a Javascript simulation of
ideal gas behavior which runs embedded in the browser through an
HTML page. It is meant to make statistical mechanics more approachable
by accompanying its concepts with visual aids and interactive features.

The program consists of a 3-D box into which a number of balls
(representing particles) are spawned and sent off to mutually collide
with one another and the walls. Alongside the box a number of graphs are
displayed which update as the balls collide and display their velocity 
distribution along with a calculation for the box pressure and volume.

The keyboard or mouse can be used to adjust the view of the system. 
In addition to this an HTML form appears below the box and has
editable entries that can change the system parameters, and a slider
is present which moves a stopper into the box to adjust its volume.

The webpage consists of an HTML file and accompanying style sheet:
	index.html
	project.css


-----------------------------Program Files-----------------------------
The program consists of a number of JavaScript files which are all
loaded upon the opening of the page and communicate back and forth with
one another.

These are: 
	project.js
	input.js
	display.js
	world.js

	buffers.js
	textures.js
	shaders.js

	octree.js
	graphs.js

In addition to these the following libraries are used for support:
	gl-matrix.js
	glMatrix-0.9.5.min.js
	jquery.flot.js
	webgl-utils.js

and an image file located in the Textures is used for texturing:
	grid.gif

-----------------------------File Descriptions-----------------------------

----------------project.js--------------
The project.js file contains the main program loop which is initiated
upon loading the page. 

It immediately calls initiation functions from the 
shader.js, buffer.js,texture.js, and world.js files, in that order.
These functions prepare the shaders, allocate memory in the buffers,
, load in the appropriate textures which will be used later, and 
generate the proper matrices for physics calculations which will
be performed.

The program then enters into the loop by a call to the 'tick' function
which recurvively calls itself for the duration of the program.

The 'tick' function sends sends repeated calls to functions in the
input.js,display.js, and world.js files which check for inputs and
then update the program according to the changes that are supposed 
to have occured.

----------------shaders.js--------------
The shader.js file has functions for getting and controlling
the shaders which are specialized pieces of code sent to the 
users GPU. The shaders themselves are in a script tag embedded in
the index.html file

----------------buffers.js--------------
The buffers.js file just contains one massive initiation
function which runs through and allocates memory for the
polygons used in the display.js file, and the textures used in the
texture.js.

----------------texture.js--------------
The textures.js file has functions for loading textures and for
binding them to the display.js draw functions.

It both loads the box texture from grid.gif
and creates a dummy white texture for the balls 
so that they can be colored

----------------world.js--------------
The world.js file contains all the physics calculations of the program.
It has an initiation function along with a number of physics 
testing and acting functions.

The initiation function generates matrices which correspond to the 
position and velocity of balls being used in the simulation.

A general handlePhysics is called here for every loop through 
the simulation.  It calls the testing / acting functions, and also
sends calls to sorting functions in the graphs.js file which
collect data from the simulation to plot.

The testing / acting functions perform the simulation by using
functions from the octree.js function to perform collision detection
between the balls and walls of the box. When a collision occurs,
the balls velocities are updated.


----------------input.js--------------
The input.js file contains functions which listen for user input through
the keyboard or mouse and respond by changing the approapriate variables 
in the display.js file so that the screen can be rotated.

----------------display.js--------------
The display.js file contains functions which utilize WebGL features to draw
the appropriate scene using models which rely on matrices allocated by the 
buffers.js file functions and textures which were loaded by 
textures.js functions.

----------------octree.js--------------
The octree.js file contains all the functions neccesary to create and modify an
octree which is a data structure that helps optimize collision detection.

the tree works by dividing the space of the box into 8 sub spaces whenever
too many balls are found to be present and then resorting those balls into 
the sub spaces, which are then recursively checked for balls and divided if
too many are present etc...

When collision detection is performed by the world.js functions a call is
give to getBallBallPair and getBallWallPair functions in the octree
which check the smallest subspaces for pairs and return them in a list.

----------------graphs.js--------------
The graph.js file is loaded seperately and runs alongside the loop which 
project.js uses. It has its own loops which check a number of local arrays
for data and then plot them in a number of graphs.

In addition to this it also has functions for sorting new data into the arrays.
These functions are called by world.js functions durring the update loop.


-----------------------------||||||||||||||||||-----------------------------









	
