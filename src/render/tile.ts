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

/**
 * Creates a strikethrough pattern that can be later used to draw over a canvas.
 * @param ctx The context of the
 * @param scale The scaling factor for the lines thickness.
 * @returns a CanvasPattern with the strikethrough pattern or null if the browser didn't provide a context.
 */
export function buildStrikethroughPattern(
  ctx: CanvasRenderingContext2D,
  scale?: number
): CanvasPattern | null {
  const patternCanvas = document.createElement('canvas')
  const patternContext = patternCanvas.getContext('2d')
  if (!patternContext) {
    return null
  }

  patternCanvas.width = 200
  patternCanvas.height = 200

  const blackColor = '#000000'
  // Uses a fixed number of stripes with a thickness based on the original size of the tile.
  const thickness = 10 * (scale ?? 1)
  const numberOfStripes = patternCanvas.width / thickness
  patternContext.globalAlpha = 0.3

  patternContext.beginPath()
  for (var i = 0; i < numberOfStripes * 2; i += 2) {
    patternContext.strokeStyle = blackColor
    patternContext.lineWidth = thickness / 1.5
    patternContext.lineCap = 'square'
    patternContext.moveTo(i * thickness + thickness / 2 - patternCanvas.width, 0)
    patternContext.lineTo(i * thickness + thickness / 2, patternCanvas.width)
  }
  patternContext.stroke()

  return ctx.createPattern(patternCanvas, 'repeat')
}

/**
 * Initializes the process of creating the strikethrough clipping canvas.
 * This function clears the existing canvas, starts a new path where to write the clipping rectangles
 * that will be used to draw the tiles and creates the path for the clipping rectangles.
 * @param ctx The canvas context where to draw the strikethrough screen.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 * @returns a new Path2D where all the clipping rectangles will be added to.
 */
export function initializeContextForTileStrike(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): Path2D {
  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  return new Path2D()
}

/**
 * Draws a clipping rectangle and adds it to the clipping region to be later clipped.
 * @param args The set of arguments that define how to draw a clipping rectangle.
 */
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

/**
 * Fills the canvas with a pattern and clips the figures defined in the region to produce a canvas that
 * contains figures with a strikethrough pattern.
 * @param ctx The context of the canvas where to draw the figures.
 * @param region The region containing the figures to be clipped out of the pattern.
 * @param pattern The pattern which will server as the figures background after clipping them.
 * @param width The width of the canvas to write the strike pattern onto.
 * @param height The height of the canvas to write the strike pattern onto.
 */
export function finishClippingForTileStrike(
  ctx: CanvasRenderingContext2D,
  region: Path2D,
  pattern: CanvasPattern,
  width: number,
  height: number
) {
  ctx.save()
  ctx.clip(region)
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
}
