export class SpriteSheet {
    private readonly image: HTMLImageElement;
    private loaded = false;

    private tilesPerRow: number;
    private readonly tileSize: number;

    constructor(src: string, tileSize: number) {
        this.image = new Image();
        this.image.src = src;
        this.tilesPerRow = 1;
        this.tileSize = tileSize;
        this.image.onload = () => {
            this.loaded = true;
            this.tilesPerRow = this.image.width / this.tileSize;
        };
    }

    draw(ctx: CanvasRenderingContext2D, spriteIndex: number, dx: number, dy: number, tileSize: number): void {
        if (!this.loaded) return;

        const sx = (spriteIndex % this.tilesPerRow) * this.tileSize;
        const sy = Math.floor(spriteIndex / this.tilesPerRow) * this.tileSize;

        ctx.drawImage(this.image, sx, sy, this.tileSize, this.tileSize, dx, dy, tileSize, tileSize);
    }
}
