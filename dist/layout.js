export function resizeGameArea() {
    const header = document.getElementById("game-header");
    const footer = document.getElementById("game-footer");
    const gameArea = document.getElementById("game-area");
    const gameCanvas = document.getElementById("game");
    if (!header || !footer || !gameArea)
        return;
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight - headerHeight - footerHeight;
    const size = Math.max(0, Math.min(availableWidth, availableHeight));
    gameArea.style.height = `${size}px`;
    gameCanvas.style.width = `${size}px`;
    gameCanvas.style.height = `${size}px`;
    gameCanvas.width = size;
    gameCanvas.height = size;
}
//# sourceMappingURL=layout.js.map