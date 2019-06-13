import { Coord, Layer } from '../lib/common';
export declare function renderMap(args: {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    size: number;
    pan: Coord;
    nw: Coord;
    se: Coord;
    center: Coord;
    layers: Layer[];
}): void;
