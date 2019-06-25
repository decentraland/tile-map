import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer, Coord } from '../src'

// prettier-ignore
const selected: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 2 }
]

function isSelected(x: number, y: number) {
  return selected.some(coord => coord.x === x && coord.y === y)
}

const chessboardLayer: Layer = (x, y) => {
  return {
    color: (x + y) % 2 === 0 ? '#cccccc' : '#888888'
  }
}

const selectedStrokeLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#00ff00', scale: 1.4 } : null
}

const selectedFillLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#00dd00', scale: 1.2 } : null
}

storiesOf('TileMap', module).add('2. Selection', () => (
  <TileMap layers={[chessboardLayer, selectedStrokeLayer, selectedFillLayer]} />
))
