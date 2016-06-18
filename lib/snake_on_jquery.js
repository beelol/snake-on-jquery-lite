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
	
	function SnakeView(grid) {
	  this.$grid = grid;
	  this.game = new Game();
	
	  this.makeGrid();
	  this.render();
	}
	
	SnakeView.prototype.start = function () {
	  setInterval(this.tick.bind(this), 500);
	};
	
	SnakeView.prototype.tick = function () {
	  this.game.run();
	  this.render();
	};
	
	SnakeView.prototype.render = function () {
	  this.$grid.find("li").removeClass();
	  // render apple;
	  this.game.snake.segments.forEach( segment => {
	    const x = segment.x;
	    const y = segment.y;
	    const $li = this.$grid.find(`#pos${x}-${y}`);
	    console.log($li);
	    $li.addClass("snake");
	  });
	};
	
	SnakeView.prototype.makeGrid = function () {
	  for (let i = 0; i < 31; i++){
	    for (let j = 0; j < 31; j++){
	      let li = document.createElement("li");
	      li.id = `pos${j}-${i}`;
	      let $li = $l(li);
	      this.$grid.append($li);
	    }
	  }
	};
	
	$l( () => {
	  let sn = new SnakeView($l(".grid"));
	});
	
	module.exports = SnakeView;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(2);
	const Point = __webpack_require__(3);
	
	function Game() {
	  this.snake = new Snake(new Point(16, 16));
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


/***/ }
/******/ ]);
//# sourceMappingURL=snake_on_jquery.js.map