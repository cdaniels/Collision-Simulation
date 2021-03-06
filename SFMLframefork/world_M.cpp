
#include"world.h"


World::World()
{
	std::cout << "World constructed!\n";
	//ballNumber = 20;
	//ballSpeed = 0.03;

	//ballSize = 0.1;
	//GLfloat boxSize = 75.0;
	//GLfloat boxRGB[3] = {0.0,1.0,0.0};
	//frame_box = Box(boxSize,boxRGB);

	//GLfloat ballRadius = 5.0;
	//GLfloat ballMass = 1.0;
	//GLfloat ballRGB[3] = {0.0,0.0,0.5};
	//sf::Color color(0,0,125);
	//test_ball = Atom(ballRadius,ballMass,color);
	//sf::Color color(0,0,125);

	// well set mass proportionate to volume
	//volume is (4/3)*(pi)*(r*r)
	/*GLfloat factor = (4/3)* 3.14159265358979323;
	atom_type[0]  = Atom(3,factor*3*3, sf::Color(255,255,255));
	atom_type[1] = Atom(5,factor*5*5, sf::Color(125,0,0));
	atom_type[2]  = Atom(8,factor*8*8, sf::Color(0,0,125));
	atom_type[3]  = Atom(10,factor*10*10, sf::Color(255,125,0));

	collision_count = 0;
	bond_count = 0;*/

	// create arrays for ball positions and velocities and acceleration
	/*glm::vec3 * pos_Vectors = new glm::vec3[ballNumber];
	glm::vec3 * vel_Vectors = new glm::vec3[ballNumber];
	glm::vec3 * acc_Vectors = new glm::vec3[ballNumber];
	GLfloat * mass_array = new GLfloat[ballNumber];
	bool  bond_array[ballNumber][ballNumber];//= new GLfloat[ballNumber][ballNumber];*/
	/*mass1 = 0.8;
	mass2 = 1.0;
	mass3 = 1.5;
	mass4 = 2.0;
	enum atom_type(mass1,mass2,mass3,mass4);*/

	//populate arrays

	//seed random value
	/*srand((unsigned)time(0));
	for(int i=0; i <ballNumber ; i++)

	{
		int lowest=-boxSize/2, highest= boxSize/2;
		int range=(highest-lowest)+1;
		//float px = sf::Randomizer::Random(lowest, highest);
		//float py = sf::Randomizer::Random(lowest, highest);
		//float pz = sf::Randomizer::Random(lowest, highest);
		float px = lowest+float(range*rand()/(RAND_MAX + 1.0));
		float py = lowest+float(range*rand()/(RAND_MAX + 1.0));
		float pz = lowest+float(range*rand()/(RAND_MAX + 1.0));
		pos_Vectors[i] = glm::vec3(px,py,pz);
		//float vx = (sf::Randomizer::Random(lowest, highest))*ballSpeed;
		//float vy = (sf::Randomizer::Random(lowest, highest))*ballSpeed;
		//float vz = (sf::Randomizer::Random(lowest, highest))*ballSpeed;
		float vx = (lowest+float(range*rand()/(RAND_MAX + 1.0)))*ballSpeed;
		float vy = (lowest+float(range*rand()/(RAND_MAX + 1.0)))*ballSpeed;
		float vz = (lowest+float(range*rand()/(RAND_MAX + 1.0)))*ballSpeed;
		vel_Vectors[i] = glm::vec3(vx,vy,vz);
		//vel_Vectors[i] = glm::vec3(0.0,0.0,0.0);

		/*populate the mass array
		if(i<20){
			mass_array[i] = 2.0;
		}else if(i<70){
			mass_array[i] = 1.5;
		}else if(i<170){
			mass_array[i] = 1.0;
		}else{
			mass_array[i] = 0.8;
		}*/
		//populate the mass array
		/*if(i<20){
			type_array[i] = 3;
		}else if(i<70){
			type_array[i] = 2;
		}else if(i<170){
			type_array[i] = 1;
		}else{
			type_array[i] = 0;
		}
	}*/
	float _angle = 0.0f; //The camera angle
	float _timeUntilUpdate = 0;
}

World::World(World& world){
}

World::~World()
{
	std::cout << "World destructed!\n";
	//delete pos_Vectors;
	//delete vel_Vectors;
	//delete acc_Vectors;
	//delete mass_array;
	//delete bond_array;
}

/*void World::drawBoundry(){
	//glLoadIdentity();
	//glTranslatef(0.0,0.0,-200.f);
	frame_box.draw();
}*/

