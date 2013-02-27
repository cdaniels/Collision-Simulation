/*#include <glm\glm.hpp>
//#include <cstdlib>
//#include <stdlib.h>
#include <vector>
#include <set>
#include "ball.h"

const int MAX_OCTREE_DEPTH = 6;
const int MIN_BALLS_PER_OCTREE = 3;
const int MAX_BALLS_PER_OCTREE = 6;

enum Wall {WALL_LEFT, WALL_RIGHT, WALL_FAR, WALL_NEAR, WALL_TOP, WALL_BOTTOM};

//Stores information regarding a ball
//struct Ball {
//	glm::vec3 v; //Velocity
//	glm::vec3 pos; //Position
//	float r; //Radius
//	glm::vec3 color;
//};

//Stores a pair of balls
struct BallPair {
	Ball* ball1;
	Ball* ball2;
};

//Stores a ball and a wall
struct BallWallPair {
	Ball* ball;
	Wall wall;
};

//Our data structure for making collision detection faster
class Octree {
	private:
		glm::vec3 corner1; //(minX, minY, minZ)
		glm::vec3 corner2; //(maxX, maxY, maxZ)
		glm::vec3 center;//((minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2)
		
		/* The children of this, if this has any.  children[0][*][*] are the
		 * children with x coordinates ranging from minX to centerX.
		 * children[1][*][*] are the children with x coordinates ranging from
		 * centerX to maxX.  Similarly for the other two dimensions of the
		 * children array.
		 */
		/*Octree *children[2][2][2];
		//Whether this has children
		bool hasChildren;
		//The balls in this, if this doesn't have any children
		std::set<Ball*> balls;
		//The depth of this in the tree
		int depth;
		//The number of balls in this, including those stored in its children
		int numBalls;
		
		//Adds a ball to or removes one from the children of this
		void fileBall(Ball* ball, glm::vec3 pos, bool addBall);
		
		//Creates children of this, and moves the balls in this to the children
		void haveChildren();
		
		//Adds all balls in this or one of its descendants to the specified set
		void collectBalls(std::set<Ball*> &bs);
		
		//Destroys the children of this, and moves all balls in its descendants
		//to the "balls" set
		void destroyChildren();
		
		//Removes the specified ball at the indicated position
		void remove(Ball* ball, glm::vec3 pos);
		
		/* Helper fuction for potentialBallWallCollisions(vector).  Adds
		 * potential ball-wall collisions to cs, where w is the type of wall,
		 * coord is the relevant coordinate of the wall ('x', 'y', or 'z'), and
		 * dir is 0 if the wall is in the negative direction and 1 if it is in
		 * the positive direction.  Assumes that this is in the extreme
		 * direction of the coordinate, e.g. if w is WALL_TOP, the function
		 * assumes that this is in the far upward direction.
		 */
		/*void potentialBallWallCollisions(std::vector<BallWallPair> &cs,
										 Wall w, char coord, int dir);
	public:
		//Constructs a new Octree.  c1 is (minX, minY, minZ), c2 is (maxX, maxY,
		//maxZ), and d is the depth, which starts at 1.
		Octree(glm::vec3 c1, glm::vec3 c2, int d);
		
		//Destructor
		~Octree();
		
		//Adds a ball to this
		void add(Ball* ball);
		
		//Removes a ball from this
		void remove(Ball* ball);
		
		//Changes the position of a ball in this from oldPos to ball->pos
		void ballMoved(Ball* ball, glm::vec3 oldPos);
		
		//Adds potential ball-ball collisions to the specified set
		void potentialBallBallCollisions(std::vector<BallPair> &collisions);
		
		//Adds potential ball-wall collisions to the specified set
		void potentialBallWallCollisions(std::vector<BallWallPair> &collisions);
};