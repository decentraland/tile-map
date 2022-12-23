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
  0: '#ff9990', // my parcels
  1: '#ff4053', // my parcels on sale
  2: '#ff9990', // my estates
  3: '#ff4053', // my estates on sale
  4: '#ffbd33', // parcels/estates where I have permissions
  5: '#5054D4', // districts
  6: '#563db8', // contributions
  7: '#716C7A', // roads
  8: '#70AC76', // plazas
  9: '#3D3A46', // owned parcel/estate
  10: '#3D3A46', // parcels on sale (we show them as owned parcels)
  11: '#09080A', // unowned pacel/estate
  12: '#18141a', // background
  13: '#110e13', // loading odd
  14: '#0d0b0e' // loading even
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
