declare type PanZoomEventType = 'mouse' | 'touch';
declare type PanZoomEvent = {
    target: HTMLElement;
    type: PanZoomEventType;
    dx: number;
    dy: number;
    dz: number;
    x: number;
    y: number;
    x0: number;
    y0: number;
};
export declare function panzoom(target: HTMLElement, cb: (e: PanZoomEvent) => void): () => void;
export {};
