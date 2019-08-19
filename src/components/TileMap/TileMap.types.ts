import { Coord, Layer } from '../../lib/common'
import { Viewport } from '../../lib/viewport'

export type Props = {
  /** layer to render on the map */
  layers: Layer[]
  /** custom class name */
  className: string
  /** where to position the map in the X axis */
  x: number
  /** where to position the map in the Y axis */
  y: number
  /** where to initially position the map in the X axis */
  initialX: number
  /** where to initially position the map in the Y axis */
  initialY: number
  /** size of each parcel, i.e: size=5 makes each parcel of 5x5 pixels */
  size: number
  /** width of the canvas in pixels */
  width: number
  /** height of the canvas in pixels */
  height: number
  /** zoom level of the map, this changes in the end the size on which parcels are rendered, i.e: size=10 and zoom=0.5 makes each parcel of 5x5 pixels */
  zoom: number
  /** min and max values for x and y (ie. the map boundaries) */
  minX: number
  maxX: number
  minY: number
  maxY: number
  /** minimum size that parcels can take (after applying zoom) */
  minSize: number
  /** maximum size that parcels can take (after applying zoom) */
  maxSize: number
  /** initial panning in the X axis, this changes the initial position of the map adding an offset to the prop `x` */
  panX: number
  /** initial panning in the Y axis, this changes the initial position of the map adding an offset to the prop `y` */
  panY: number
  /** whether the map should be draggable or not */
  isDraggable: boolean
  /** amount of padding tiles */
  padding: number
  /** callbacks */
  onMouseDown?: (x: number, y: number) => void
  onMouseUp?: (x: number, y: number) => void
  onClick?: (x: number, y: number) => void
  onHover?: (x: number, y: number) => void
  onPopup?: (args: {
    x: number
    y: number
    top: number
    left: number
    visible: boolean
  }) => void
  onChange?: (data: { center: Coord; nw: Coord; se: Coord; zoom: number }) => void
  /** renderer */
  renderMap: MapRenderer
}

export type State = Viewport & {
  center: Coord
  pan: Coord
  zoom: number
  size: number
  popup?: Popup
}

export type Popup = {
  x: number
  y: number
  top: number
  left: number
  visible: boolean
}

export type MapRenderer = (args: {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  size: number
  pan: Coord
  nw: Coord
  se: Coord
  center: Coord
  layers: Layer[]
}) => void
