

function Octree(corner1,corner2,depth){
	this.corner1=corner1;
	this.corner2=corner2;
	this.depth=depth;
	this.numBalls = 0;
	this.hasChildren = false;
	
	//this.children = [[[[],[]],[[],[]]],[[[],[]],[[],[]]]];
	this.children = [];
	this.balls = [];
	
	this.test = function(){
		console.log("sucess");
	} 
}


