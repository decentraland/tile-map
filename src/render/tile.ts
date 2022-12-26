function strikethroughTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  position?: {
    top?: boolean,
    left?: boolean,
    topLeft?: boolean
  }
) {
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.lineCap = 'square'
  // This is to make it centered, but I'm not that we need it really
  // We need to make sure that this works correctly.
  let clipX = x
  let clipY = y
  let clipSize = size
  if (!position?.top && !position?.left) {
    clipX += 1
    clipY += 1
    clipSize -= 2
  } else if (position?.top && position?.left && position?.topLeft) {
    clipSize -= + 2
  } else {
    if (position?.left) {
      clipY -= 4
    } else if (position?.top) {

    }
  }
  // Clipping rectangle
  // ctx.fillRect(x, y, x + size, y + size)
  ctx.moveTo(clipX, clipY)
  ctx.lineTo(clipX, clipY + clipSize)
  ctx.lineTo(clipX + clipSize, clipY + clipSize)
  ctx.lineTo(clipX + clipSize, clipY)
  ctx.lineTo(clipX, clipY)
  ctx.closePath()
  ctx.clip()

  const color1 = '#000000'
  const numberOfStripes = 6
  const thickness = size / numberOfStripes
  ctx.globalAlpha = 0.3

  for (var i = 0; i < numberOfStripes * 2; i++) {
    if (i % 2 !== 0) {
      continue
    }
    ctx.beginPath()
    ctx.strokeStyle = color1
    ctx.lineWidth = thickness / 1.5
    ctx.lineCap = 'square'
    ctx.moveTo(x + i * thickness + thickness / 2 - size, y)
    ctx.lineTo(x + i * thickness + thickness / 2, y + size)
    ctx.stroke()
  }

  ctx.restore()
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
}) {
  const {
    ctx,
    x,
    y,
    size,
    padding,
    offset,
    color,
    left,
    top,
    topLeft,
    scale,
    strikethrough
  } = args

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

    if (strikethrough) {
      strikethroughTile(
        ctx,
        x - tileSize + padding,
        y - tileSize + padding,
        tileSize - padding,
        {
          top,
          left,
          topLeft
        }
      )
    }
  } else if (top && left && topLeft) {
    // connected everywhere: it's a square
    ctx.fillRect(
      x - tileSize - offset,
      y - tileSize - offset,
      tileSize + offset,
      tileSize + offset
    )

    if (strikethrough) {
      strikethroughTile(
        ctx,
        x - tileSize - offset,
        y - tileSize - offset,
        tileSize + offset,
        {
          top,
          left,
          topLeft
        }
      )
    }
  } else {
    if (left) {
      // connected left: it's a rectangle
      ctx.fillRect(
        x - tileSize - offset,
        y - tileSize + padding,
        tileSize + offset,
        tileSize - padding
      )
      if (strikethrough) {
        strikethroughTile(
          ctx,
          x - tileSize - offset,
          y - tileSize + padding,
          tileSize + offset,
          {
            top,
            left,
            topLeft
          }
        )
      }
    }
    if (top) {
      // connected top: it's a rectangle
      ctx.fillRect(
        x - tileSize + padding,
        y - tileSize - offset,
        tileSize - padding,
        tileSize + offset
      )
      if (strikethrough) {
        strikethroughTile(
          ctx,
          x - tileSize + padding,
          y - tileSize - offset,
          tileSize - padding,
          {
            top,
            left,
            topLeft
          }
        )
      }
    }
  }
}
