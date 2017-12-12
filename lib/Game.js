const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball = require('./Ball');
const $ = require('jQuery');


class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.paddle = new Paddle(365, 475, 70, 20, "../Images/paddleO.jpg", this.canvas);
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
    $('.dashboard').show();
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

  showLevel() {
    var levelDisplay = document.getElementById('level-num');

    levelDisplay.innerText = this.level;
  }

  createBricks(levelArray) {
    for (var i = 0; i < 45; i++) {
      var x = ((i % 9) * 88) * 1.02;
      var y = ((i % 5) * 88) * 0.35;

      this.brick = new Brick (x, y, 88, 28, "../Images/brick-galaxy.jpg");
        
      levelArray.push(this.brick);
    }
  }

  createBalls() {
    for (var i = 0; i < 3; i++) {
      this.ball = new Ball(365, 225, 0, 0, 6, 0, 2 * Math.PI, 0, 3);
    
      this.ballsArray.push(this.ball);
    }
  }

  drawBricks(levelArray) {
    for (var i = 0; i < levelArray.length; i++) {
      let brick = levelArray[i];

      brick.draw(this.context);
    }
  }

  removeBricks(levelArray) {
    let brickToRemove = levelArray.find((brick) => {
      return brick.brickCollision(this.ballsArray[0]);
    });
 

    if (brickToRemove) {
      this.brickIndex = levelArray.indexOf(brickToRemove);
      levelArray.splice(this.brickIndex, 1);
      this.incrementScore();
    } 
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

  wins(levelArray) {
    if (levelArray.length === 0) {
      this.level += 1;
      this.levelBeaten = true;
    }
  }

  levelUp() {
    if (this.level === 1) {
      this.drawBricks(this.levelOne);
      this.removeBricks(this.levelOne);
      this.wins(this.levelOne);
    } else if (this.level === 2) {
      this.drawBricks(this.levelTwo);
      this.removeBricks(this.levelTwo);
    }
  }

  transitions() {
    if (this.gameOver === true) {
      this.context.font = '48px Bungee';
      this.context.fillText('Game Over', 265, 300);
      return true;
    }
    if (this.levelBeaten === true) {
      this.newLevelScreen();
      return true;
    }
    if (this.level === 2 && this.levelTwo.length === 0) {
      this.gameWon = true;
      this.gameWonScreen();
      return true;
    }
  }

  newLevelScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = '48px Bungee';
    this.context.fillText('NEXT LEVEL', 260, 220);
    this.context.fillText('click to play', 225, 270);
  }

  gameWonScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = '48px Bungee';
    this.context.fillText('YOU WON!', 285, 270);
  }

  createRow() {
    this.levelTwo.forEach((brick) => {
      if (this.level == 2) {
        brick.y += 30;
      }
    })

    for ( var i = 0; i < 9; i++ ) {
      var x = ((i % 9) * 88) * 1.02;
      var y = 0;

      this.brick = new Brick (x, y, 88, 28, "../Images/brick-galaxy.jpg");
      this.levelTwo.push(this.brick);
    }
  }

  displayNewRows() {
    for (var i = 1; i < 4; i++) {
      setTimeout(this.createRow, (i * 10000));
    }
  }
     
  animationFrame() {
    var transition = this.transitions();

    if (transition === true) {
      return;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.levelUp(this.context);

    this.ballsArray[0].move(this.bricksArray[0]);
    this.ballsArray[0].wallCollision();
    this.ballsArray[0].drawBall(this.context);
    
    this.paddle.stopPaddle();
    this.paddle.draw(this.context);

    this.paddle.paddleCollision(this.ballsArray[0]);

    this.newBall();
    this.showRemainingBalls();
    this.showLevel();

    requestAnimationFrame(this.animationFrame);
  }

}

module.exports = Game;