const Game = require('./Game');
const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');
const GamePiece = require('./GamePiece');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var game = new Game(canvas, context, 800, 500);
var startButton = document.querySelector('.start-button');
var nextLvlButton = document.querySelector('.lvl-start');
var resetButton = document.querySelector('.reset-button');

window.addEventListener('keydown', keyboarder);
canvas.addEventListener('mousemove', mousePosition);
startButton.addEventListener('click', startGame);
nextLvlButton.addEventListener('click', moveLevel);
resetButton.addEventListener('click', resetGame);

game.createBalls();
game.createBricks(game.levelOne);

function moveLevel() {
  console.log(game.level);
  if(game.level === 2) {
    game.createBricks(game.levelTwo)
    game.lvlTwoBricks();
    game.lvlTwoBricks2();
    game.lvlTwoBricks3();
  }
}

// function draw(context) {
//   var img = new Image();
//   img.onload = function() {
//     context.drawImage(img, 0, 0, 50, 50);
//     // context.beginPath();
//     // context.stroke();
//   }
//   img.src = "Images/obama-start.jpg";
// } 

function startGame() {
  // draw();
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
    game.levelOne.length = 0;
  }
}

function mousePosition(e) {
  var rect = canvas.getBoundingClientRect();
  var posX = e.clientX - rect.left;

  game.paddle.x = posX - 35;
}

function resetGame() {
  window.location.reload(true);
}