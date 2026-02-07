import {Game} from "./game/game.js";

// Get elements and contexts, with error handling.
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d", {
    alpha: false,
    desynchronized: true,
}) as CanvasRenderingContext2D;
if (!ctx) throw new Error("Canvas 2D context not available");

const bgCanvas = document.getElementById("game-bg") as HTMLCanvasElement;
const bgCtx = bgCanvas.getContext("2d") as CanvasRenderingContext2D;
if (!bgCtx) throw new Error("Canvas 2D context not available");

const gameArea = document.getElementById("game-area") as HTMLElement
if (!gameArea) throw new Error("Game area element not found");

const header = document.getElementById("game-header") as HTMLElement;
if (!header) throw new Error("Header element not found");

const footer = document.getElementById("game-footer") as HTMLElement;
if (!footer) throw new Error("Footer element not found");

// Initialize game
const game = new Game(canvas, ctx);

let lastTime = performance.now();

function loop(now: number): void {
    const dt = (now - lastTime) / 1000.0;
    lastTime = now;

    game.update(dt);
    game.render();

    requestAnimationFrame(loop);
}

function resize(): void {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;

    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight - headerHeight - footerHeight;

    const size = Math.max(
        0,
        Math.min(availableWidth, availableHeight)
    ) - 20;

    gameArea.style.height = `${size}px`;
    game.resize(size);
}

window.addEventListener("resize", resize);
resize();

self.addEventListener("install", (event: any) => {
    event.waitUntil(
        caches.open("game-cache-v1").then((cache: any) =>
            cache.addAll([
                "/",
                "/index.html",
                "/game.js",
                "/assets/sprites.png",
                "/assets/sounds.mp3"
            ])
        )
    );
});

self.addEventListener("fetch", (event: any) => {
    event.respondWith(
        caches.match(event.request).then((response: any) =>
            response || fetch(event.request)
        )
    );
});

canvas.addEventListener("touchstart", () => {
    if (document.fullscreenElement == null) {
        canvas.requestFullscreen().then(_ => {
        });
    }
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

// Deferred install prompt for PWA.
if (!window.matchMedia("(display-mode: standalone)").matches) {
    let deferredPrompt: any = null;

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    let installButton = document.getElementById("install-button") as HTMLButtonElement;

    installButton.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null; // one-time use
    });
}

requestAnimationFrame(loop);