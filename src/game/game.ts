import {generateTestLevel} from "./level.js";
import {Renderer} from "./renderer.js";
import type {LevelData} from "../types.js";

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private renderer: Renderer;

    private level: LevelData;
    private score: number = 0;
    private size: number;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.renderer = new Renderer(ctx);
        this.size = 0;

        this.level = generateTestLevel(10, 10);

        document.getElementById("level-name")!.textContent =
            this.level.name;

        document.getElementById("reset")!
            .addEventListener("click", () => this.reset());
    }

    update(dt: number): void {
        this.renderer.update(dt);
    }

    render(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.scale(1,1);
        this.renderer.drawLevel(this.level, this.size);
        this.renderer.drawPenguin(this.level, this.size);
        this.renderer.drawGrid(this.level, this.size);
    }

    private reset(): void {
        this.level = generateTestLevel(
            this.level.width,
            this.level.height
        );
    }

    resize(size: number) {
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.width = `${size}px`;
        this.canvas.style.height = `${size}px`;
        this.size = size;
    }
}
