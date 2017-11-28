const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var paddle = new Paddle(((800 - 70)/2), 475, 70, 20);

function gameLoop() {
  paddle.draw(context);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);