const GamePiece = require('./GamePiece');

class Brick extends GamePiece{
  constructor(x, y, width, height, src) {
    super(x, y, width, height, src);
  }

  brickCollision(ball) {
    var ballRight = ball.x + ball.radius;
    var ballLeft = ball.x - ball.radius;
    var ballTop = ball.y - ball.radius;
    var ballBottom = ball.y + ball.radius;

    var brickRight = this.x + this.width;
    var brickLeft = this.x;
    var brickTop = this.y;
    var brickBottom = this.y + this.height;

    if (ball.x > brickLeft
        && ball.x < brickRight
        && ballBottom > brickTop
        && ballTop < brickBottom) {
      ball.dy = -ball.dy;
      return true;
    } else if (ball.y > brickTop
        && ball.y < brickBottom
        && ballRight > brickLeft
        && ballLeft < brickRight) {
      ball.dx = -ball.dx;
      return true;
    }
    return false;
  }
}

module.exports = Brick;