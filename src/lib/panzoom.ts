/*
  The following code was taken from https://github.com/dy/pan-zoom
  and modified a bit to allow disposing the event listeners
*/

import * as Impetus from 'impetus'
import * as wheel from 'mouse-wheel'
import * as touchPinch from 'touch-pinch'
import * as position from 'touch-position'

type PanZoomEventType = 'mouse' | 'touch'

type PanZoomEvent = {
  target: HTMLElement
  type: PanZoomEventType
  dx: number
  dy: number
  dz: number
  x: number
  y: number
  x0: number
  y0: number
}

export function panzoom(target: HTMLElement, cb: (e: PanZoomEvent) => void) {
  //enable panning
  let pos = position.emitter({
    element: target
  })

  let initX = 0
  let initY = 0
  let init = true

  const initListener = () => (init = true)

  target.addEventListener('mousedown', initListener)
  target.addEventListener('touchstart', initListener)

  let lastY = 0
  let lastX = 0
  const impetus = new Impetus({
    source: target,
    update: (x, y) => {
      if (init) {
        init = false
        initX = pos[0]
        initY = pos[1]
      }

      let e: PanZoomEvent = {
        target,
        type: 'mouse',
        dx: x - lastX,
        dy: y - lastY,
        dz: 0,
        x: pos[0],
        y: pos[1],
        x0: initX,
        y0: initY
      }

      lastX = x
      lastY = y
      cb(e)
    },
    multiplier: 1,
    friction: 0.75
  })

  //enable zooming
  const wheelListener = wheel(target, (_dx, dy, _dz, e) => {
    e.preventDefault()
    cb({
      target,
      type: 'mouse',
      dx: 0,
      dy: 0,
      dz: dy,
      x: pos[0],
      y: pos[1],
      x0: pos[0],
      y0: pos[1]
    })
  })

  //mobile pinch zoom
  let pinch = touchPinch(target)
  let mult = 2
  let initialCoords: number[] | null = null

  pinch.on('start', _curr => {
    let [f1, f2] = pinch.fingers

    initialCoords = [
      f2!.position[0] * 0.5 + f1!.position[0] * 0.5,
      f2!.position[1] * 0.5 + f1!.position[1] * 0.5
    ]

    impetus && impetus.pause()
  })
  pinch.on('end', () => {
    if (!initialCoords) return

    initialCoords = null

    impetus && impetus.resume()
  })
  pinch.on('change', (curr, prev) => {
    if (!pinch.pinching || !initialCoords) return

    cb({
      target,
      type: 'touch',
      dx: 0,
      dy: 0,
      dz: -(curr - prev) * mult,
      x: initialCoords[0],
      y: initialCoords[1],
      x0: initialCoords[0],
      y0: initialCoords[0]
    })
  })

  return function dispose() {
    impetus.destroy()
    pos.dispose()
    pinch.removeAllListeners()
    target.removeEventListener('wheel', wheelListener)
    target.removeEventListener('mousedown', initListener)
    target.removeEventListener('touchstart', initListener)
  }
}
