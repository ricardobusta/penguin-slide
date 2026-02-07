import {SpriteSheet} from "./spritesheet.js";

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    private sprites: SpriteSheet;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.sprites = new SpriteSheet("assets/sprites.png", 4);

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.imageSmoothingQuality = "high";
    }
}