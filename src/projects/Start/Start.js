import React from 'react'
import Sketch from '../../components/Sketch'
import Colors from '../../utlis/Colors'
import { SETTINGS } from './settings'

const Start = () => {
  let colors
  let p
  let counter = 1
  let x = SETTINGS.WIDTH / 2
  let y = SETTINGS.HEIGHT / 2

  const setup = (p5, canvasParentRef) => {
    p = p5

    const { WIDTH, HEIGHT, COLORS } = SETTINGS
    colors = new Colors(p, COLORS, '\n', 1)

    p.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
  }

  const draw = () => {
    p.background(colors.hexColors[0])

    p.push()
    p.fill(colors.hexColors[1])
    p.ellipse(x, y, 50, 50)
    p.pop()

    x += p.sin(counter) * 5
    y += p.cos(counter) * 5

    counter += 0.1
  }

  return <Sketch setup={setup} draw={draw} />
}

export default Start
