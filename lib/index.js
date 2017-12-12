const Game = require('./Game');
const $ = require('jQuery');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var game = new Game(canvas, context, 800, 500);
var resetButton = document.querySelector('.reset-button');

canvas.addEventListener('click', startGame);
window.addEventListener('keydown', game.paddle.keyboarder);
canvas.addEventListener('mousemove', game.paddle.mousePosition);
canvas.addEventListener('click', moveLevel);
resetButton.addEventListener('click', resetGame);

$('.dashboard').hide();
game.createBalls();
game.createBricks(game.levelOne);

function startGame() {
  canvas.style.backgroundImage = "url('../Images/canvas-background.jpg')"
  canvas.removeEventListener('click', startGame);
  game.startGame();
}


// function mousePosition(e) {
//   var rect = canvas.getBoundingClientRect();
//   var posX = e.clientX - rect.left;

//   game.paddle.x = posX - 35;
// }

function moveLevel() {
  if (game.level === 2) {
    canvas.removeEventListener('click', moveLevel);
    game.levelBeaten = false;
    
    game.createBricks(game.levelTwo);
    game.displayNewRows();
    game.startGame();
  }
}

function resetGame() {
  window.location.reload(true);
}