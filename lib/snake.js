const Point = require("./point");
const Input = require("./input");

function Snake(...pos) {
  this.segments = pos;
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
