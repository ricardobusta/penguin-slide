import { SpriteSheet } from "./spritesheet.js";
export class Renderer {
    ctx;
    sprites;
    constructor(ctx) {
        this.ctx = ctx;
        this.sprites = new SpriteSheet("assets/sprites.png", 4);
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.imageSmoothingQuality = "high";
    }
}
//# sourceMappingURL=bg_renderer.js.map