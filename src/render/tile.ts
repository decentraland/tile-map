export function buildStrikethroughPattern(
  ctx: CanvasRenderingContext2D,
  scale: number
): CanvasPattern | null {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')
  if (!patternContext) {
    return null
  }

  patternCanvas.width = 100
  patternCanvas.height = 100

  const blackColor = '#000000'
  // Uses a fixed number of stripes with a thickness based on the original size of the tile.
  const thickness = 10 * scale
  const numberOfStripes = patternCanvas.width / thickness
  patternContext.globalAlpha = 0.3

  for (var i = 0; i < numberOfStripes * 2; i += 2) {
    patternContext.beginPath()
    patternContext.strokeStyle = blackColor
    patternContext.lineWidth = thickness / 1.5
    patternContext.lineCap = 'square'
    patternContext.moveTo(i * thickness + thickness / 2 - patternCanvas.width, 0)
    patternContext.lineTo(i * thickness + thickness / 2, patternCanvas.width)
    patternContext.stroke()
  }

  return ctx.createPattern(patternCanvas, 'repeat')
}

export function renderTile(args: {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  size: number
  padding: number
  offset: number
  color: string
  left?: boolean
  top?: boolean
  topLeft?: boolean
  scale?: number
  strikethrough?: boolean
  strikethroughPattern?: CanvasPattern
}) {
  const { ctx, x, y, size, padding, offset, color, left, top, topLeft, scale } = args

  ctx.fillStyle = color

  const tileSize = scale ? size * scale : size

  if (!top && !left) {
    // disconnected everywhere: it's a square
    ctx.fillRect(
      x - tileSize + padding,
      y - tileSize + padding,
      tileSize - padding,
      tileSize - padding
    )
  } else if (top && left && topLeft) {
    // connected everywhere: it's a square
    ctx.fillRect(
      x - tileSize - offset,
      y - tileSize - offset,
      tileSize + offset,
      tileSize + offset
    )
  } else {
    if (left) {
      // connected left: it's a rectangle
      ctx.fillRect(
        x - tileSize - offset,
        y - tileSize + padding,
        tileSize + offset,
        tileSize - padding
      )
    }
    if (top) {
      // connected top: it's a rectangle
      ctx.fillRect(
        x - tileSize + padding,
        y - tileSize - offset,
        tileSize - padding,
        tileSize + offset
      )
    }
  }
}

export function initializeContextForTileStrike(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): Path2D {
  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  ctx.save()
  return new Path2D()
}

export function addClippingContextForTileStrike(args: {
  ctx: CanvasRenderingContext2D
  region: Path2D
  x: number
  y: number
  size: number
  padding: number
  offset: number
  left?: boolean
  top?: boolean
  topLeft?: boolean
  scale?: number
}): void {
  const { x, y, size, padding, offset, left, top, topLeft, scale, region } = args
  const tileSize = scale ? size * scale : size

  if (!top && !left) {
    region.rect(
      x - tileSize + padding,
      y - tileSize + padding,
      tileSize - padding,
      tileSize - padding
    )
  } else if (top && left && topLeft) {
    region.rect(
      x - tileSize - offset,
      y - tileSize - offset,
      tileSize + offset,
      tileSize + offset
    )
  } else {
    if (left) {
      region.rect(
        x - tileSize - offset,
        y - tileSize + padding,
        tileSize + offset,
        tileSize - padding
      )
    }
    if (top) {
      region.rect(
        x - tileSize + padding,
        y - tileSize - offset,
        tileSize - padding,
        tileSize + offset
      )
    }
  }
}

export function finishClipping(
  ctx: CanvasRenderingContext2D,
  region: Path2D,
  pattern: CanvasPattern,
  width: number,
  height: number
) {
  ctx.clip(region)
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
}
