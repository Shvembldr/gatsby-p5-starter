import React from 'react'
import Sketch from '../../components/Sketch'
import Colors from '../../utlis/Colors'
import { SETTINGS } from './settings'
import Dot from './Dot'

const Start = () => {
  let colors
  const dots = []
  const factor = 0.01
  const speed = 1
  const count = 2000
  const radius = SETTINGS.WIDTH / 2

  const setup = (p, canvasParentRef) => {
    const { WIDTH, HEIGHT, COLORS } = SETTINGS
    colors = new Colors(p, COLORS, '\n', 1)
    const lerpColors = colors.getLerpColors(count)
    p.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
    p.background(255)
    p.noiseDetail(1)
    p.strokeWeight(1)

    for (let i = 0; i < count; i += 1) {
      dots.push(new Dot(p, radius, i, lerpColors, count, speed))
    }
  }

  const draw = p => {
    for (let i = 0; i < dots.length; i += 1) {
      const dot = dots[i]
      const n = p.noise(dot.pos.x * factor, dot.pos.y * factor)
      dot.update(n)
      dot.draw(n)
    }
  }

  return <Sketch setup={setup} draw={draw} />
}

export default Start
