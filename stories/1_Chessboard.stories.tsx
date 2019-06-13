import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer } from '../src'

import './stories.css'

const chessboardLayer: Layer = (x, y) => {
  return {
    color: (x + y) % 2 === 0 ? '#cccccc' : '#888888'
  }
}

storiesOf('TileMap', module).add('1. Chessboard', () => (
  <TileMap layers={[chessboardLayer]} />
))
