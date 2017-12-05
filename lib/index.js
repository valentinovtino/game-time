const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
let brick;
var ballsArray = [];
var bricksArray = [];

var score = 0;

window.addEventListener('keydown', keyboarder);
canvas.addEventListener('mousemove', mousePosition);

createBricks();
createBalls();
// displayScore();

function keyboarder(e) {
  if (e.keyCode === 37) {
    paddle.x -= 35;
  } else if (e.keyCode === 39) {
    paddle.x += 35;
  } 
}

function mousePosition(e) {
  var rect = canvas.getBoundingClientRect();
  var posX = e.clientX - rect.left;

  paddle.x = posX - 35;
}

function incrementScore() {
  score += 15;
  var scoreDisplay = document.getElementById('score-num');
  scoreDisplay.innerText = score;
}

function decrementScore(ball) {
  if((ball.y - ball.radius) < 0) {
    score -=10;
    var scoreDisplay = document.getElementById('score-num');
    scoreDisplay.innerText = score;
  }
}

function createBalls() {
  for(var i = 0; i < 3; i++) {
    ball = new Ball(((800 - 70)/2), 225, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
  
    ballsArray.push(ball);
  }
}

function newBall() {
  if((ballsArray[0].y - ballsArray[0].radius) > 550) {
    ballsArray.shift();
  }
}

function gameOver() {
  if (ballsArray.length === 0) {
    var gameIsOver = true;
  } else {
    gameIsOver = false;
  }
}

function createBricks() {
  for (var i = 0; i < 45; i++) {
    var x = ((i % 9) * 88) * 1.02;
    var y = ((i % 5) * 88) * 0.35;
    brick = new Brick (x, y, 88, 28);
      
    bricksArray.push(brick);
  }
}

function drawBricks(context) {
  for(var i = 0; i < bricksArray.length; i++) {
    var brick = bricksArray[i];
    brick.draw(context);
  }
}

function removeBricks() {
  let brickToRemove = bricksArray.find(function(brick) {
    return brick.brickCollision(ballsArray[0]);
  });

  if(brickToRemove) {
    var brickIndex = bricksArray.indexOf(brickToRemove);
    bricksArray.splice(brickIndex, 1);
    incrementScore();
  } 
}

function playGame(gameLoop) {
  requestAnimationFrame(gameLoop);
}
  
function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);

  ballsArray[0].move(canvas);
  ballsArray[0].drawBall(context);
  newBall();
  
  paddle.stopPaddle();
  paddle.draw(context);

  drawBricks(context);

  paddle.paddleCollision(ballsArray[0]);
  removeBricks();

  decrementScore(ballsArray[0]);

  requestAnimationFrame(gameLoop);
}

playGame(gameLoop);