import type {LevelData, TileType} from "../types.js";

export function generateTestLevel(
    width: number,
    height: number
): LevelData {
    const tiles: TileType[] = [];

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
