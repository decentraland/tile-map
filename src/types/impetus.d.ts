export = impetus
declare const impetus: {
  new (args: {
    source: HTMLElement
    update: (x: number, y: number) => void
    multiplier: number
    friction: number
  }): {
    resume(): void
    pause(): void
    destroy(): void
  }
}
