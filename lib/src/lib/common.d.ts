export declare type Coord = {
    x: number;
    y: number;
};
export declare type Layer = (x: number, y: number) => Tile | null;
export declare type Tile = {
    color: string;
    top?: boolean;
    left?: boolean;
    topLeft?: boolean;
    scale?: number;
};