/*bool World::testBallBallCollision(int i, int j){
	GLfloat seperation = glm::distance(pos_Vectors[i],pos_Vectors[j]);
	//if (seperation <=  radius[i] + radius[j] ){
		glm::vec3 displacement = pos_Vectors[i] - pos_Vectors[j];
		glm::vec3 netVelocity = vel_Vectors[i] -vel_Vectors[j];
		return glm::dot(netVelocity,displacement)<0;
	//}else
	//	return false;
}
	
// takes an int i as a parameter that stands for the current balls index
// draws and runs collision detection for ball of index i and and
// its position and velocity vectors to allow for motion
void World::runSimulation(GLint i){// i is a placeholder from display for loop

//void World::simulate(){
	//for(int i=0; i<ballNumber ; i++)
	//{
		//Draw Balls
		//#Set position
		//glLoadIdentity();
		//glTranslatef(0.0,0.0,-200.f);
		//glLoadIdentity();
		//glRotatef(xtot,1.0,0.0,0.0);    //# Rotate on X
        //glRotatef(ytot,0.0,1.0,0.0);    //# Rotate on Y 
        //glRotatef(ztot,0.0,0.0,1.0);	//# Rotate on Z

		//#Draw sphere
		glTranslatef(pos_Vectors[i].x,pos_Vectors[i].y,pos_Vectors[i].z);
		
		/////////////////////////////////////////
		// a struct could make this simpler******?
		/*if(i>=type_0_min && i<type_0_max){
			atom_type = 0;
		}else if(i>=type_1_min && i<type_1_max){
			atom_type = 1;
		}else if(i>=type_2_min && i<type_2_max){
			atom_type = 2;
		}else if(i>=type_3_min && i<type_3_max){
			atom_type = 3;
		}*/
		//atom_type = ;
		/*GLfloat iMass;
		GLfloat radius;
		switch(type_array[i]){
			case 0: 
				atom_type[0].draw();
				iMass = atom_type[0].getMass();
				radius = atom_type[0].getRadius();
				break;
			case 1: 
				atom_type[1].draw();
				iMass = atom_type[1].getMass();
				radius = atom_type[1].getRadius();
				break;
			case 2: 
				atom_type[2].draw();
				iMass = atom_type[2].getMass();
				radius = atom_type[2].getRadius();
				break;
			case 3: 
				atom_type[3].draw();
				iMass = atom_type[3].getMass();
				radius = atom_type[3].getRadius();
				break;
		}
		//test_ball.draw();
		//atom_type[0].draw();
		
		//glLoadIdentity();
		//glFlush();
		pos_Vectors[i] += vel_Vectors[i];
		//wait(0.5);
		//vel_Vectors[i] += acc_Vectors[i];

		// collision detection
		GLfloat bound = frame_box.getLength();
		//GLfloat radius = test_ball.getRadius();
		if ((pos_Vectors[i].x - radius <= -bound)||(pos_Vectors[i].x + radius >= bound)){
			vel_Vectors[i].x *= -1;
		}if ((pos_Vectors[i].y - radius <= -bound)||(pos_Vectors[i].y + radius >= bound)){
			vel_Vectors[i].y *= -1;
		}if ((pos_Vectors[i].z - radius <= -bound)||(pos_Vectors[i].z + radius >= bound)){
			vel_Vectors[i].z *= -1;
		}

		for (int j=0;j<ballNumber;j++){
			if(i!=j){
				GLfloat seperation = glm::distance(pos_Vectors[i],pos_Vectors[j]);
				glm::vec3 displacement = pos_Vectors[i] - pos_Vectors[j];
				glm::vec3 netVelocity = vel_Vectors[i] -vel_Vectors[j];
				
				if(glm::dot(netVelocity,displacement)<0){
					// get j mass
					GLfloat jMass;
					switch(type_array[j]){
					case 0: 
						jMass = atom_type[0].getMass();
						break;
					case 1: 
						jMass = atom_type[1].getMass();
						break;
					case 2: 
						jMass = atom_type[2].getMass();
						break;
					case 3: 
						jMass = atom_type[3].getMass();
						break;
					}
					//#collision vector
					//glm::vec3 collisionV = pos_Vectors[i] - pos_Vectors[j];
					//glm::vec3 ncollisionV = collisionV/glm::normalize(collisionV);
					if (seperation <= 2 * radius){

						//////////////////////////////////////
						///////////sync bound balls//////////
						//GLfloat bond_radius = 1.8 * augmented_radius;
						//if (seperation <= bond_radius)
						//if (bond_array[i][j]){
							//vel_Vectors[i] = vel_Vectors[j];
							//vel_Vectors[j] = vel_Vectors[i];
						//}else{
							//#collision vector
							glm::vec3 collisionV = pos_Vectors[i] - pos_Vectors[j];
							glm::vec3 ncollisionV = collisionV/glm::normalize(collisionV);
				

							//glm::vec3 ncollisionV = normalize(collisionV);
							GLfloat iInit = glm::dot(vel_Vectors[i],ncollisionV);
							GLfloat jInit = glm::dot(vel_Vectors[j],ncollisionV);

							//set masses
							//GLfloat iMass = mass_array[i];
							//GLfloat jMass = mass_array[j];

							//mass differences and sum
							GLfloat mDiffi = iMass - jMass;
							GLfloat mDiffj = jMass - iMass;
							GLfloat mSum = iMass + jMass;

							///////////////////////////////////////
							////////////momentum exchange//////////////////
							glm::vec3 new_veli = (vel_Vectors[i]*mDiffi + 2*jMass*vel_Vectors[j])/mSum;
							glm::vec3 new_velj = (vel_Vectors[j]*mDiffj + 2*iMass*vel_Vectors[i])/mSum;
							vel_Vectors[i] = new_veli;
							vel_Vectors[j] = new_velj;

							/// add tangential compnent ////
							//glm::vec3 aug_veli = new_veli + iProj;
							//glm::vec3 aug_velj = new_velj + jProj;
							//vel_Vectors[i] = aug_veli;
							//vel_Vectors[j] = aug_velj;


							///////////////////////////////////
							/////////bond condition///////
							//if (iMass <= jMass){

								//set bond array
								//bond_array[i][j] = true;

								//link positions
								//ncollisionV *= .2;
								//pos_Vectors[i] += ncollisionV;
								//pos_Vectors[j] -= ncollisionV;
								//bond_count ++;
							//}
					

							//wait(0.2);
							collision_count += 1;
						//}
					}
				}
				//#apply forces
				//GLfloat g_constant = .0000007;
				//GLfloat g_factor = g_constant / (seperation * seperation) ;
				//glm::vec3 attraction =  g_factor * ncollisionV;
				//acc_Vectors[i] += -attraction;
				//acc_Vectors[j] += attraction;
				
			}
		}
	//}
}

GLint World::getBallNumber(){
	return this->ballNumber;
}*/

