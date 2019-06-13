import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { TileMap, Layer, Coord } from '../src'

import './6_Atlas.stories.css'

type AtlasTile = {
  x: number
  y: number
  type: number
  district_id?: number
  estate_id?: number
  left?: number
  top?: number
  topLeft?: number
  price?: number
}

let atlas: Record<string, AtlasTile> | null = null

async function loadTiles() {
  const resp = await fetch('https://api.decentraland.org/v1/tiles')
  const json = await resp.json()
  atlas = json.data as Record<string, AtlasTile>
}

loadTiles().catch(console.error)

export const COLOR_BY_TYPE = Object.freeze({
  0: '#ff9990',
  1: '#ff4053',
  2: '#ff9990',
  3: '#ff4053',
  4: '#5054D4',
  5: '#563db8',
  6: '#716C7A',
  7: '#70AC76',
  8: '#3D3A46',
  9: '#3D3A46',
  10: '#09080A',
  11: '#18141a',
  12: '#110e13',
  13: '#0d0b0e'
})

let selected: Coord[] = []

function isSelected(x: number, y: number) {
  return selected.some(coord => coord.x === x && coord.y === y)
}

const atlasLayer: Layer = (x, y) => {
  const id = x + ',' + y
  if (atlas !== null && id in atlas) {
    const tile = atlas[id]
    const color = COLOR_BY_TYPE[tile.type]

    const top = !!tile.top
    const left = !!tile.left
    const topLeft = !!tile.topLeft

    return {
      color,
      top,
      left,
      topLeft
    }
  } else {
    return {
      color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[12] : COLOR_BY_TYPE[13]
    }
  }
}

const onSaleLayer: Layer = (x, y) => {
  const id = x + ',' + y
  if (atlas && id in atlas && atlas[id].price) {
    const color = '#00d3ff'
    const top = !!atlas[id].top
    const left = !!atlas[id].left
    const topLeft = !!atlas[id].topLeft
    return {
      color,
      top,
      left,
      topLeft
    }
  }
  return null
}

const selectedStrokeLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null
}

const selectedFillLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null
}

storiesOf('TileMap', module).add('7. Atlas + On Sale + Click Parcel', () => (
  <TileMap
    className="atlas"
    layers={[atlasLayer, onSaleLayer, selectedStrokeLayer, selectedFillLayer]}
    onClick={(x, y) => {
      if (isSelected(x, y)) {
        selected = selected.filter(coord => coord.x !== x || coord.y !== y)
      } else {
        selected.push({ x, y })
      }
    }}
  />
))
