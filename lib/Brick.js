const GamePiece = require('./GamePiece');

class Brick extends GamePiece{
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  createBricks() {
    // var bricks = [];
      for (var i = 0; i < 27; i++) {
        var x = 80 + (i % 9) * 1;
        var y = 80 + (i % 3) * 10;
        bricks.push(new Brick(x, y, 80, 30));
      }
    return bricks;
  }
}



module.exports = Brick;