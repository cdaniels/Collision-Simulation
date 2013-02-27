/*#include "octree.h"


//Constructs a new Octree.  c1 is (minX, minY, minZ), c2 is (maxX, maxY,
//maxZ), and d is the depth, which starts at 1.
Octree::Octree(glm::vec3 c1, glm::vec3 c2, int d) {
	corner1 = c1;
	corner2 = c2;
	center = (c1 + c2) / 2;
	depth = d;
	numBalls = 0;
	hasChildren = false;
}
		
//Destructor
Octree::~Octree() {
	if (hasChildren) {
		destroyChildren();
	}
}
		
//Adds a ball to or removes one from the children of this
void Octree::fileBall(Ball* ball, glm::vec3 pos, bool addBall) {
	//Figure out in which child(ren) the ball belongs
	for(int x = 0; x < 2; x++) {
		if (x == 0) {
			if (pos[0] - ball->r > center[0]) {
				continue;
			}
		}
		else if (pos[0] + ball->r < center[0]) {
			continue;
		}
				
		for(int y = 0; y < 2; y++) {
			if (y == 0) {
				if (pos[1] - ball->r > center[1]) {
					continue;
				}
			}
			else if (pos[1] + ball->r < center[1]) {
				continue;
			}
					
			for(int z = 0; z < 2; z++) {
				if (z == 0) {
					if (pos[2] - ball->r > center[2]) {
						continue;
					}
				}
				else if (pos[2] + ball->r < center[2]) {
					continue;
				}
						
				//Add or remove the ball
				if (addBall) {
					children[x][y][z]->add(ball);
				}
				else {
					children[x][y][z]->remove(ball, pos);
				}
			}
		}
	}
}
		
//Creates children of this, and moves the balls in this to the children
void Octree::haveChildren() {
	for(int x = 0; x < 2; x++) {
		float minX;
		float maxX;
		if (x == 0) {
			minX = corner1[0];
			maxX = center[0];
		}
		else {
			minX = center[0];
			maxX = corner2[0];
		}
				
		for(int y = 0; y < 2; y++) {
			float minY;
			float maxY;
			if (y == 0) {
				minY = corner1[1];
				maxY = center[1];
			}
			else {
				minY = center[1];
				maxY = corner2[1];
			}
					
			for(int z = 0; z < 2; z++) {
				float minZ;
				float maxZ;
				if (z == 0) {
					minZ = corner1[2];
					maxZ = center[2];
				}
				else {
					minZ = center[2];
					maxZ = corner2[2];
				}
						
				children[x][y][z] = new Octree(glm::vec3(minX, minY, minZ),
												glm::vec3(maxX, maxY, maxZ),
												depth + 1);
			}
		}
	}
			
	//Remove all balls from "balls" and add them to the new children
	for(std::set<Ball*>::iterator it = balls.begin(); it != balls.end();
			it++) {
		Ball* ball = *it;
		fileBall(ball, ball->pos, true);
	}
	balls.clear();
			
	hasChildren = true;
}
		
//Adds all balls in this or one of its descendants to the specified set
void Octree::collectBalls(std::set<Ball*> &bs) {
	if (hasChildren) {
		for(int x = 0; x < 2; x++) {
			for(int y = 0; y < 2; y++) {
				for(int z = 0; z < 2; z++) {
					children[x][y][z]->collectBalls(bs);
				}
			}
		}
	}
	else {
		for(std::set<Ball*>::iterator it = balls.begin(); it != balls.end();
				it++) {
			Ball* ball = *it;
			bs.insert(ball);
		}
	}
}
		
//Destroys the children of this, and moves all balls in its descendants
//to the "balls" set
void Octree::destroyChildren() {
	//Move all balls in descendants of this to the "balls" set
	collectBalls(balls);
			
	for(int x = 0; x < 2; x++) {
		for(int y = 0; y < 2; y++) {
			for(int z = 0; z < 2; z++) {
				delete children[x][y][z];
			}
		}
	}
			
	hasChildren = false;
}
		
//Removes the specified ball at the indicated position
void Octree::remove(Ball* ball, glm::vec3 pos) {
	numBalls--;
			
	if (hasChildren && numBalls < MIN_BALLS_PER_OCTREE) {
		destroyChildren();
	}
			
	if (hasChildren) {
		fileBall(ball, pos, false);
	}
	else {
		balls.erase(ball);
	}
}
		
/* Helper fuction for potentialBallWallCollisions(vector).  Adds
	* potential ball-wall collisions to cs, where w is the type of wall,
	* coord is the relevant coordinate of the wall ('x', 'y', or 'z'), and
	* dir is 0 if the wall is in the negative direction and 1 if it is in
	* the positive direction.  Assumes that this is in the extreme
	* direction of the coordinate, e.g. if w is WALL_TOP, the function
	* assumes that this is in the far upward direction.
	*/
