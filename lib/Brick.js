const GamePiece = require('./GamePiece');

class Brick extends GamePiece{
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
}

module.exports = Brick;