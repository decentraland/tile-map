import { Coord } from './common';
export declare type Viewport = {
    width: number;
    height: number;
    nw: Coord;
    se: Coord;
    area: number;
};
export declare function getViewport(args: {
    width: number;
    height: number;
    center: Coord;
    size: number;
    padding: number;
    pan?: Coord;
}): Viewport;
