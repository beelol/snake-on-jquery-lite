const Game = require("./game.js");

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
  const xa = this.game.apple.x;
  const ya = this.game.apple.y;
  this.$grid.find(`#pos${xa}-${ya}`).addClass("apple");
  this.game.snake.segments.forEach( segment => {
    const x = segment.x;
    const y = segment.y;
    this.$grid.find(`#pos${x}-${y}`).addClass("snake");
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
