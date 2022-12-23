import * as React from 'react'

import { storiesOf } from '@storybook/react'
// @ts-ignore
import { withKnobs, number } from '@storybook/addon-knobs'

import { TileMap, Layer } from '../src'

import './stories.css'

const chessboardLayer: Layer = (x, y) => {
  return {
    color: (x + y) % 2 === 0 ? '#cccccc' : '#888888'
  }
}

const stories = storiesOf('TileMap', module)

stories.addDecorator(withKnobs)

stories.add('8. Controlled zoom', () => {
  return <TileMap layers={[chessboardLayer]} zoom={number('Zoom', 2)} />
})
