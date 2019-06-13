import { on } from 'cluster'

export = pinch

type Finger = {
  position: number[]
  touch: TouchEvent
}

declare const pinch: (
  target: HTMLElement
) => {
  on(event: 'start', callback: (distance: number) => void): void
  on(event: 'end', callback: () => void): void
  on(
    event: 'change',
    callback: (distance: number, prevDistance: number) => void
  ): void
  on(
    event: 'place',
    callback: (newTouch: TouchEvent, otherTouch?: TouchEvent) => void
  ): void
  on(
    event: 'lift',
    callback: (removedTouch: TouchEvent, otherTouch?: TouchEvent) => void
  ): void
  removeAllListeners(): void
  pinching: boolean
  fingers: (Finger | null)[]
  indexOfTouch(touchEvent: TouchEvent): number
}
