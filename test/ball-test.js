const assert = require('chai').assert;
const Ball = require('../lib/Ball.js');
const Paddle = require('../lib/Paddle.js');

let ball;
let paddle;

describe('Ball', function() {

  beforeEach(() => {
    paddle = new Paddle(((800 - 70)/2), 475, 70, 20);
    ball = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
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

})