import * as React from 'react'

import { storiesOf } from '@storybook/react'
// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs'

import { TileMap, Layer } from '../src'
import { Coord, Tile } from '../src/lib/common'

import './stories.css'

let selected: Coord[] = []

const isSelected = (x: number, y: number) =>
  selected.some((coord) => coord.x === x && coord.y === y)

const handleClick = (x: number, y: number) => {
  if (isSelected(x, y)) {
    selected = selected.filter((coord) => !(coord.x === x && coord.y === y))
  } else {
    selected.push({ x, y })
  }
}

const selectedStrokeLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
}

const selectedFillLayer: Layer = (x, y) => {
  const tile = layer.get(x)?.get(y) ? layer.get(x)!.get(y)! : undefined

  return isSelected(x, y) ? { color: '#ff9990', scale: 1.2, ...tile } : null
}

const layer = new Map<number, Map<number, Tile>>()
for (let i = -5; i < 6; i++) {
  layer.set(i, new Map())
}

// Single tile
layer.get(0)?.set(0, {
  color: '#ff9990',
  strikethrough: true,
})

// Vertical rectangle
for (let i = 2; i < 5; i++) {
  layer.get(0)?.set(i, {
    color: '#ff9990',
    top: i !== 4,
    strikethrough: true,
  })
}

// Horizontal rectangle
for (let i = 2; i < 5; i++) {
  layer.get(i)?.set(0, {
    color: '#ff9990',
    left: i !== 2,
    strikethrough: true,
  })
}

// Square
for (let i = 2; i < 4; i++) {
  for (let j = 2; j < 4; j++) {
    layer.get(i)?.set(j, {
      color: '#ff9990',
      left: i === 3,
      top: j === 2,
      topLeft: i === 3 && j === 2,
      strikethrough: true,
    })
  }
}

// Long rectangle
for (let i = -5; i < 0; i++) {
  layer.get(i)?.set(-3, {
    color: '#ff9990',
    left: i !== -5,
    strikethrough: true,
  })
  layer.get(i)?.set(-4, {
    color: '#ff9990',
    left: i !== -5,
    top: true,
    topLeft: i !== -5,
    strikethrough: true,
  })
}

// Tetris brick
layer.get(2)?.set(-2, {
  color: '#ff9990',
  strikethrough: true,
})
layer.get(2)?.set(-3, {
  color: '#ff9990',
  top: true,
  strikethrough: true,
})
layer.get(3)?.set(-3, {
  color: '#ff9990',
  topLeft: true,
  left: true,
  strikethrough: true,
})
layer.get(3)?.set(-4, {
  color: '#ff9990',
  top: true,
  strikethrough: true,
})

const chessboardLayer: Layer = (x, y): Tile => {
  return !layer.get(x)?.get(y) ? { color: '#888888' } : layer.get(x)!.get(y)!
}

const stories = storiesOf('TileMap', module)

stories.addDecorator(withKnobs)

stories.add('10. Strikethrough layer', () => {
  return (
    <TileMap
      onClick={handleClick}
      layers={[chessboardLayer, selectedStrokeLayer, selectedFillLayer]}
    />
  )
})
