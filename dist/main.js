import { Game } from "./game/game.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d", {
    alpha: false,
    desynchronized: true,
});
if (!ctx)
    throw new Error("Canvas 2D context not available");
const bgCanvas = document.getElementById("game-bg");
const bgCtx = bgCanvas.getContext("2d");
if (!bgCtx)
    throw new Error("Canvas 2D context not available");
const gameArea = document.getElementById("game-area");
if (!gameArea)
    throw new Error("Game area element not found");
const header = document.getElementById("game-header");
if (!header)
    throw new Error("Header element not found");
const footer = document.getElementById("game-footer");
if (!footer)
    throw new Error("Footer element not found");
const game = new Game(canvas, ctx);
let lastTime = performance.now();
function loop(now) {
    const dt = (now - lastTime) / 1000.0;
    lastTime = now;
    game.update(dt);
    game.render();
    requestAnimationFrame(loop);
}
function resize() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight - headerHeight - footerHeight;
    const size = Math.max(0, Math.min(availableWidth, availableHeight)) - 20;
    gameArea.style.height = `${size}px`;
    game.resize(size);
}
window.addEventListener("resize", resize);
resize();
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open("game-cache-v1").then((cache) => cache.addAll([
        "/",
        "/index.html",
        "/game.js",
        "/assets/sprites.png",
        "/assets/sounds.mp3"
    ])));
});
self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
canvas.addEventListener("touchstart", () => {
    if (document.fullscreenElement == null) {
        canvas.requestFullscreen().then(_ => { });
    }
});
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}
requestAnimationFrame(loop);
//# sourceMappingURL=main.js.map