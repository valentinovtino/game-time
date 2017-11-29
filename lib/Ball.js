const GamePiece = require('./GamePiece');

class Ball extends GamePiece{
  constructor(x, y, width, height, radius, startAngle, endAngle) {
    super(x, y, width, height);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }



  createBall(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.stroke()
    return this;

  }
}




module.exports = Ball;