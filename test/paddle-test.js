var assert = require('chai').assert;
var Paddle = require('../lib/Paddle.js');

let paddle;

describe('Paddle', function() {

  beforeEach(() => {
    paddle = new Paddle(365, 475, 70, 20);
  })

  it('should be a function', function() {
    assert.isFunction(Paddle);
  });

  it('should have a starting x-position', function() {
    assert.equal(paddle.x, 365);
  });

  it('should have a starting y-position', function() {
    assert.equal(paddle.y, 475);
  });

  it('should have a width', function() {
    assert.equal(paddle.width, 70);
  });

  it('it should have a height', function() {
    assert.equal(paddle.height, 20);
  });

  it('should not be able to go off the right side of canvas', function() {
    let paddleLeft = paddle.x;
    let paddleRight = paddle.x + 70;

    assert.equal(paddleRight < 800, true);
    paddle.stopPaddle();
    assert.equal(paddleRight < 800, true);
  })

  it('should not be able to go off the left side of canvas', function() {
    let paddleLeft = paddle.x;
    let paddleRight = paddle.x + 70;

    assert.equal(paddleLeft > 0, true);
    paddle.stopPaddle();
    assert.equal(paddleLeft > 0, true);
  })

}); 









