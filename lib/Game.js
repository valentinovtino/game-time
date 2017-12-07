const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');
const GamePiece = require('./GamePiece');

class Game {
  constructor(canvas, context, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
    this.ballsArray = [];
    this.bricksArray = [];
    this.score = 0;
    this.animationFrame = this.animationFrame.bind(this)
    this.gameOver = false;
    this.winCount = 0;
    this.level = 1;
  }

  createBricks() {
    for (var i = 0; i < 45; i++) {
      var x = ((i % 9) * 88) * 1.02;
      var y = ((i % 5) * 88) * 0.35;
      this.brick = new Brick (x, y, 88, 28);
        
      this.bricksArray.push(this.brick);
    }
  }

  createBalls() {
    for(var i = 0; i < 3; i++) {
      this.ball = new Ball(((800 - 70)/2), 225, 0, 0, 6, 0, 2 * Math.PI, 0, 3);
    
      this.ballsArray.push(this.ball);
    }
  }

  incrementScore() {
    this.score += 15;
    var scoreDisplay = document.getElementById('score-num');
    scoreDisplay.innerText = this.score;
  }

  showRemainingBalls() {
    var livesDisplay = document.getElementById('lives-num');
    livesDisplay.innerText = this.ballsArray.length;
  }

  newBall() {
    if ((this.ballsArray[0].y - this.ballsArray[0].radius) > 550) {
      this.ballsArray.shift();
    } 
    if (this.ballsArray.length === 0) {
      this.gameOver = true;
      return
    }
  }

  drawBricks() {
    for(var i = 0; i < this.bricksArray.length; i++) {
      this.brick = this.bricksArray[i];
      this.brick.draw(this.context);
    }
  }

  removeBricks() {
    let brickToRemove = this.bricksArray.find((brick) => {
      return brick.brickCollision(this.ballsArray[0]);
    });
 

    if(brickToRemove) {
      this.brickIndex = this.bricksArray.indexOf(brickToRemove);
      this.bricksArray.splice(this.brickIndex, 1);
      this.incrementScore();
    } 
  }

  startScreen() {
    this.context.font = '48px sans-serif';
    this.context.fillText('BREAKOUT', 265, 200);
  }

  wins() {
    if(this.bricksArray.length === 0) {
      this.level += 1;
      console.log(this.level);
    }
  }

  animationFrame() {
    if(this.gameOver === true) {
      this.context.font = '48px sans-serif';
      this.context.fillText('Game Over', 265, 300); 
      return;
    }

    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

    this.ballsArray[0].move(this.canvas);
    this.ballsArray[0].drawBall(this.context);
    
    this.paddle.stopPaddle();
    this.paddle.draw(this.context);

    this.drawBricks(this.context);

    this.paddle.paddleCollision(this.ballsArray[0], this.score);
    this.removeBricks();

    this.newBall();
    this.showRemainingBalls();

    this.wins();
    requestAnimationFrame(this.animationFrame);
  }

}


module.exports = Game;