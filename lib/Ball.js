const GamePiece = require('./GamePiece');

class Ball extends GamePiece {
  constructor(x, y, width, height, radius, startAngle, endAngle, dx, dy) {
    super(x, y, width, height);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.dx = dx;
    this.dy = dy;
    this.move = this.move.bind(this);
  }

  drawBall(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.stroke()
    context.fill();
    context.fillStyle = 'rgb(104,211,255)'
    return this;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    return this;
  }

  wallCollision() {
    if (this.x + this.radius > 800 || 
        this.x < 0) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
  }
}

module.exports = Ball;