//Puts potential ball-ball collisions in potentialCollisions.  It must return
//all actual collisions, but it need not return only actual collisions.
void World::potentialBallBallCollisions(vector<BallPair> &potentialCollisions,
								 vector<Ball*> &balls, Octree* octree) {
	//Fast method
	octree->potentialBallBallCollisions(potentialCollisions);
	
	/*
	//Slow method
	for(unsigned int i = 0; i < balls.size(); i++) {
		for(unsigned int j = i + 1; j < balls.size(); j++) {
			BallPair bp;
			bp.ball1 = balls[i];
			bp.ball2 = balls[j];
			potentialCollisions.push_back(bp);
		}
	}
	*/
}

//Puts potential ball-wall collisions in potentialCollisions.  It must return
//all actual collisions, but it need not return only actual collisions.
void World::potentialBallWallCollisions(vector<BallWallPair> &potentialCollisions,
								 vector<Ball*> &balls, Octree* octree) {
	//Fast method
	octree->potentialBallWallCollisions(potentialCollisions);
	
	/*
	//Slow method
	Wall walls[] =
		{WALL_LEFT, WALL_RIGHT, WALL_FAR, WALL_NEAR, WALL_TOP, WALL_BOTTOM};
	for(unsigned int i = 0; i < balls.size(); i++) {
		for(int j = 0; j < 6; j++) {
			BallWallPair bwp;
			bwp.ball = balls[i];
			bwp.wall = walls[j];
			potentialCollisions.push_back(bwp);
		}
	}
	*/
}

//Moves all of the balls by their velocity times dt
void World::moveBalls(vector<Ball*> &balls, Octree* octree, float dt) {
	for(unsigned int i = 0; i < balls.size(); i++) {
		Ball* ball = balls[i];
		Vec3f oldPos = ball->pos;
		ball->pos += ball->v * dt;
		octree->ballMoved(ball, oldPos);
	}
}

