import { random, shuffle as lodashShuffle } from 'lodash'

class Colors {
  constructor(p, colorString, divider, alpha) {
    this.p = p
    this.hexColors = colorString.split(divider)
    this.rgbColors = this.hexColors.map(hex => this.hexToRgb(hex))
    this.rgbaColors = this.rgbColors.map(rgb => `rgba(${rgb}, ${alpha})`)
  }

  hexToRgb = hex =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
      )
      .substring(1)
      .match(/.{2}/g)
      .map(x => parseInt(x, 16))

  getLerpColors = (size, shuffle, addVoid, voidAmount, black) => {
    const voidColors = new Array(voidAmount)
      .fill(null)
      .map(() => (black ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'))
    const newColors = shuffle
      ? lodashShuffle([...this.rgbaColors, ...voidColors])
      : [...this.rgbaColors, ...voidColors]
    const arr = []
    const segment = Math.ceil(size / newColors.length)
    const l = 1 / segment
    for (let i = 0; i < newColors.length; i += 1) {
      for (let j = 0; j < segment; j += 1) {
        const color1 = this.p.color(newColors[i])
        const color2 = this.p.color(newColors[(i + 1) % newColors.length])
        arr.push(this.p.lerpColor(color1, color2, (j + 1) * l))
      }
    }
    return arr
  }
}

export default Colors
