export class SpriteSheet {
    image;
    loaded = false;
    tilesPerRow;
    tileSize;
    constructor(src, tileSize) {
        this.image = new Image();
        this.image.src = src;
        this.tilesPerRow = 1;
        this.tileSize = tileSize;
        this.image.onload = () => {
            this.loaded = true;
            this.tilesPerRow = this.image.width / this.tileSize;
        };
    }
    draw(ctx, spriteIndex, dx, dy, tileSize) {
        if (!this.loaded)
            return;
        const sx = (spriteIndex % this.tilesPerRow) * this.tileSize;
        const sy = Math.floor(spriteIndex / this.tilesPerRow) * this.tileSize;
        ctx.drawImage(this.image, sx, sy, this.tileSize, this.tileSize, dx, dy, tileSize, tileSize);
    }
}
//# sourceMappingURL=spritesheet.js.map