/**
 * @param {vec3} center
 * @param {vec3} radius 
 * @param {Number} stopDepth 
 */
function OctTree(center, radius, maxDepth, splitCondition, splitEntire) {

  this.__root = new Node(center, radius, null, 0, maxDepth, splitCondition, splitEntire);
}

OctTree.prototype = {
  /**
   * @var {Node}
   */
  __root: null,

  /**
   * @param Obj
   */
  insert: function (obj) {
    this.__root.insert(obj);
  },
  
  /**
   * @param {Obj}
   */
  remove: function (obj) {
    obj._$_$_node.remove(obj);
    obj._$_$_node = null;
  },

  intersectCount: function (obj) {
    var node = obj._$_$_node;
    var result = node.countObjectsDown();
    //result += node.countObjectsUp();

    return result;
  },

  /**
   * query = { center: vec3.create([x, y, z]), radius: vec3.create([w, h, d])};
   */
  search: function (query) {
    
  }
};
