const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
var ball1 = new Ball(((800 - 70)/2), 225, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
var ball2 = new Ball(((800 - 70)/2), 225, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
var ball3 = new Ball(((800 - 70)/2), 225, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
var ballsArray = [ball1, ball2, ball3];
var bricksArray = [];

window.addEventListener('keydown', keyboarder);
canvas.addEventListener('mousemove', mousePosition);
window.addEventListener('click', playLevelOne);
// document.addEventListener('click', releaseBall);

startScreen();

function keyboarder(e) {
  if (e.keyCode === 37) {
    paddle.x -= 10;
  } else if (e.keyCode === 39) {
    paddle.x += 10;
  } 
}

// function releaseBall() {
//   console.log('move ball');
// }

function mousePosition(e) {
  var rect = canvas.getBoundingClientRect();
  var posX = e.clientX - rect.left;

  paddle.x = posX - 35;
}

function stopPaddle() {
  if (paddle.x <= 0) {
    paddle.x = 0;
  } else if(paddle.x + paddle.width >= 800) {
    paddle.x = 800 - paddle.width;
  } 
}

function newBall() {
  if((ballsArray[0].y - ballsArray[0].radius) > 500) {
    ballsArray.shift();
  }
}

function gameOver() {
  if (ballsArray.length === 0) {
    context.font = '48px serif';
    context.fillText('GAME OVER', 250, 300);
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

function levelOne() {
  context.clearRect(0,0, canvas.width, canvas.height);

  ballsArray[0].move(canvas);
  ballsArray[0].createBall(context);
  newBall();
  
  stopPaddle();
  paddle.draw(context);

  // loopBricks(ballsArray[0]);
  drawBricks(context);

  paddleCollision(ballsArray[0], paddle);
}

function playLevelOne() {
  function gameLoop() {
    levelOne();

    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
}

function startScreen() {
  context.font = '48px serif';
  context.fillText('BREAKOUT', 250, 200);
  context.fillText('click to start', 260, 300);
}



// function loopBricks(ball) {
//   for(var i = 0; i < bricksArray.length; i++){
//     brickCollision(ball, bricksArray[i]);
//   }
// }

// function brickCollision(ball, brick) {
//   if(ball.y < brick.y + brick.height) {
//     console.log(brick);
//   }
// }
