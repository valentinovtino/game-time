const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
var ball1 = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
var ball2 = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
var ball3 = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
var brick = new Brick (((45 % 9) * 88) * 1.02, ((45 % 5) * 88) * 0.35, 88, 28);
var ballsArray = [ball1, ball2, ball3];
var bricksArray = [];

window.addEventListener('keydown', keyboarder);
canvas.addEventListener('mousemove', mousePosition);

function keyboarder(e) {
  if (e.keyCode === 37) {
    paddle.x -= 10;
  } else if (e.keyCode === 39) {
    paddle.x += 10;
  } 
}

function mousePosition(e) {
  var rect = canvas.getBoundingClientRect();
  var posX = e.clientX - rect.left;

  paddle.x = posX - 35;
}

function newBall() {
  if (ballsArray.length === 0) {
    console.log ('Game Over');
  } else if((ballsArray[0].y - ballsArray[0].radius) > 500) {
    ballsArray.shift();
  }
}

function gameOver() {
  if (ballsArray.length === 0) {
    alert ('Game Over');
    return;
  }
}

function createBricks() {
  for (var i = 0; i < 45; i++) {
    var x = ((i % 9) * 88) * 1.02;
    var y = ((i % 5) * 88) * 0.35;
    var brick = new Brick (x, y, 88, 28);
      
    bricksArray.push(brick);
  }
}

createBricks();

function drawBricks(context) {
  for(var i = 0; i < bricksArray.length; i++) {
    var brick = bricksArray[i];
    brick.draw(context);
  }
}

function paddleCollision(ball, paddle) {
  gameOver();

  var ballRight = ball.x + ball.radius;
  var ballLeft = ball.x - ball.radius;
  var ballTop = ball.y - ball.radius;
  var ballBottom = ball.y - ball.radius;

  var paddleRight = paddle.x + paddle.width;
  var paddleLeft = paddle.x;
  var paddleTop = paddle.y;
  var paddleBottom = paddle.y + paddle.height;

  
  if (ballTop === paddleTop) { 
    if (ballRight > paddleLeft && ballLeft < paddleRight) {
      ball.dy = -ball.dy;
      ball.dx += 2;
    }
  } 
}

function loopBricks(ball) {
  for(var i = 0; i < bricksArray.length; i++){
    brickCollision(ball, bricksArray[i]);
  }
}


function brickCollision(ball, brick) {

  var ballRight = ball.x + ball.radius;
  var ballLeft = ball.x - ball.radius;
  var ballTop = ball.y - ball.radius;
  var ballBottom = ball.y - ball.radius;

  var brickRight = brick.x + brick.width;
  var brickLeft = brick.x;
  var brickTop = brick.y;
  var brickBottom = brick.y + brick.height;

  if (ballTop > brickBottom &&
    ballBottom > brickTop) {
      ball.dy = -ball.dy;
      return true;
    } else ( ballRight > brickLeft && 
    ballLeft < brickRight)
    return true;

}

 


function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);

  ballsArray[0].move(canvas);
  ballsArray[0].createBall(context);
  newBall();
  
  paddle.draw(context);

  loopBricks(ballsArray[0]);
  drawBricks(context);

  paddleCollision(ballsArray[0], paddle);
  brickCollision(ballsArray[0], brick);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);