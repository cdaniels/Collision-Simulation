function Node(center, radius, parentNode, currentDepth, maxDepth, splitCondition, splitEntire) {
  this.__center = center;
  this.__radius = radius;

  this.__childs = [];
  this.__objects = [];
  this.__parent = parentNode;

  this.__currentDepth = currentDepth;
  this.__maxDepth = maxDepth;
  this.__splitCondition = splitCondition;
  this.__splitEntire = splitEntire;

  NODE_COUNTER++; 
}

Node.prototype = {
  /**
   * @var {vec3}
   */
  __center: null, 

  /**
   * @var {vec3}
   */
  __radius: null,

  /**
   * @var {Array}
   */
  __objects: null,

  /**
   * @var {Array}
   */
  __childs: null,

  /**
   * @var {Node}
   */
  __parent: null,


  __split: function () {
    var center, offset, step;

    step = vec3.scale(this.__radius, 0.5, vec3.create()); 
    offset = vec3.create();

    for (var i = 0; i < 8; ++i) {
      offset[0] = i & 1 ? step[0]: -step[0]; //x 
      offset[1] = i & 2 ? step[1]: -step[1]; //y
      offset[2] = i & 4 ? step[2]: -step[2]; //z

      this.__childs[i] = new Node(
        vec3.add(this.__center, offset, vec3.create()),
        step,
        this,
        this.__currentDepth + 1,
        this.__maxDepth,
        this.__splitCondition,
        this.__splitEntire
      );
    }
  },

  __splitMissing: function (i) {
    var center, offset, step;

    step = vec3.scale(this.__radius, 0.5, vec3.create()); 
    offset = vec3.create();

    offset[0] = i & 1 ? step[0]: -step[0]; //x 
    offset[1] = i & 2 ? step[1]: -step[1]; //y
    offset[2] = i & 4 ? step[2]: -step[2]; //z 

    this.__childs[i] = new Node(
      vec3.add(this.__center, offset, vec3.create()),
      step,
      this,
      this.__currentDepth + 1,
      this.__maxDepth,
      this.__splitCondition,
      this.__splitEntire
    );
  },

  remove: function (object) {
    this.__objects.splice(this.__objects.indexOf(object), 1);
    this.cleanup();
  },

  insert: function (object) {
    var index = 0;
    var straddle = 0;

    // checks if objects is fully contained in node
    for (var i = 0, delta; i < 3; ++i) {
      delta = object.__center[i] - this.__center[i]; 

      if (Math.abs(delta) <= object.__radius[i]) {
        straddle = 1;
        break;
      }

      // clever way to compute in which part of space it is;
      if (delta > 0) {
        index |= 1 << i;
      }
    }

    if (!straddle && this.__objects.length >= +this.__splitCondition && this.__currentDepth < this.__maxDepth) {
      // Split 
      if (typeof this.__childs[index] === "undefined") {
        if (this.__splitEntire) {
         // full split
         this.__split();
        }
        else {
         // single split
         this.__splitMissing(index);
        }
        // Node splited needs to reorganize existing ones
        var temp = this.__objects;
        var notReorganized = []; 
        for (var i = 0, len = temp.length; i < len; ++i) {
          if (this.insert(temp[i])) {
            notReorganized.push(temp[i]); 
          } 
        }
        this.__objects = notReorganized;
      } 

      // Fully contained in existing child node; insert in that subtree
      this.__childs[index].insert(object);
      return false;
    } else {
      // Straddling, or no child node to descend into
      this.__objects.push(object);

      // NOT elegant but helpfull for removing;
      // prevents entire tree lookup
      object._$_$_node = this; 
      return true;
    }
  },

  isEmpty: function () {
    return this.__childs.length === 0 && this.__objects.length === 0; 
  },

  areChildsEmpty: function () {
    var empty = true; 

    for (var i = 0, len = this.__childs.length; i < len; ++i) {
      if (this.__childs[i]) {
        empty &= this.__childs[i].isEmpty();
      }
    } 

    return empty;
  },

  cleanup: function () {
    if (this.areChildsEmpty()) {

      // This loop is only for NODE MESUREMENT!!!
      for (var i = 0, len = this.__childs.length; i < len; ++i) {
        if (this.__childs[i]) {
          NODE_COUNTER -= 1; 
        }
      } 

      this.__childs = [];
      if (this.__parent) {
        this.__parent.cleanup();
      }
    }  
  },

  countObjectsDown: function () {
    var result = this.__objects.length; 
    var node = this.__parent;

    while (node) {
      result += node.__objects.length;
      node = node.__parent;
    }

    return result - 1;
  },

  countObjectsUp: function () {
    var result = this.__objects.length; 

    for(var i = 0, len = this.__childs.length; i < len; ++i) {
      if (this.__childs[i]) {
        result += this.__childs[i].countObjectsUp();
      }
    }

    return result;
  } 
};
