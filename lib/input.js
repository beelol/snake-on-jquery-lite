const Point = require("./point.js");

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
