const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
var ball = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 5);

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

function createBricks() {
  var bricks = [];
  for (var i = 0; i < 45; i++) {
    var x = ((i % 9) * 88) * 1.02;
    var y = ((i % 5) * 88) * 0.35;
    var brick = new Brick (x, y, 88, 28);
      
    brick.draw(context);
    bricks.push(brick);
  }
  return bricks;
}

function isColliding(ball, paddle) {
  var ballRight = ball.x + (2 * ball.radius);
  var ballLeft = ball.x;
  var ballTop = ball.y;
  var ballBottom = ball.y + (2 * ball.radius);

  var paddleRight = paddle.x + paddle.width;
  var paddleLeft = paddle.x;
  var paddleTop = paddle.y;
  var paddleBottom = paddle.y + paddle.height;

  // console.log(ball != paddle || ballBottom > paddleTop || ballRight > paddleLeft || ballLeft < paddleRight || ballTop > paddleBottom);
  // console.log(ballBottom < paddleTop);

//Registering the collision as false 
// var colliding = (ball === paddle || ballBottom > paddleTop);
  // console.log('ball.y: ' + ball.y, 'ball.radius: ' + ball.radius, 'paddle.y: ' + paddle.y)
  if ( ball.y === paddle.y ) {
  console.log('Y could collide') 
    if ( ball.x + ball.radius > paddleLeft && ball.x + ball.radius < paddleRight ) {
      console.log('paddle hit')
      ball.dy = -ball.dy
      ball.dx += 2
    }
  }

  // notColliding = ( ball.y < paddle.y )
  // console.log('Not Colliding')
  // ballCollideWithPaddle(colliding) 
}





function ballCollideWithPaddle(colliding) {
  if(colliding === true) {
    ball.dy--;
    console.log('Colliding!!');
  } 
}



function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);
  ball.move(canvas);
  ball.createBall(context);
  paddle.draw(context);
  createBricks();
  isColliding(ball, paddle);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);