const GamePiece = require('./GamePiece');

class Paddle extends GamePiece {
  constructor(x, y, width, height, src) {
    super(x, y, width, height, src)
  }

  stopPaddle() {
  if (this.x <= 0) {
    this.x = 0;
  } else if(this.x + this.width >= 800) {
    this.x = 800 - this.width;
  } 
}

  paddleCollision(ball) {
  var ballRight = ball.x + ball.radius;
  var ballLeft = ball.x - ball.radius;
  var ballTop = ball.y - ball.radius;
  var ballBottom = ball.y + ball.radius;

  var paddleRight = this.x + this.width;
  var paddleLeft = this.x;
  var paddleTop = this.y;
  var paddleBottom = this.y + this.height;

    // for(var i = 0; i < 5; i++) {
    //   var dxArray = [-2, -1, 0, 1, 2];
    //   if (ballBottom > paddleTop && 
    //       ballTop < paddleBottom &&
    //       ballRight > (this.x + i *(this.width / 5)) && 
    //       ballLeft < (this.x + (i + 1) * (this.width / 5))) {
    //     ball.dx = dxArray[i];
    //     ball.dy = -ball.dy;
    //   }
    // }

    if (ballBottom >= paddleTop && 
        ballTop < paddleBottom &&
        ballRight > paddleLeft && 
        ballLeft < (this.x + (this.width / 5))) {
      ball.dx = -2;
      ball.dy = -ball.dy;
    } else if (ballBottom >= paddleTop && 
               ballTop < paddleBottom &&
               ballRight > (this.x + (this.width / 5)) && 
               ballLeft < (this.x + (2 * (this.width / 5)))) {
      ball.dx = -1;
      ball.dy = -ball.dy; 
    } else if (ballBottom >= paddleTop && 
               ballTop < paddleBottom &&
               ballRight > (this.x + (2 * (this.width / 5))) && 
               ballLeft < (this.x + (3 * (this.width / 5)))) {
      ball.dx = 0;
      ball.dy = -ball.dy;
    } else if (ballBottom >= paddleTop && 
               ballTop < paddleBottom &&
               ballRight > (this.x + (3 * (this.width / 5))) && 
               ballLeft < (this.x + (4 * (this.width / 5)))) {
      ball.dx = 1;
      ball.dy = -ball.dy;
    } else if (ballBottom >= paddleTop && 
               ballTop < paddleBottom &&
               ballRight > (this.x + (4 * (this.width / 5))) && 
               ballLeft < paddleRight) {
      ball.dx = 2;
      ball.dy = -ball.dy;
    }
  }
}


module.exports = Paddle;