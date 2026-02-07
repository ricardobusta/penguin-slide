export type TileType = "wall" | "ice";

export interface LevelData {
    name: string;
    width: number;
    height: number;
    tiles: TileType[];
    penguinIndex: number;
}