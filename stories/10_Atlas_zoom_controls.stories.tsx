import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import { TileMap, Layer } from '../src'

type AtlasTile = {
  x: number
  y: number
  type: number
  estate_id: number
  left: number
  top: number
  topLeft: number
}

let atlas: Record<string, AtlasTile> | null = null

async function loadTiles() {
  const resp = await fetch('https://api.decentraland.org/v1/tiles')
  const json = await resp.json()
  atlas = json.data as Record<string, AtlasTile>
}

loadTiles().catch(console.error)

const stories = storiesOf('TileMap', module)

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

stories.add('10. With zoom controls', () => {
  return (
    <TileMap
      className="atlas"
      layers={[atlasLayer]}
      x={number('x', 0)}
      y={number('y', 0)}
      withZoomControls
    />
  )
})

stories.add('11. With onCenterChange handler', () => {
  const [x, setX] = React.useState<number>()
  const [y, setY] = React.useState<number>()
  return (
    <TileMap
      className="atlas"
      layers={[atlasLayer]}
      minSize={3}
      x={x}
      y={y}
      withZoomControls
      onCenterChange={(center) => { setX(center.x); setY(center.y)}}
    />
  )
})
