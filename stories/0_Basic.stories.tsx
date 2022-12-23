import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer } from '../src'

import './stories.css'

const simpleLayer: Layer = (x, y) => {
  return {
    color: '#cccccc'
  }
}

storiesOf('TileMap', module).add('0. Basic', () => <TileMap layers={[simpleLayer]} />)
