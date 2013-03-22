const MAX_OCTREE_DEPTH = 3;//or var can be used
const MIN_BALLS_PER_OCTREE = 3;
const MAX_BALLS_PER_OCTREE = 6;

function BallWallPair(ball,wall){
	this.ball = ball;
	this.wall = wall;
}

function BallPair(ball1,ball2){
	this.ball1 = ball1;
	this.ball2 = ball2;
}

function potentialBallBallCollisions(bbp_list,ball_array,octree){
	octree.potentialBallBallCollisions(bbp_list);
}

function potentialBallWallCollisions(bwp_list,ball_array,octree){
	octree.potentialBallWallCollisions(bwp_list);
}

function Octree(corner1,corner2,depth){
	this.corner1=corner1;
	this.corner2=corner2;
	//??center could be wrong with lerp
	this.center = vec3.create();//linear interpolation determines central vector
	vec3.lerp(this.center,corner1,corner2,.5);
	this.depth=depth;
	console.log("child created with depth: "+depth);
	this.numBalls = 0;
	this.hasChildren = false;
	
	this.children = [[[[],[]],[[],[]]],[[[],[]],[[],[]]]];
	this.balls = [];
	
	//Adds a ball to or removes one from the children of this
	this.fileBall = function(ball,pos,addBall){
		//Figure out in which child(ren) the ball belongs
		for(var x = 0; x < 2; x++){
			if(x == 0){
				if(pos[0] - ball.radius > this.center[0]){
					continue;
				}
			}else if(pos[0] + ball.radius < this.center[0]){
				continue;
			}
			for(var y = 0; y < 2; y++){
				if(y == 0){
					if(pos[1] - ball.radius > this.center[1]){
						continue;
					}
				}else if(pos[1] + ball.radius < this.center[1]){
					continue;
				}
				for(var z = 0; z < 2; z++) {
					if(z == 0){
						if(pos[2] - ball.radius > this.center[2]){
							continue;
						}
					}else if(pos[2] + ball.radius < this.center[2]){
						continue;
					}
					
					//Add or remove the ball
					if(addBall){
						this.children[x][y][z].add(ball);
					}
					else{
						this.children[x][y][z].remove(ball,pos);
					}
				}//z close
			}//y close
		}//x close
	}
	
	//Adds all balls in this or one of its descendants to the specified set
	this.collectBalls = function(ball_set){
		if(this.hasChildren){
			for(var x = 0; x < 2; x++) {
				for(var y = 0; y < 2; y++) {
					for(var z = 0; z < 2; z++) {
						this.children[x][y][z].collectBalls(ball_set);
					}//z close
				}//y close
			}//x close
		}
		else{
			for(b=0;b<this.balls.length;b++){
				var ball = this.balls[b];
				ball_set.push(ball);
			}
		}
	}
	
	//Creates children of this, and moves the balls in this to the children
	this.haveChildren = function(){
		console.log("haveChildren called");
		for(var x = 0; x < 2; x++) {
			if (x == 0) {
				var minX = this.corner1[0];
				var maxX = this.center[0];
			}else{
				var minX = this.center[0];
				var maxX = this.corner2[0];
			}
			for(var y = 0; y < 2; y++) {
				if (y == 0) {
					var minY = this.corner1[1];
					var maxY = this.center[1];
				}else{
					var minY = this.center[1];
					var maxY = this.corner2[1];
				}
				for(var z = 0; z < 2; z++) {
					if (z == 0) {
						var minZ = this.corner1[2];
						var maxZ = this.center[2];
					}else{
						var minZ = this.center[2];
						var maxZ = this.corner2[2];
					}
					var new_c1 = vec3.fromValues(minX,minY,minZ);
					var new_c2 = vec3.fromValues(maxX,maxY,maxZ);
					this.children[x][y][z] = new Octree(new_c1,new_c2,this.depth + 1);
				}//z close
			}//y close
		}//x close
		
		//Remove all balls from "balls" and add them to the new children
		for(b=0;b<this.balls.length;b++){
			var ball = this.balls[b];
			this.fileBall(ball,ball.position,true);
		}
		//console.log(this.balls.length);
		this.balls = [];
		//console.log("balls removed");
		this.hasChildren = true;
	}
	
	//Destroys the children of this, and moves all balls in its descendants
	//to the "balls" set
	this.destroyChildren = function(){
		//Move all balls in descendants of this to the "balls" set
		this.collectBalls(this.balls);
		
		for(var x = 0; x < 2; x++) {
			for(var y = 0; y < 2; y++) {
				for(var z = 0; z < 2; z++) {
					delete this.children[x][y][z];
					//console.log("child destroyed");
				}
			}
		}
		this.hasChildren = false;
		console.log("children destroyed");
	}
	
	//Removes the specified ball at the indicated position
	this.remove = function(ball,pos){
		this.numBalls--;
		//this.hasChildren =true;
		//this.numBalls =4;
		//console.log("sucess 2: numBalls is: "+this.numBalls);
		if(this.hasChildren && this.numBalls < MIN_BALLS_PER_OCTREE){
			this.destroyChildren();
		}
		if (this.hasChildren) {
			//console.log("before fileBall, in remove");
			this.fileBall(ball, pos, false);
		}
		else {
			var index = this.balls.indexOf(ball);
			this.balls.splice(index,1);
			//console.log("ball removed");
		}
	}
	
	this.add = function(ball){
		//console.log("# of balls before add: "+this.numBalls);
		//console.log("sucess 2: numBalls is: "+this.numBalls);
		this.numBalls ++;
		//console.log(this.balls.length);
		//console.log("sucess 2: numBalls is: "+this.numBalls);
		if(!this.hasChildren && this.depth < MAX_OCTREE_DEPTH &&
			this.numBalls > MAX_BALLS_PER_OCTREE){
			//console.log("before haveChildren");
			this.haveChildren();
		}
		if (this.hasChildren) {
			//console.log("before fileBall in add");
			this.fileBall(ball, ball.position, true);
		}
		else {
			this.balls.push(ball);
			//console.log(this.balls.length);
			//console.log("ball added");
		}
	}
	
	this.ballMoved = function(ball,old_pos){
		this.remove(ball,old_pos);
		this.add(ball);
		//console.log("sucess 1");
	} 
	
	this.potentialBallWallCollisionsSwitch = function(bwp_list) {
			this.potentialBallWallCollisions(bwp_list, "WALL_LEFT", 'x', 0);
			this.potentialBallWallCollisions(bwp_list, "WALL_RIGHT", 'x', 1);
			this.potentialBallWallCollisions(bwp_list, "WALL_BOTTOM", 'y', 0);
			this.potentialBallWallCollisions(bwp_list, "WALL_TOP", 'y', 1);
			this.potentialBallWallCollisions(bwp_list, "WALL_FAR", 'z', 0);
			this.potentialBallWallCollisions(bwp_list, "WALL_NEAR", 'z', 1);
	}
	
	// bwp_list is the list of ball wall pairs
	this.potentialBallWallCollisions = function(bwp_list,wall,coord,dir){
		if(this.hasChildren){
			//Recursively call potentialBallWallCollisions on the correct
			//half of the children (e.g. if w is WALL_TOP, call it on
			//children above centerY)
			for(var dir2=0;dir2<2;dir2++){
				for(var dir3=0;dir3<2;dir3++){
					switch(coord){
						case 'x':
							var child = this.children[dir][dir2][dir3];
							break;
						case 'y':
							var child = this.children[dir2][dir][dir3];
							break;
						case 'z':
							var child = this.children[dir2][dir3][dir];
							break;
					}
					child.potentialBallWallCollisions(bwp_list,wall,coord,dir);
				}
			}
		}
		else{
			//Add (ball, wall) for all balls in this
			for(b=0;b<this.balls.length;b++){
				var ball = this.balls[b];
				var bwp = new BallWallPair(ball,wall);
				bwp_list.push(bwp);
			}
		}
	}
	
	this.potentialBallBallCollisions = function(bbp_list){
		if(this.hasChildren){
			for(var x = 0; x < 2; x++) {
				for(var y = 0; y < 2; y++) {
					for(var z = 0; z < 2; z++) {
						//console.log("calling child in potential bbp :");
						this.children[x][y][z].potentialBallBallCollisions(bbp_list);
					}//z close
				}//y close
			}//x close
		}
		else{
			//Add all pairs (ball1, ball2) from balls
			for(b=0;b<this.balls.length;b++){
				var ball1 = this.balls[b];
				//console.log("ball1: "+ ball1);
				for(c=0;c<this.balls.length;c++){
					// makes sure not to count same ball twice
					if(c != b){
						var ball2 = this.balls[c];
						//console.log("ball2: "+ ball2);
						
						//??This test makes sure that we only add each pair once
						if(c < b){
							var bbp = new BallPair(ball1,ball2);
							//console.log("bbp is: "+ bbp);
							//var bwp = new BallWallPair(ball,wall);
							bbp_list.push(bbp);
						}
						
					}
				}
			}
		}
		//console.log("bbp_list element: "+ bbp_list[0]);
		//console.log("bbp_list is length: "+bbp_list.length);
		return bbp_list;
	}
}




