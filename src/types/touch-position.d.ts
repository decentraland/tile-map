export = position
declare const position: {
  emitter(args: { element: HTMLElement }): number[] & { dispose: () => void }
}
