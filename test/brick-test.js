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

  
})

