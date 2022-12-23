import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer, Coord } from '../src'

let selected: Coord[] = []

const isSelected = (x: number, y: number) =>
  selected.some(coord => coord.x === x && coord.y === y)

const clickedLayer: Layer = (x, y) => {
  return {
    color: isSelected(x, y) ? '#00ff00' : '#888888'
  }
}

storiesOf('TileMap', module).add('4. Click', () => (
  <TileMap layers={[clickedLayer]} onClick={(x, y) => selected.push({ x, y })} />
))
