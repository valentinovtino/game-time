const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');
const GamePiece = require('./GamePiece');

const NewGameScreen = document.getElementById('start-game');
// const alienBrick = document.getElementById('brick');
var alienBrick = new Image();
alienBrick.src = "Images/brick-galaxy.jpg"


class Game {
  constructor(canvas, context, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
    this.ballsArray = [];
    this.levelOne = [];
    this.levelTwo = [];
    this.bricksArray = [this.levelOne, this.levelTwo];
    this.score = 0;
    this.animationFrame = this.animationFrame.bind(this);
    this.gameOver = false;
    this.level = 1;
    this.levelBeaten = false;
    this.createRow = this.createRow.bind(this); 
  }

  startGame() {
    this.animationFrame();
    requestAnimationFrame(this.animationFrame);
  }

  displayNewRows() {
    for(var i = 1; i < 4; i++) {
      setTimeout(this.createRow, (i * 10000));
    }
  }

  createRow() {
    this.levelTwo.forEach((brick, i) => {
      if (this.level == 2) {
        brick.y += 30;
      }
    })

    for ( var i = 0; i < 9; i++ ) {
      var x = ((i % 9) * 88) * 1.02;
      var y = 0;
      this.brick = new Brick (x, y, 88, 28);
      this.levelTwo.push(this.brick);
    }
  }

  createBricks(levelArray) {
    for (var i = 0; i < 45; i++) {
      var x = ((i % 9) * 88) * 1.02;
      var y = ((i % 5) * 88) * 0.35;
      this.brick = new Brick (x, y, 88, 28);
        
      levelArray.push(this.brick);
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

  drawBricks(levelArray) {
    for(var i = 0; i < levelArray.length; i++) {
      let brick = levelArray[i];
      brick.draw(this.context);
    }
  }

  removeBricks(levelArray) {
    let brickToRemove = levelArray.find((brick) => {
      return brick.brickCollision(this.ballsArray[0]);
    });
 

    if(brickToRemove) {
      this.brickIndex = levelArray.indexOf(brickToRemove);
      levelArray.splice(this.brickIndex, 1);
      this.incrementScore();
    } 
  }

  startScreen() {
    this.context.font = '48px sans-serif';
    this.context.fillText('BREAKOUT', 265, 200);
  }

  wins(levelArray) {
    if(levelArray.length === 0) {
      this.level += 1;
      this.levelBeaten = true;
    }
  }

  transitionScreen() {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.context.font = '48px sans-serif';
    this.context.fillText('NEXT LEVEL', 265, 200);
    this.context.fillText('click to play', 255, 250);
  }

  levelUp(levelArray, myReq) {
    if(this.level === 1) {
      this.drawBricks(this.levelOne);
      this.removeBricks(this.levelOne);
      this.wins(this.levelOne);
    } else if (this.level === 2) {
      this.drawBricks(this.levelTwo);
      this.removeBricks(this.levelTwo);
    }
  }
     
  animationFrame() {
    if(this.gameOver === true) {
      this.context.font = '48px sans-serif';
      this.context.fillText('Game Over', 265, 300); 
      return;
    }

    if(this.levelBeaten === true) {
      this.transitionScreen();
      return;
    }

    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

    this.levelUp(this.context);

    this.ballsArray[0].move(this.bricksArray[0]);
    this.ballsArray[0].wallCollision();
    this.ballsArray[0].drawBall(this.context);
    
    this.paddle.stopPaddle();
    this.paddle.draw(this.context);

    this.paddle.paddleCollision(this.ballsArray[0]);

    this.newBall();
    this.showRemainingBalls();

    requestAnimationFrame(this.animationFrame);
  }

}

module.exports = Game;