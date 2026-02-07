import { generateTestLevel } from "./level.js";
import { Renderer } from "./renderer.js";
export class Game {
    canvas;
    ctx;
    renderer;
    level;
    score = 0;
    size;
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.renderer = new Renderer(ctx);
        this.size = 0;
        this.level = generateTestLevel(10, 10);
        document.getElementById("level-name").textContent =
            this.level.name;
        document.getElementById("reset")
            .addEventListener("click", () => this.reset());
    }
    update(dt) {
        this.renderer.update(dt);
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.scale(1, 1);
        this.renderer.drawLevel(this.level, this.size);
        this.renderer.drawPenguin(this.level, this.size);
        this.renderer.drawGrid(this.level, this.size);
    }
    reset() {
        this.level = generateTestLevel(this.level.width, this.level.height);
    }
    resize(size) {
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.width = `${size}px`;
        this.canvas.style.height = `${size}px`;
        this.size = size;
    }
}
//# sourceMappingURL=game.js.map