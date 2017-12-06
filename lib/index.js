const Game = require('./Game');
const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');
const GamePiece = require('./GamePiece');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var game = new Game(canvas, context, 800, 500);
var startButton = document.querySelector('.start-button');

window.addEventListener('keydown', keyboarder);
canvas.addEventListener('mousemove', mousePosition);
startButton.addEventListener('click', startGame);

game.createBricks();
game.createBalls();

function startGame() {
  game.animationFrame();
  requestAnimationFrame(game.animationFrame);
  startButton.removeEventListener('click', startGame);
}

function keyboarder(e) {
  if (e.keyCode === 37) {
    paddle.x -= 35;
  } else if (e.keyCode === 39) {
    paddle.x += 35;
  } else if(e.keyCode === 32) {
    game.bricksArray.length = 0;
  }
}

function mousePosition(e) {
  var rect = canvas.getBoundingClientRect();
  var posX = e.clientX - rect.left;

  game.paddle.x = posX - 35;
}