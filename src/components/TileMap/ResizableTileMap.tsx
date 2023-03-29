import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import { TileMap } from './TileMap'
import { Props } from './TileMap.types'

type ResizableProps = Omit<Props, 'width' | 'height'> & {
  width?: number
  height?: number
}
const resizableDefaultProps: ResizableProps = { ...TileMap.defaultProps }
delete resizableDefaultProps.width
delete resizableDefaultProps.height

export class ResizableTileMap extends React.PureComponent<ResizableProps> {
  static defaultProps = resizableDefaultProps
  render() {
    return <AutoSizer>{props => <TileMap {...props} {...this.props} />}</AutoSizer>
  }
}
