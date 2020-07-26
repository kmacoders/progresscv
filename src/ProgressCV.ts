import CircleLineProgress from './Circle/CircleLineProgress'
import { Utility } from './Types/Types'

export class ProgressCV {
  el: HTMLElement

  options: Utility.OptionsProgress

  canvas: HTMLCanvasElement

  ctx: CanvasRenderingContext2D

  constructor(el: HTMLElement, options?: Utility.OptionsProgress) {
    this.el = el
    this.options = (options === undefined && {
      type: el.getAttribute('data-progress-type') || 'circleLineProgress',
      percent: el.getAttribute('data-percent') || 25,
      size: el.getAttribute('data-size') || 220,
      lineWidth: el.getAttribute('data-line') || 15,
      rotate: el.getAttribute('data-rotate') || 0,
      color: el.getAttribute('data-color-progress') || '#300399',
    }) || {
      type:
        options.type ||
        el.getAttribute('data-progress-type') ||
        'circleLineProgress',
      percent: options.percent || el.getAttribute('data-percent') || 25,
      size: options.size || el.getAttribute('data-size') || 220,
      lineWidth: options.lineWidth || el.getAttribute('data-line') || 15,
      rotate: options.rotate || el.getAttribute('data-rotate') || 0,
      color:
        options.color || el.getAttribute('data-color-progress') || '#300399',
    }
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  init() {
    this.initializationCanvas()
    this.changePostionCanvas()

    switch (this.options.type) {
      case 'circleLineProgress': {
        // Create Circle Line Progress
        const pgcv = new CircleLineProgress(this.el, this.ctx, this.options)
        pgcv.init()
        break
      }

      default: {
        console.log('NO')
        break
      }
    }
  }

  initializationCanvas() {
    this.canvas.width = Number(this.options.size)
    this.canvas.height = Number(this.options.size)
    this.el.appendChild(this.canvas)
  }

  changePostionCanvas() {
    /** Replace center (0,0) => another position */
    this.ctx.translate(
      Number(this.options.size) / 2,
      Number(this.options.size) / 2
    )
    /** The circle is always drawn from the 15h (1.5PI) position.
     *  Rotate -PI/2 + ( user's angle ) => Draw circle from 0h (0PI) position
     */
    this.ctx.rotate((-1 / 2 + Number(this.options.rotate) / 180) * Math.PI)
  }
}
