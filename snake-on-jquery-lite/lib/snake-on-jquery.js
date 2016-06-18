/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const $l = __webpack_require__(6);
	
	function SnakeView($el) {
	  this.$el = $el;
	  this.game = new Game();
	  this.makeGrid();
	}
	
	SnakeView.prototype.start = function () {
	  setInterval(this.tick.bind(this), 500);
	};
	
	SnakeView.prototype.tick = function () {
	  this.game.run();
	  this.render();
	};
	
	SnakeView.prototype.render = function () {
	  // redraws grid
	};
	
	SnakeView.prototype.makeGrid = function () {
	  const grid = $l(".grid");
	
	  console.log(grid);
	
	  for (let i = 0; i < 9; i++){
	    for (let j = 0; j < 9; j++){
	      let string = '<li id="' + i + '-' + j + 'class="empty"';
	
	      grid.append(string);
	    }
	  }
	};
	
	$l( () => {
	  let sn = new SnakeView();
	});
	
	module.exports = SnakeView;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(2);
	const Point = __webpack_require__(3);
	
	function Game() {
	  this.snake = new Snake(new Point(11, 11));
	}
	
	Game.prototype.run = function () {
	  this.snake.move();
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Point = __webpack_require__(3);
	const Input = __webpack_require__(4);
	
	function Snake(pos) {
	  this.segments = [pos];
	  this.direction = "N";
	}
	
	Snake.prototype.move = function () {
	  this.direction = Input.dir;
	
	  this.segments.unshift(this.segments[0].add(Snake.DIRS[this.direction]));
	  this.segments.pop();
	};
	
	Snake.DIRS = {
	  "N": new Point(0, -1),
	  "E": new Point(1, 0),
	  "S": new Point(0, 1),
	  "W": new Point(-1, 0),
	};
	
	module.exports = Snake;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Point(x, y) {
	  this.x = x;
	  this.y = y;
	}
	
	Point.prototype.add = function (otherPoint) {
	  return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
	};
	
	module.exports = Point;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Point = __webpack_require__(3);
	
	function Input() {
	  this.dir = "N";
	}
	
	Input.axes = {
	  // 32: 1,
	  37: "W", // left
	  38: "N", // up
	  39: "E", // right
	  40: "S" // down
	};
	
	Input.storeDirection = function(e) {
	  let thing = Input.axes[e.keyCode];
	  if (thing !== undefined) this.dir = thing;
	};
	
	document.addEventListener("keydown", Input.storeDirection, false);
	
	module.exports = Input;


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(7);
	
	function $l(selector) {
	  this.queueFunctions = [];
	
	  switch (selector.constructor) {
	    case String:
	      let nodeList = Array.from(document.querySelectorAll(selector));
	      let dom = new DOMNodeCollection(nodeList);
	      return dom;
	    case HTMLElement:
	      let arr = [];
	      arr.push(selector);
	      return new DOMNodeCollection(arr);
	    case Function:
	      this.queueFunctions.push(selector);
	      const onReady = () => {
	        this.queueFunctions.forEach( func => func() );
	      };
	      document.addEventListener("DOMContentLoaded", onReady.bind(this));
	      break;
	    default:
	      break;
	  }
	}
	
	$l.extend = function (first, ...objects) {
	  objects.forEach( object => {
	    Object.keys(object).forEach( key => {
	      first[key] = object[key];
	    });
	  });
	  return first;
	};
	
	$l.ajax = function(options) {
	  const defaults = {
	    success: function() { console.log("it worked dude"); },
	    error: function() { console.log("o shit"); },
	    url: "/",
	    method: "GET",
	    data: {},
	    contentType: "json"
	  };
	
	  options = $l.extend(defaults, options);
	
	  const xhr = new XMLHttpRequest();
	
	  xhr.onload = () => {
	    // math success
	    console.log(xhr.response);
	    // const response = xhr.response;
	    const response = (options.contentType.toLowerCase() === "json" ? xhr.response : JSON.stringify(xhr.response));
	    if (Math.floor(xhr.status / 100) === 2) {
	      options.success(response);
	    } else {
	      options.error(response);
	    }
	  };
	
	  xhr.open(options.method, options.url);
	  xhr.responseType = options.contentType;
	  xhr.send(options.data);
	};
	
	module.exports = $l;


/***/ },
/* 7 */
/***/ function(module, exports) {

	function DOMNodeCollection(nodeList) {
	  this.nodeList = nodeList;
	}
	
	DOMNodeCollection.prototype.html = function (string) {
	  if (string === undefined) {
	    return this.nodeList[0].innerHTML;
	  } else {
	    this.nodeList.forEach( (node) => {
	      node.innerHTML = string;
	    });
	  }
	
	  return this.nodeList;
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.nodeList.forEach( node => {
	    node.innerHTML = "";
	  });
	};
	
	DOMNodeCollection.prototype.append = function (object) {
	  if(object.constructor === DOMNodeCollection){
	    object.forEach( element => {
	      this.nodeList.forEach( node => {
	        node.innerHTML = node.innerHTML + element.outerHTML;
	      });
	    });
	  } else if (object.constructor === String){
	    this.nodeList.forEach( node => {
	      console.log(node.innerHTML);
	      node.innerHTML = node.innerHTML + object;
	      console.log(node.innerHTML);
	    });
	  } else if (object.constructor === HTMLElement){
	    this.nodeList.forEach( node => {
	      node.innerHTML = node.innerHTML + object.outerHTML;
	    });
	  }
	};
	
	DOMNodeCollection.prototype.attr = function (attr, value) {
	  if(value === undefined){
	    return this[0].getAttribute(attr);
	  } else {
	    this.nodeList.forEach( node => {
	      node.setAttribute(attr, value);
	    });
	    return this.nodeList;
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (string) {
	  this.nodeList.forEach( node => {
	    node.className += ` ${string}`;
	  });
	};
	
	DOMNodeCollection.prototype.removeClass = function (string) {
	  this.nodeList.forEach( node => {
	    node.className = node.className.replace(string, "");
	  });
	};
	
	DOMNodeCollection.prototype.children = function () {
	  let result = [];
	
	  this.nodeList.forEach((node) => {
	    Array.from(node.children).forEach((child) => {
	      result.push(child);
	    });
	  });
	
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  let result = this.nodeList.map( el => el.parentNode );
	  return new DOMNodeCollection(result);
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  switch (selector.constructor) {
	    case String:
	      const el = this.findByString(selector);
	      return new DOMNodeCollection(el);
	
	    case HTMLElement:
	      break;
	    default:
	      break;
	  }
	};
	
	DOMNodeCollection.prototype.findByString = function (string) {
	  let result = [];
	  this.nodeList.forEach( node => {
	    Array.from(node.querySelectorAll(string)).forEach( item => {
	      result.push(item);
	    });
	  });
	  return result;
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  while (this.nodeList.length > 0) {
	    this.nodeList[0].outerHTML = "";
	    this.nodeList.shift();
	  }
	};
	
	DOMNodeCollection.prototype.on = function (event, callback) {
	  this.nodeList.forEach(node => {
	    node.addEventListener(event, callback);
	  });
	};
	
	DOMNodeCollection.prototype.off = function (event, callback) {
	  this.nodeList.forEach(node => {
	    node.removeEventListener(event, callback);
	  });
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=snake-on-jquery.js.map