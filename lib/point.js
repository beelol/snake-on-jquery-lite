function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.add = function (otherPoint) {
  return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
};

module.exports = Point;
