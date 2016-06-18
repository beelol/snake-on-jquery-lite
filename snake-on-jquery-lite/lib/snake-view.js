const Game = require("./game.js");
const $l = require("./../../jquery-lite/lib/$l.js");

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
