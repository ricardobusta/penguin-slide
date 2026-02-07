import { SpriteSheet } from "../spritesheet.js";
const SPRITE_SIZE = 16;
const FRAME_DURATION = 0.5;
export class Renderer {
    ctx;
    sprites;
    frame = 0;
    frameTimer = 0;
    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.scale(1, 1);
        this.sprites = new SpriteSheet("assets/sprites.png", SPRITE_SIZE);
    }
    update(dt) {
        this.frameTimer += dt;
        if (this.frameTimer > FRAME_DURATION) {
            this.frame = this.frame === 0 ? 1 : 0;
            this.frameTimer = 0;
        }
    }
    drawLevel(level, size) {
        let tileSize = size / level.width;
        for (let y = 0; y < level.height; y++) {
            for (let x = 0; x < level.width; x++) {
                const idx = y * level.width + x;
                const tile = level.tiles[idx];
                const sprite = tile === "wall"
                    ? 4 + this.frame
                    : 2 + this.frame;
                this.sprites.draw(this.ctx, sprite, x * tileSize, y * tileSize, tileSize);
            }
        }
    }
    drawPenguin(level, size) {
        let tileSize = size / level.width;
        const x = level.penguinIndex % level.width;
        const y = Math.floor(level.penguinIndex / level.width);
        this.sprites.draw(this.ctx, 0 + this.frame, x * tileSize, y * tileSize, tileSize);
    }
    drawGrid(level, size) {
        let tileSize = size / level.width;
        const ctx = this.ctx;
        const cols = level.width;
        const rows = level.height;
        ctx.save();
        ctx.beginPath();
        // Vertical lines
        for (let x = 0; x <= cols; x++) {
            const px = x * tileSize;
            ctx.moveTo(px + 0.0, 0);
            ctx.lineTo(px + 0.0, rows * tileSize);
        }
        // Horizontal lines
        for (let y = 0; y <= rows; y++) {
            const py = y * tileSize;
            ctx.moveTo(0, py + 0.0);
            ctx.lineTo(cols * tileSize, py + 0.0);
        }
        ctx.strokeStyle = "rgba(200, 200, 200, 255)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }
}
//# sourceMappingURL=renderer.js.map