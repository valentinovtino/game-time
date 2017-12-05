const GamePiece = require('./GamePiece');

class Brick extends GamePiece{
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  brickCollision(ball) {
    var ballRight = ball.x + ball.radius;
    var ballLeft = ball.x - ball.radius;
    var ballTop = ball.y - ball.radius;
    var ballBottom = ball.y - ball.radius;

    var brickRight = this.x + this.width;
    var brickLeft = this.x;
    var brickTop = this.y;
    var brickBottom = this.y + this.height;

    if (ballTop < brickBottom && 
        ballBottom > brickTop && 
        ballRight > brickLeft && 
        ballLeft < brickRight) {
      ball.dy = -ball.dy; 
      return true;
    } 
    return false;
  }
}

module.exports = Brick;