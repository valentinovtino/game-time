const GamePiece = require('./GamePiece');

class Ball extends GamePiece{
  constructor(x, y, width, height, radius, startAngle, endAngle, dx, dy) {
    super(x, y, width, height);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.dx = dx;
    this.dy = dy;
  }

  drawBall(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.stroke()
    return this;
  }

  move(canvas) {
    if (this.x + this.width > canvas.width || this.x < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;

    if (this.y < 0) {
      this.dy = -this.dy;
    }

    this.y += this.dy;
    return this;
  }
}

module.exports = Ball;