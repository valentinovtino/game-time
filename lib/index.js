const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
var ball = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 1);

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 37) {
    paddle.x-- 
  } else if (e.keyCode === 39) {
    paddle.x++
  }
});


function gameLoop() {
  context.clearRect(0,0, canvas.width, canvas.height);

  ball.move(canvas);
  ball.createBall(context);

  paddle.draw(context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);