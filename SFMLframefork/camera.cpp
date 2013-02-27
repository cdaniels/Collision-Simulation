
#include"camera.h"


Camera::Camera(GLfloat position[3],GLfloat rotation[3])
{
	if(debug){std::cout << "Camera constructed!\n";}
	rot[3] = position[3];
	rot[3] = rotation[3];
}

Camera::Camera()
{
	//GLfloat pos[3] = {0.0,0.0,0.0};
	//GLfloat rot[3] = {0.0,0.0,0.0};
	rot[0]=0.0;
	rot[1]=0.0;
	rot[2]=0.0;
	pos[0]=0.0;
	pos[1]=0.0;
	pos[2]=0.0;
	if(debug){
		std::cout << "Camera constructed!\n";
		//std::cout << "new rotation is: " << (int)rot[0]<<(int)rot[1]<<(int)rot[3] <<std::endl;
		std::cout << "new rotation is: " << (int)rot[0]<<(int)rot[1]<<(int)rot[2] <<std::endl;
		std::cout << "new position is: " << (int)pos[0]<<(int)pos[1]<<(int)pos[2] <<std::endl;
	}
	rotspeed = 1.0;
	//eye = glm::vec3(0,0,0);
	//center = glm::vec3(0,0,0);
}

Camera::Camera(Camera& camera){
}

Camera::~Camera()
{
	if(debug){std::cout << "Camera destructed!\n";}
}

void Camera::syncViewPort(){
	glLoadIdentity();
	glTranslatef(pos[0],pos[1],pos[2]);
	glRotatef(rot[0],1.0,0.0,0.0);       //# Rotate The Cube On X
    glRotatef(rot[1],0.0,1.0,0.0);       //# Rotate The Cube On Y 
    glRotatef(rot[2],0.0,0.0,1.0);
	//std::cout << "Viewport synced\n";
	//std::cout << "new rotation is: " << (int)rot[0]<<(int)rot[1]<<(int)rot[2] <<std::endl;
	//std::cout << "new position is: " << (int)pos[0]<<(int)pos[1]<<(int)pos[2] <<std::endl;
	//gluLookAt(eye.x,eye.y,eye.z, center.x,center.y,center.z, 0,1,0);
};

void Camera::setViewPort(GLfloat position[3],GLfloat rotation[3]){
	//pos[3] = position[3];
	//rot[3] = rotation[3];
	pos[0] = position[0];
	pos[1] = position[1];
	pos[2] = position[2];
	rot[0] = rotation[0];
	rot[1] = rotation[1];
	rot[2] = rotation[2];
	if(debug){
		std::cout << "new position is at: " << pos <<std::endl;
		std::cout << "new rotation is at: " << rot <<std::endl;
		std::cout << "new rotation is: " << rot[0]<<rot[1]<<rot[2] <<std::endl;
		std::cout << "new position is: " << pos[0]<<pos[1]<<pos[2] <<std::endl;
	}
};

void Camera::incrementRotation(GLfloat x,GLfloat y,GLfloat z){
	if(debug){std::cout << "adding rotation: " << x<<y<<z <<std::endl;}
	rot[0] += x * rotspeed;
	rot[1] += y * rotspeed;
	rot[2] += z * rotspeed;
	if(debug){
		std::cout << "new rotation is: " << rot[0]<<rot[1]<<rot[2] <<std::endl;
		std::cout << "new position is: " << pos[0]<<pos[1]<<pos[2] <<std::endl;
	}
};

//void Camera::turn(glm::vec3 turn){
//	this->center += turn;
//};

//void Camera::setEyePosition(glm::vec3 eye){
//	this->eye = eye;
//}

//void Camera::setViewDirection(glm::vec3 center){
//	this->center = center;
//}

GLfloat Camera::getPosition(){
	return pos[0];
};

GLfloat Camera::getRotation(){
	return rot[0];
};
	
