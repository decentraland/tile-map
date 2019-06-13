import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer } from '../src'

const connectedLayer: Layer = (x, y) => {
  const top = x % 10 === 0
  const left = y % 10 === 0
  return {
    color: top || left ? '#888888' : '#cccccc',
    top,
    left
  }
}

storiesOf('TileMap', module).add('5. Connect', () => (
  <TileMap layers={[connectedLayer]} />
))
