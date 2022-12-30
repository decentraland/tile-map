import {
  addClippingContextForTileStrike,
  buildStrikethroughPattern,
  finishClipping,
  initializeContextForTileStrike,
  renderTile,
} from './tile'
import { Coord, Layer } from '../lib/common'

export function renderMap(args: {
  ctx: CanvasRenderingContext2D
  strikeCanvasCtx: CanvasRenderingContext2D
  width: number
  height: number
  size: number
  pan: Coord
  nw: Coord
  se: Coord
  center: Coord
  layers: Layer[]
}) {
  const { ctx, strikeCanvasCtx, width, height, size, pan, nw, se, center, layers } = args
  const strikethroughPattern = buildStrikethroughPattern(ctx, 1)
  let clippingRegion: Path2D
  ctx.clearRect(0, 0, width, height)

  const halfWidth = width / 2
  const halfHeight = height / 2

  for (const layer of layers) {
    clippingRegion = initializeContextForTileStrike(strikeCanvasCtx, width, height)
    let hasStrikeTile = false
    for (let x = nw.x; x < se.x; x++) {
      for (let y = se.y; y < nw.y; y++) {
        const offsetX = (center.x - x) * size + (pan ? pan.x : 0)
        const offsetY = (y - center.y) * size + (pan ? pan.y : 0)

        const tile = layer(x, y)
        if (!tile) {
          continue
        }
        const { color, top, left, topLeft, scale, strikethrough } = tile

        const halfSize = scale ? (size * scale) / 2 : size / 2

        renderTile({
          ctx,
          x: halfWidth - offsetX + halfSize,
          y: halfHeight - offsetY + halfSize,
          size,
          padding: size < 7 ? 0.5 : size < 12 ? 1 : size < 18 ? 1.5 : 2,
          offset: 1,
          color,
          left,
          top,
          topLeft,
          scale,
        })

        if (strikethrough) {
          hasStrikeTile = true
          addClippingContextForTileStrike({
            ctx: strikeCanvasCtx,
            region: clippingRegion,
            x: halfWidth - offsetX + halfSize,
            y: halfHeight - offsetY + halfSize,
            size,
            padding: size < 7 ? 0.5 : size < 12 ? 1 : size < 18 ? 1.5 : 2,
            offset: 1,
            left,
            top,
            topLeft,
            scale,
          })
        }
      }
    }
    if (strikethroughPattern && hasStrikeTile) {
      finishClipping(strikeCanvasCtx, clippingRegion, strikethroughPattern, width, height)
    }
    // Draw the strike pattern
    if (
      strikeCanvasCtx.canvas.width > 0 &&
      strikeCanvasCtx.canvas.height > 0 &&
      hasStrikeTile
    ) {
      ctx.drawImage(strikeCanvasCtx.canvas, 0, 0)
    }
  }
}
