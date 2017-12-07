const assert = require('chai').assert;
const Brick = require('../lib/Brick.js');
const Ball = require('../lib/Ball.js');


describe('Brick', function() {
  let brick;
  let ball;

  beforeEach(() => {
    brick = new Brick (0, 0, 88, 28);
    ball = new Ball(((800 - 70)/2), 425, 0, 0, 6, 0, 2 * Math.PI, 0, 4);
  })

  it('should be a function', function() {
    assert.isFunction(Brick);
  });

  it('should have a x position', function() {
    assert.equal(brick.x, 0);
  });

  it('should have a y position', function() {
    assert.equal(brick.y, 0)
  });

  it('should have a width', function() {
    assert.equal(brick.width, 88);
  });

  it('should have a height', function() {
    assert.equal(brick.height, 28);
  });

  it('should rebound ball on the y-axis', function() {
    ball.dy = -4;
    assert.equal(ball.dy, -4);
    brick.brickCollision(ball);
    if(ball.y < 0) {
    assert.equal(ball.dy, 4);
  }

  })

  it('should rebound ball on the x-axis', function() {
    ball.dx = 0;
    assert.equal(ball.dx, 0);
    brick.brickCollision(ball);
    if(ball.x < 0) {
    assert.equal(ball.dx, 0);
  }

  })

})

