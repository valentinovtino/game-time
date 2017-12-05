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
    if (this.x + this.radius > canvas.width || 
        this.x < 0) {
      this.dx = -this.dx;
    }
    
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
      this.hitTop = true;
    }

    this.x += this.dx;
    this.y += this.dy;
    return this;
  }
}

module.exports = Ball;