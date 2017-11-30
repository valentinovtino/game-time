const GamePiece = require('./GamePiece');

class Paddle extends GamePiece {
  constructor(x, y, width, height) {
    super(x, y, width, height)
  }  
}

module.exports = Paddle;