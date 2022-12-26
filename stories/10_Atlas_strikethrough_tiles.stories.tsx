import * as React from 'react'

import { storiesOf } from '@storybook/react'
// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs'

import { TileMap, Layer } from '../src'
import { Tile } from '../src/lib/common'

import './stories.css'

const layer = new Map<number, Map<number, Tile>>()
layer.set(0, new Map())
layer.set(2, new Map())
layer.set(3, new Map())
layer.set(4, new Map())
layer.set(5, new Map())

// Single tile
layer.get(0)?.set(0, {
  color: '#ff9990',
  strikethrough: true
})

// Vertical rectangle
for(let i = 2; i < 5; i++) {
  layer.get(0)?.set(i, {
    color: '#ff9990',
    top: i !== 4,
    strikethrough: true
  })
}

// Horizontal rectangle
for(let i = 2; i < 5; i++) {
  layer.get(i)?.set(0, {
    color: '#ff9990',
    left: i !== 2,
    strikethrough: true
  })
}

// Square
for(let i = 2; i < 4; i++) {
  for(let j = 2; j < 4; j++) {
    layer.get(i)?.set(j, {
      color: '#ff9990',
      left: i === 3,
      top: j === 2,
      strikethrough: true
    })
  }
}

// Tetris brick
layer.get(2)?.set(-2, {
  color: '#ff9990',
  strikethrough: true
})
layer.get(2)?.set(-3, {
  color: '#ff9990',
  topLeft: true,
  top: true,
  strikethrough: true
})
layer.get(3)?.set(-3, {
  color: '#ff9990',
  left: true,
  strikethrough: true
})
layer.get(3)?.set(-4, {
  color: '#ff9990',
  top: true,
  strikethrough: true
})

const chessboardLayer: Layer = (x, y) => {
  if (!layer.get(x)?.get(y)) {
    return {
      color: '#888888'
    }
  }

  return layer.get(x)!.get(y)!
}

const stories = storiesOf('TileMap', module)

stories.addDecorator(withKnobs)

stories.add('10. Strikethrough layer', () => {
  return <TileMap layers={[chessboardLayer]} />
})
