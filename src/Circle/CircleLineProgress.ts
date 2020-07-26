import { Utility } from '../Types/Types'

class CircleLineProgress {
  el: HTMLElement

  ctx: CanvasRenderingContext2D

  options: Utility.OptionsProgress

  constructor(
    el: HTMLElement,
    ctx: CanvasRenderingContext2D,
    options: Utility.OptionsProgress
  ) {
    this.el = el
    this.ctx = ctx
    this.options = options
  }

  init() {
    console.log(this.options)
    this.drawCircle('#e6e6e6', Number(this.options.lineWidth), 100, 'round')

    const progressContainer = document.querySelector('.progresscv-container')

    if (progressContainer.getAttribute('data-progress-loader') === 'true') {
      this.effectProgressLoader(this.ctx, this.options.color)
    } else {
      this.drawCircle(
        this.options.color,
        Number(this.options.lineWidth),
        Number(this.options.percent),
        'round'
      )
      this.drawProgressNumber(Number(this.options.percent))
    }
  }

  /**
   * Draw a circle with Canvas
   * @param {CanvasRenderingContext2D} ctx - Context canvas
   * @param {string} color - Color for stroke
   * @param {number} lineWidth - Width of line
   * @param {string} percent - Percent progress
   * @param {LineCapType} lineCap - One of the type linecap canvas
   */
  drawCircle(
    color: string,
    lineWidth: number,
    percent: number,
    lineCap: CanvasLineCap
  ) {
    const radius =
      (Number(this.options.size) - Number(this.options.lineWidth)) / 2

    this.ctx.beginPath()
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2 * (percent / 100), false)
    this.ctx.strokeStyle = color
    this.ctx.lineCap = lineCap // butt, round or square
    this.ctx.lineWidth = lineWidth
    this.ctx.stroke()
  }

  /**
   * Incremental effect for Circle && Number
   * @param {CanvasRenderingContext2D} ctx - Context canvas
   * @param {number|string} percent - Percent
   */
  effectProgressLoader(ctx: CanvasRenderingContext2D, color = '#300399') {
    let counterPercent = 0
    const drawProgress = () => {
      counterPercent = Math.round(counterPercent + Utility.MEDIUM_SPEED)
      this.drawCircle(
        color,
        Number(this.options.lineWidth),
        counterPercent,
        'round'
      )
      this.drawProgressNumber(counterPercent)
      if (counterPercent < Number(this.options.percent)) {
        requestAnimationFrame(drawProgress)
      }
    }
    requestAnimationFrame(drawProgress)
  }

  drawProgressNumber(percent: number | string) {
    /** Save state to Stack ( translate(...) && rotate(...) after draw Cirle progress ) */
    this.ctx.save()

    this.ctx.beginPath()
    this.ctx.font = '30px sans-serif'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.rotate((1 / 2) * Math.PI)
    this.ctx.clearRect(-50, -50, 100, 100) // Fixed -------------------------
    this.ctx.fillText(`${percent}%`, 0, 0)

    this.ctx.restore() // Get state from State Stack
  }
}

export default CircleLineProgress
