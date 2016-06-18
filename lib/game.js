const Snake = require("./snake");
const Point = require("./point");

function Game() {
  this.snake = new Snake(new Point(15, 15));
  this.apple = new Point(5, 5);
}

Game.prototype.run = function () {
  this.snake.move();
};

module.exports = Game;
