const MAX_OCTREE_DEPTH = 6;//or var can be used
const MIN_BALLS_PER_OCTREE = 3;
const MAX_BALLS_PER_OCTREE = 6;

function Octree(corner1,corner2,depth){
	this.corner1=corner1;
	this.corner2=corner2;
	this.depth=depth;
	this.numBalls = 0;
	this.hasChildren = false;
	
	//this.children = [[[[],[]],[[],[]]],[[[],[]],[[],[]]]];
	this.children = [];
	this.balls = [];
	
	/*this.test = function(){
		console.log("sucess");
	}*/
	
	this.fileBall = function(){
	}
	
	this.haveChildren = function(){
	}
	
	this.destroyChildren = function(){
		console.log("children destroyed");
	}
	
	this.remove = function(ball,pos){
		this.numBalls--;
		//this.hasChildren =true;
		//console.log("sucess 2: numBalls is: "+this.numBalls);
		if(this.hasChildren && this.numBalls < MIN_BALLS_PER_OCTREE){
			this.destroyChildren();
		}
		if (this.hasChildren) {
			this.fileBall(ball, pos, false);
		}
		else {
			//this.balls.erase(ball);
			console.log("ball removed");
		}
	}
	
	this.add = function(ball){
		//console.log("sucess 2: numBalls is: "+this.numBalls);
		this.numBalls++;
		//console.log("sucess 2: numBalls is: "+this.numBalls);
		if(!this.hasChildren && depth < MAX_BALLS_PER_OCTREE &&
			this.numBalls > MAX_BALLS_PER_OCTREE){
			this.haveChildren();
		}
		if (this.hasChildren) {
			this.fileBall(ball, ball.position, true);
		}
		else {
			//this.balls.insert(ball);
		}
	}
	
	this.ballMoved = function(ball,old_pos){
		this.remove(ball,old_pos);
		this.add(ball);
		//console.log("sucess 1");
	} 
}




