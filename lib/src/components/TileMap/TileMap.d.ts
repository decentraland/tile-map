import * as React from 'react';
import { Coord } from '../../lib/common';
import { Props, State } from './TileMap.types';
import './TileMap.css';
export declare class TileMap extends React.PureComponent<Props, State> {
    static defaultProps: {
        x: number;
        y: number;
        className: string;
        initialX: number;
        initialY: number;
        size: number;
        width: number;
        height: number;
        zoom: number;
        minSize: number;
        maxSize: number;
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
        panX: number;
        panY: number;
        padding: number;
        isDraggable: boolean;
    };
    private oldState;
    private canvas;
    private shouldRefreshMap;
    private mounted;
    private hover;
    private popupTimeout;
    private mousedownTimestamp?;
    private destroy?;
    debouncedRenderMap: (...args: any[]) => void;
    debouncedUpdateCenter: (...args: any[]) => void;
    debouncedHandleChange: (...args: any[]) => void;
    constructor(props: Props);
    componentWillUpdate(nextProps: Props, nextState: State): void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    generateState(props: {
        width: number;
        height: number;
        padding: number;
    }, state: {
        pan: Coord;
        center: Coord;
        zoom: number;
        size: number;
    }): State;
    handleChange(): void;
    handlePanZoom: (args: {
        dx: number;
        dy: number;
        dz: number;
    }) => void;
    mouseToCoords(x: number, y: number): number[];
    handleClick: (event: MouseEvent) => void;
    handleMouseDown: () => void;
    handleMouseMove: (event: MouseEvent) => void;
    handleMouseOut: () => void;
    inBounds(x: number, y: number): boolean;
    showPopup(x: number, y: number, top: number, left: number): void;
    hidePopup(): void;
    updateCenter(): void;
    renderMap(): void;
    refCanvas: (canvas: HTMLCanvasElement | null) => void;
    handleTarget: () => void;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    getDz(): number;
    getDzZoomModifier(): 0.005 | 0.01;
    isMobile(): boolean;
    getCanvasClassName(): string;
    render(): JSX.Element;
}