/*void Octree::potentialBallWallCollisions(std::vector<BallWallPair> &cs,
									Wall w, char coord, int dir) {
	if (hasChildren) {
		//Recursively call potentialBallWallCollisions on the correct
		//half of the children (e.g. if w is WALL_TOP, call it on
		//children above centerY)
		for(int dir2 = 0; dir2 < 2; dir2++) {
			for(int dir3 = 0; dir3 < 2; dir3++) {
				Octree *child;
				switch (coord) {
					case 'x':
						child = children[dir][dir2][dir3];
						break;
					case 'y':
						child = children[dir2][dir][dir3];
						break;
					case 'z':
						child = children[dir2][dir3][dir];
						break;
				}
						
				child->potentialBallWallCollisions(cs, w, coord, dir);
			}
		}
	}
	else {
		//Add (ball, w) for all balls in this
		for(std::set<Ball*>::iterator it = balls.begin(); it != balls.end();
				it++) {
			Ball* ball = *it;
			BallWallPair bwp;
			bwp.ball = ball;
			bwp.wall = w;
			cs.push_back(bwp);
		}
	}
}

		
//Adds a ball to this
void Octree::add(Ball* ball) {
	numBalls++;
	if (!hasChildren && depth < MAX_OCTREE_DEPTH &&
		numBalls > MAX_BALLS_PER_OCTREE) {
		haveChildren();
	}
			
	if (hasChildren) {
		fileBall(ball, ball->pos, true);
	}
	else {
		balls.insert(ball);
	}
}
		
//Removes a ball from this
void Octree::remove(Ball* ball) {
	remove(ball, ball->pos);
}
		
//Changes the position of a ball in this from oldPos to ball->pos
void Octree::ballMoved(Ball* ball, glm::vec3 oldPos) {
	remove(ball, oldPos);
	add(ball);
}
		
//Adds potential ball-ball collisions to the specified set
void Octree::potentialBallBallCollisions(std::vector<BallPair> &collisions) {
	if (hasChildren) {
		for(int x = 0; x < 2; x++) {
			for(int y = 0; y < 2; y++) {
				for(int z = 0; z < 2; z++) {
					children[x][y][z]->
						potentialBallBallCollisions(collisions);
				}
			}
		}
	}
	else {
		//Add all pairs (ball1, ball2) from balls
		for(std::set<Ball*>::iterator it = balls.begin(); it != balls.end();
				it++) {
			Ball* ball1 = *it;
			for(std::set<Ball*>::iterator it2 = balls.begin();
					it2 != balls.end(); it2++) {
				Ball* ball2 = *it2;
				//This test makes sure that we only add each pair once
				if (ball1 < ball2) {
					BallPair bp;
					bp.ball1 = ball1;
					bp.ball2 = ball2;
					collisions.push_back(bp);
				}
			}
		}
	}
}
		
//Adds potential ball-wall collisions to the specified set
void Octree::potentialBallWallCollisions(std::vector<BallWallPair> &collisions) {
	potentialBallWallCollisions(collisions, WALL_LEFT, 'x', 0);
	potentialBallWallCollisions(collisions, WALL_RIGHT, 'x', 1);
	potentialBallWallCollisions(collisions, WALL_BOTTOM, 'y', 0);
	potentialBallWallCollisions(collisions, WALL_TOP, 'y', 1);
	potentialBallWallCollisions(collisions, WALL_FAR, 'z', 0);
	potentialBallWallCollisions(collisions, WALL_NEAR, 'z', 1);
}*/
