import React from 'react'
import Sketch from '../../components/Sketch'
import { SETTINGS } from './settings'
import Colors from '../../utlis/Colors'
import { makeDottedPolygon } from '../../utlis/helpers'

const Reciprocality = () => {
  let center
  let colors
  let lerpColors
  let counter = 0
  const count = 100

  const setup = (p, canvasParentRef) => {
    const { WIDTH, HEIGHT, COLORS, PIXEL_DENSITY } = SETTINGS
    p.angleMode(p.DEGREES)
    p.rectMode(p.CENTER)
    p.pixelDensity(PIXEL_DENSITY)

    colors = new Colors(p, COLORS, '\n', 1)
    lerpColors = colors.getLerpColors(count)
    p.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
    center = p.createVector(p.width / 2, p.height / 2)
    p.background(0)
  }

  const draw = p => {
    p.background(0, 10)

    counter += 2
    const circle = makeDottedPolygon(
      p,
      p.cos(counter / 4) * 150,
      p.sin(counter / 2) * 150,
      count,
      count,
      50 + p.sin(counter / 5) * 150,
      counter
    )
    const circle2 = makeDottedPolygon(
      p,
      p.cos(counter / 4) * 150,
      -p.sin(counter / 2) * 150,
      count,
      count,
      50 + p.cos(counter / 5) * 150,
      -counter
    )

    p.push()
    p.translate(center.x, center.y)
    p.rotate(p.sin(counter / 4) * 100)

    const a = 360 / count

    for (let i = 0; i < circle.length; i += 1) {
      const t = i * a
      const { x, y } = circle[i]
      const { x: x1, y: y1 } = circle[(i + circle.length / 0.5) % circle.length]
      const { x: x4, y: y4 } = circle2[
        (i + circle.length / 20) % circle2.length
      ]

      // const l = Math.abs(p.sin(counter * t))
      // const l2 = Math.abs(p.cos(counter * t))
      // const n = p.cos(counter / 2) * p.sin(counter * 2) * 360
      const m = Math.abs(p.sin(counter)) * 10
      const n = 2
      // const m = p.sin(t ** n) ** 2
      const l = Math.sqrt(0.000001 / (n ** t) ** p.cos(t * m ** i))
      const l2 = p.cos((0.0001 / Math.abs(n ** t)) ** m) ** m * p.sin(i)
      //
      const x2 = p.lerp(x, x1, l)
      const y2 = p.lerp(y, y1, l)

      const x3 = p.lerp(x, x4, l2)
      const y3 = p.lerp(y, y4, l2)

      p.stroke(0)
      p.strokeWeight(1)
      p.fill(lerpColors[Math.round(i + counter / 100) % lerpColors.length])

      const l3 = p.sin((counter / 100) * i) / 2
      const l4 = p.cos((counter / 100) * i) / 2

      const zx1 = p.lerp(x3, x4, l3)
      const zy1 = p.lerp(y3, y4, l3)
      const zx2 = p.lerp(x2, x4, l4)
      const zy2 = p.lerp(y2, y4, l4)

      const zx3 = p.lerp(zx1, zx2, l / 2)
      const zy3 = p.lerp(zy1, zy2, l3 / 2)
      const zx4 = p.lerp(zx3, x4, l2 / 2)
      const zy4 = p.lerp(zy3, y4, l4 / 2)

      const size = 4

      p.push()
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx1, zy1, size / 2)
      p.pop()

      p.push()
      p.rotate(180)
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx1, zy1, size / 2)
      p.pop()

      p.push()
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx2, zy2, size / 2)
      p.pop()

      p.push()
      p.rotate(180)
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx2, zy2, size / 2)
      p.pop()

      p.push()
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx3, zy3, size / 2)
      p.pop()

      p.push()
      p.rotate(180)
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx3, zy3, size / 2)
      p.pop()

      p.push()
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx4, zy4, size / 2)
      p.pop()

      p.push()
      p.rotate(180)
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx4, zy4, size / 2)
      p.pop()

      p.push()
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx2, zy2, size / 2)
      p.pop()

      p.push()
      p.rotate(180)
      p.stroke(lerpColors[(lerpColors.length - 1 - i) % lerpColors.length])
      p.circle(zx2, zy2, size / 2)
      p.pop()

      p.push()
      p.noStroke()
      p.circle(x2, y2, size)
      p.pop()

      p.push()
      p.rotate(180)
      p.noStroke()
      p.circle(x2, y2, size)
      p.pop()

      p.push()
      p.noStroke()
      p.circle(x3, y3, size)
      p.pop()

      p.push()
      p.rotate(180)
      p.noStroke()
      p.circle(x3, y3, size)
      p.pop()

      p.push()
      p.noStroke()
      p.circle(x4, y4, size)
      p.pop()

      p.push()
      p.rotate(180)
      p.noStroke()
      p.circle(x4, y4, size)
      p.pop()
    }

    p.pop()
  }

  return <Sketch setup={setup} draw={draw} />
}

export default Reciprocality