//Decreases the y coordinate of the velocity of each ball by GRAVITY *
//TIME_BETWEEN_UPDATES
void World::applyGravity(vector<Ball*> &balls) {
	for(unsigned int i = 0; i < balls.size(); i++) {
		Ball* ball = balls[i];
		ball->v -= Vec3f(0, GRAVITY * TIME_BETWEEN_UPDATES, 0);
	}
}

//Returns whether two balls are colliding
bool World::testBallBallCollision(Ball* b1, Ball* b2) {
	//Check whether the balls are close enough
	float r = b1->r + b2->r;
	if ((b1->pos - b2->pos).magnitudeSquared() < r * r) {
		//Check whether the balls are moving toward each other
		Vec3f netVelocity = b1->v - b2->v;
		Vec3f displacement = b1->pos - b2->pos;
		return netVelocity.dot(displacement) < 0;
	}
	else
		return false;
}

//Handles all ball-ball collisions
void World::handleBallBallCollisions(vector<Ball*> &balls, Octree* octree) {
	vector<BallPair> bps;
	potentialBallBallCollisions(bps, balls, octree);
	for(unsigned int i = 0; i < bps.size(); i++) {
		BallPair bp = bps[i];
		
		Ball* b1 = bp.ball1;
		Ball* b2 = bp.ball2;
		if (testBallBallCollision(b1, b2)) {
			//Make the balls reflect off of each other
			Vec3f displacement = (b1->pos - b2->pos).normalize();
			b1->v -= 2 * displacement * b1->v.dot(displacement);
			b2->v -= 2 * displacement * b2->v.dot(displacement);
		}
	}
}

//Returns the direction from the origin to the wall
Vec3f World::wallDirection(Wall wall) {
	switch (wall) {
		case WALL_LEFT:
			return Vec3f(-1, 0, 0);
		case WALL_RIGHT:
			return Vec3f(1, 0, 0);
		case WALL_FAR:
			return Vec3f(0, 0, -1);
		case WALL_NEAR:
			return Vec3f(0, 0, 1);
		case WALL_TOP:
			return Vec3f(0, 1, 0);
		case WALL_BOTTOM:
			return Vec3f(0, -1, 0);
		default:
			return Vec3f(0, 0, 0);
	}
}

//Returns whether a ball and a wall are colliding
bool World::testBallWallCollision(Ball* ball, Wall wall) {
	Vec3f dir = wallDirection(wall);
	//Check whether the ball is far enough in the "dir" direction, and whether
	//it is moving toward the wall
	return ball->pos.dot(dir) + ball->r > BOX_SIZE / 2 &&
			ball->v.dot(dir) > 0;
}

//Handles all ball-wall collisions
void World::handleBallWallCollisions(vector<Ball*> &balls, Octree* octree) {
	vector<BallWallPair> bwps;
	potentialBallWallCollisions(bwps, balls, octree);
	for(unsigned int i = 0; i < bwps.size(); i++) {
		BallWallPair bwp = bwps[i];
		
		Ball* b = bwp.ball;
		Wall w = bwp.wall;
		if (testBallWallCollision(b, w)) {
			//Make the ball reflect off of the wall
			Vec3f dir = (wallDirection(w)).normalize();
			b->v -= 2 * dir * b->v.dot(dir);
		}
	}
}

//Applies gravity and handles all collisions.  Should be called every
//TIME_BETWEEN_UPDATES seconds.
void World::performUpdate(vector<Ball*> &balls, Octree* octree) {
	applyGravity(balls);
	handleBallBallCollisions(balls, octree);
	handleBallWallCollisions(balls, octree);
}

//Advances the state of the balls by t.  timeUntilUpdate is the amount of time
//until the next call to performUpdate.
void World::advance(vector<Ball*> &balls,
			 Octree* octree,
			 float t,
			 float &timeUntilUpdate) {
	while (t > 0) {
		if (timeUntilUpdate <= t) {
			moveBalls(balls, octree, timeUntilUpdate);
			performUpdate(balls, octree);
			t -= timeUntilUpdate;
			timeUntilUpdate = TIME_BETWEEN_UPDATES;
		}
		else {
			moveBalls(balls, octree, t);
			timeUntilUpdate -= t;
			t = 0;
		}
	}
}

//Deletes everything.  This should be called when exiting the program.
void World::cleanup() {
	for(unsigned int i = 0; i < _balls.size(); i++) {
		delete _balls[i];
	}
	delete _octree;
}