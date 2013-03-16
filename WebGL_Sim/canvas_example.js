DragAndDrop.enable();

window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
  };
})();

window.cancelRequestAnimationFrame = (function() {
    return window.cancelRequestAnimationFrame       ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame         ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
})();

var NODE_COUNTER = 0;

var QT = (function (w, d, undefined) {
  __form = d.getElementById("settings");
  var __requestAnimationId = null;
  var __grid = true;
  __objs = [];

  var __minX = -10;
  var __maxX = 10;
  var __minY = -10;
  var __maxY = 10;
  var __minZ = -10;
  var __maxZ = 10;

  var __rotateX = Math.PI * __form.rotateX.value / 180;
  var __rotateY = Math.PI * __form.rotateY.value / 180;
  var __rotateZ = Math.PI * __form.rotateZ.value / 180;

  var __half = function (a, b) {
    return (a + b) / 2; 
  };


  var __createTree = function () {
    NODE_COUNTER = 0;

    return new OctTree(
      vec3.create([0, 0, 0]),
      vec3.create([10, 10, 10]),
      __form.level.value,
      __form.split.value,
      __form.subtree.checked
    );
  };

  __tree = __createTree(); 

  var __registerListeners = function () {
    __form.onsubmit = function () {
      return false;
    };

    d.getElementById('add').addEventListener('click', __onClickDocument, false);
    d.getElementById("clear").addEventListener('click', __onClickClear, false);

    __form.grid.parentNode.addEventListener('change', __onClickApply, false);
    __form.grid.parentNode.addEventListener('click', __onClickApply, false);

    d.getElementById("rotate").addEventListener('change', __onChangeRotate, false);

    d.getElementById("pause").addEventListener('click', __onClickPause, false);
    d.getElementById("play").addEventListener('click', __onClickPlay, false);
  };

  var __onClickDocument = function (event) {
    for (var i = __form.quantity.value; i--;) {
      __createObject(
        __form.width.value,
        __form.height.value,
        __form.depth.value,
        __form.speed.value,
        event.clientX,
        event.clientY 
      );
    }

    __time = Date.now();
    __run(__time);
  }; 

  var __onClickClear = function () {
    __objs = [];
    __tree = __createTree(); 
  }; 

  var __onClickApply = function () {
    __grid = __form.grid.checked;
    __tree = __createTree(); 

    for (var i = 0, len = __objs.length; i < len; ++i) {
      __tree.insert(__objs[i]);
    }
  }; 

  var __onChangeRotate = function () {
    __rotateX = Math.PI * __form.rotateX.value/180;
    __rotateY = Math.PI * __form.rotateY.value/180;
    __rotateZ = Math.PI * __form.rotateZ.value/180;
  }; 

  var __onClickPause = function () {
    w.cancelRequestAnimationFrame(__requestAnimationId);
  }; 

  var __onClickPlay = function () {
    __time = Date.now();
    __loop(Date.now());
  }; 

  var __time = Date.now();
  var __last = Date.now();
  var __couterobj = d.getElementById("counterobj");
  var __couternode = d.getElementById("counternode");
  var __coutercollision = d.getElementById("countercollision");

  var __run = function (time) {
    //WebGL.clear();
    var counter = 0;
    var objects = __objs.length;
    for (var i = 0, len = __objs.length, obj; i < len; ++i) {
      obj = __objs[i];

      obj.integrate(__time - time);

      __tree.remove(obj);
      __tree.insert(obj);
      //console.log(__tree.intersectCount(obj));
      counter += __tree.intersectCount(obj);
    }

    __logic();
    __grid && __drawTree();
    __drawObjects();

    if (time - __last > 1000) {
      __couterobj.innerHTML = objects;
      __couternode.innerHTML = NODE_COUNTER;
      __coutercollision.innerHTML = counter + "/" + ((objects - 1) * objects );
      __last = time; 
    }

    __time = time;
  };

  var __loop = function() {
    __run(Date.now());

    __requestAnimationId = w.requestAnimationFrame(__loop);
  };

  var __rand = function (min, max) {
    return (max - min) * Math.random() + min; 
  };

  var __createObject = function (width, height, depth, speed, x, y) {
    x = x || d.width/2;
    y = y || d.height/2;

    var obj = {
      __center: vec3.create([__rand(__minX, __maxX), __rand(__minY, __maxY), __rand(__minZ, __maxZ)]),
      //__radius: vec3.create([width * 0.1, height * 0.1, depth * 0.1]),
      __radius: vec3.create([+width * 0.1, +height * 0.1, +depth * 0.1]),
      __velocity: vec3.create([speed*__rand(-5, 5), speed*__rand(-5, 5), speed*__rand(-5, -5)]),

      integrate: __integrate
    };

    __objs.push(obj);
    __tree.insert(obj);
  };

  var __drawObjects = function() {
    for (var i = 0, len = __objs.length, obj; i < len; ++i) {
      WebGL.draw(__objs[i], __rotateX, __rotateY, __rotateZ);
    }
  };

  var __drawTree = function() {
    __drawNode(__tree.__root, 1);
  };

  var __drawNode = function (node, depth) {
    if (!node) {
      return false;
    }
    
    WebGL.draw(node, __rotateX, __rotateY, __rotateZ);

    //__ctx.fillStyle =  "#" +(0xffffff - 0x111111*depth).toString(16);

    for (var i = 0, len = node.__childs.length; i < len; ++i) {
      if (node.__childs[i]) {
        __drawNode(node.__childs[i], depth + 1);
      }
    }
  };

  var __integrate = function (delta) {
    vec3.add(
      this.__center,
      vec3.scale(this.__velocity, delta/1000, vec3.create())
    );
  };


  var __logic = function () {
    var maxX = __maxX;
    var minX = __minX;
    var maxY = __maxY;
    var minY = __minY;
    var maxZ = __maxZ;
    var minZ = __minZ;
    var x, y, z, radiusX, radiusY, radiusZ;

    
    for (var i = 0, len = __objs.length, obj; i < len; ++i) {
      obj = __objs[i];

      x = obj.__center[0];
      y = obj.__center[1];
      z = obj.__center[2];
      radiusX = obj.__radius[0];
      radiusY = obj.__radius[1];
      radiusZ = obj.__radius[2];

      if (x - radiusX <= minX) {
        obj.__center[0] = minX + radiusX;
        obj.__velocity[0] *= -1.0;
      }
      else if (x + radiusX >= maxX) {
        obj.__center[0] = maxX - radiusX;
        obj.__velocity[0] *= -1.0;
      }
      
      if (y - radiusY <= minY) {
        obj.__center[1] = minY + radiusY;
        obj.__velocity[1] *= -1.0;
      }
      else if (y + radiusY >= maxY) {
        obj.__center[1] = maxY - radiusY;
        obj.__velocity[1] *= -1.0;
      }

      if (z - radiusZ <= minZ) {
        obj.__center[2] = minZ + radiusZ;
        obj.__velocity[2] *= -1.0;
      }
      else if (z + radiusZ >= maxZ) {
        obj.__center[2] = maxZ - radiusZ;
        obj.__velocity[2] *= -1.0;
      }
    }
  };

  return {
    start: function () {
      __registerListeners();
      __loop(Date.now());
      __onClickDocument({clientX: d.width/2, clientY: d.height/2});
    }
  };  
}(window, document));

window.onload = function () {
  var pw = document.getElementById('loading');
  pw.parentNode.removeChild(pw);

  QT.start();
};
