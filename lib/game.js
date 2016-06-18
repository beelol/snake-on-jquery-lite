const Snake = require("./snake");
const Point = require("./point");

function Game() {
  this.snake = new Snake(new Point(16, 16));
}

Game.prototype.run = function () {
  this.snake.move();
};

module.exports = Game;
