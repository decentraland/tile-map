export = wheel
declare const wheel: (
  target: HTMLElement,
  cb: (dx: number, dy: number, dz: number, e: MouseWheelEvent) => void
) => (e: MouseWheelEvent) => void
