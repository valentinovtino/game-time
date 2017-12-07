class GamePiece {
  constructor(x, y, width, height, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.imageSrc = src;
  }

  draw(context) {
    var image = new Image();
    image.src = this.imageSrc;
    context.drawImage(image, this.x, this.y, this.width, this.height)
    // context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}

module.exports = GamePiece;