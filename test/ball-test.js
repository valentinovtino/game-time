const assert = require('chai').assert;
const Ball = require('../lib/Ball.js');
const Paddle = require('../lib/Paddle.js');
const Game = require('../lib/Game.js')

let ball;
let paddle;

describe('Ball', function() {

  beforeEach(() => {
    paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
    ball = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
    game = new Game('canvas', 'context', 800, 500);
  })

  it('should be a function', function() {
    assert.isFunction(Ball);
  });

  it('should have a x position', function() {
    assert.equal(ball.x, 365);
  });

  it('should have a y position', function() {
    assert.equal(ball.y, 425)
  });

  it('should have a radius', function() {
    assert.equal(ball.radius, 6);
  });

  it('should reverse direction when it hits sides of the wall', function() {
    ball.dx = -1;
    assert.equal(ball.dx, -1);
    ball.wallCollision;
    if(ball.x < 0) {
      assert.equal(ball.dx, 1);
    }
  })

  it('should move at the speed of it\'s .dx value', function() {
    ball.dx = 5;
    ball.x = 100;
    assert.equal(ball.dx, 5);
    assert.equal(ball.x, 100);

    ball.move();

    assert.equal(ball.x, 105);
  })

})