const Game = require('./Game');
const Paddle = require('./Paddle');
const Brick = require('./Brick');
const Ball= require('./Ball');
const GamePiece = require('./GamePiece');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var game = new Game(canvas, context, 800, 500);

window.addEventListener('keydown', keyboarder);
canvas.addEventListener('mousemove', mousePosition);

game.createBricks();
game.createBalls();

game.animationFrame();
requestAnimationFrame(game.animationFrame);

// gameLoop();
// startGame();
// game.createBalls();
// game.createBricks();
// // game.animationFrame();
// console.log(game.bricksArray)

// function gameLoop() {
// var gameLoop = () => {
//   // if (!game.isOver) {
//     // startGame()
//     game.animationFrame()
//     requestAnimationFrame(gameLoop)
//   // }
// }
// }


// function startGame (gameLoop) {
//   requestAnimationFrame(gameLoop)
// }



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

  game.paddle.x = posX - 35;
}

function gameOver() {
  if (ballsArray.length === 0) {
    var gameIsOver = true;
  } else {
    gameIsOver = false;
  }
}












// function playGame(gameLoop) {
//   requestAnimationFrame(gameLoop);
// }
  
// function gameLoop() {
//   context.clearRect(0,0, canvas.width, canvas.height);

//   game.ballsArray[0].move(canvas);
//   game.ballsArray[0].drawBall(context);
//   game.newBall();
  
//   game.paddle.stopPaddle();
//   game.paddle.draw(context);

//   game.drawBricks(context);

//   game.paddle.paddleCollision(game.ballsArray[0], game.score);
//   game.removeBricks();

//   requestAnimationFrame(gameLoop);
// }

// playGame(gameLoop);