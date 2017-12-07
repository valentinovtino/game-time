const Game = require('./Game');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var game = new Game(canvas, context, 800, 500);
var resetButton = document.querySelector('.reset-button');

canvas.removeEventListener('click', startGame);
window.addEventListener('keydown', keyboarder);
canvas.addEventListener('mousemove', mousePosition);
canvas.addEventListener('click', startGame);
canvas.addEventListener('click', moveLevel);
resetButton.addEventListener('click', resetGame);

$('.dashboard').hide();

// game.startScreen();
game.createBalls();
game.createBricks(game.levelOne);

function moveLevel() {
  if (game.level === 2) {
    canvas.removeEventListener('click', moveLevel);
    game.levelBeaten = false;
    
    game.createBricks(game.levelTwo);
    game.displayNewRows();
    game.startGame();
  }
}

function startGame() {
  canvas.style.backgroundImage = "url('../Images/canvas-background.jpg')"
  canvas.removeEventListener('click', startGame);
  game.startGame();
}

function keyboarder(e) {
  if (e.keyCode === 37) {
    game.paddle.x -= 35;
  } else if (e.keyCode === 39) {
    game.paddle.x += 35;
  } else if (e.keyCode === 32) {
    game.levelOne.length = 0;
  } else if (e.keyCode === 65) {
    game.levelTwo.length = 0;
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