import * as React from 'react'
import { AutoSizer } from 'react-virtualized'

import { TileMap } from './TileMap'
import { Props } from './TileMap.types'

type ResizableProps = Omit<Props, 'width' | 'height'>
const resizableDefaultProps = { ...TileMap.defaultProps }
delete resizableDefaultProps.width
delete resizableDefaultProps.height

export class ResizableTileMap extends React.PureComponent<ResizableProps> {
  static defaultProps = resizableDefaultProps
  render() {
    return <AutoSizer>{props => <TileMap {...props} {...this.props} />}</AutoSizer>
  }
}
