const GamePiece = require('./GamePiece');

class Paddle extends GamePiece {
  constructor(x, y, width, height, src, canvas) {
    super(x, y, width, height, src)
    this.keyboarder = this.keyboarder.bind(this);
    this.mousePosition = this.mousePosition.bind(this);
    this.canvas = canvas;
  }

  stopPaddle() {
    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x + this.width >= 800) {
      this.x = 800 - this.width;
    } 
  }

  keyboarder(e) {
      if (e.keyCode === 37) {
      this.x -= 35;
    } else if (e.keyCode === 39) {
      this.x += 35;
    } 
  }

  mousePosition(e) {
  var rect = this.canvas.getBoundingClientRect();
  var posX = e.clientX - rect.left;

  this.x = posX - 35;
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