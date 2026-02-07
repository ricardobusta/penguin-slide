export function generateTestLevel(width, height) {
    const tiles = [];
    for (let i = 0; i < width * height; i++) {
        tiles.push(Math.random() < 0.25 ? "wall" : "ice");
    }
    const penguinIndex = Math.floor(Math.random() * tiles.length);
    tiles[penguinIndex] = "ice";
    return {
        name: "Frozen Start",
        width,
        height,
        tiles,
        penguinIndex
    };
}
//# sourceMappingURL=level.js.map