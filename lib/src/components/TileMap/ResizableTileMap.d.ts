import * as React from 'react';
import { Props } from './TileMap.types';
declare type ResizableProps = Omit<Props, 'width' | 'height'>;
export declare class ResizableTileMap extends React.PureComponent<ResizableProps> {
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
    render(): JSX.Element;
}
export {};
