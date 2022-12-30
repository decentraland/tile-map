import {
  addClippingContextForTileStrike,
  buildStrikethroughPattern,
  finishClippingForTileStrike,
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
  zoom: number
}) {
  const { ctx, strikeCanvasCtx, width, height, size, pan, nw, se, center, layers } = args
  // Creates the strikethrough pattern that will be used to draw the strikethrough in the tiles.
  // The scale is set to 1 as scaling the pattern makes it very difficult to be used into a repeatable pattern.
  const strikethroughPattern = buildStrikethroughPattern(ctx, 1)
  // Sets up the clipping region to be used in the strike process.
  let clippingRegion: Path2D
  ctx.clearRect(0, 0, width, height)

  const halfWidth = width / 2
  const halfHeight = height / 2

  for (const layer of layers) {
    // Initializes the strike canvas and its context
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
          // Adds the rectangles figures to the clipping region to later clip everything outside of those regions
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
      // Applies the pattern and clips the regions to produce the strike pattern over the tiles.
      finishClippingForTileStrike(
        strikeCanvasCtx,
        clippingRegion,
        strikethroughPattern,
        width,
        height
      )
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
