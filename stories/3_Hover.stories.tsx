import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer, Coord } from '../src'

let hover: Coord = { x: 0, y: 0 }

const isPositive = (x: number, y: number) => x > 0 && y > 0

const positiveLayer: Layer = (x, y) => {
  return {
    color: isPositive(x, y) ? '#cccccc' : '#888888'
  }
}

const hoverLayer: Layer = (x, y) => {
  return hover.x === x && hover.y === y
    ? { color: isPositive(x, y) ? '#ff0000' : '#00ff00' }
    : null
}

storiesOf('TileMap', module).add('3. Hover', () => (
  <TileMap layers={[positiveLayer, hoverLayer]} onHover={(x, y) => (hover = { x, y })} />
))
