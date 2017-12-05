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
}); 