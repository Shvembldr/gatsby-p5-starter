import React from 'react'
import { random, sample } from 'lodash'
import Sketch from '../../components/Sketch'
import Colors from '../../utlis/Colors'
import { makeDottedPolygon } from '../../utlis/helpers'
import { SETTINGS } from './settings'

const Frwrd = () => {
  let center
  let colors
  let ctx
  let p
  const count = 100

  const setup = (p5, canvasParentRef) => {
    const { WIDTH, HEIGHT, COLORS, PIXEL_DENSITY } = SETTINGS
    p = p5
    ctx = p.drawingContext
    p.angleMode(p.DEGREES)
    p.pixelDensity(PIXEL_DENSITY)

    colors = new Colors(p, COLORS, '\n', 1)

    p.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
    center = p.createVector(p.width / 2, p.height / 2)
    p.background(255)
    generate()
  }

  const generate = () => {
    const backgroundColors = colors.getLerpColors(count, true, true, 5)
    p.background(255)
    p.push()
    p.noStroke()
    p.fill(sample(backgroundColors))
    p.rect(center.x, center.y, p.width, p.height)
    p.pop()

    const circleCount = random(3, 7)
    const startSize = random(300, 400)
    for (let i = 0; i < circleCount; i += 1) {
      p.noFill()
      ctx.shadowColor = sample(colors.rgbaColors)
      ctx.shadowBlur = 50
      p.stroke(sample(colors.rgbaColors))
      p.circle(
        center.x,
        center.y,
        startSize - i * (startSize / (circleCount + 3))
      )
      thing2(
        center.x,
        center.y,
        startSize - i * (startSize / (circleCount + 3)),
        180 + i * (360 / circleCount)
      )
      thing2(
        center.x,
        center.y,
        startSize - i * (startSize / (circleCount + 3)),
        i * (360 / circleCount)
      )
    }
    thing(center.x, center.y, 200, 0)
    thing3(center.x, center.y, 40, 0)
  }

  const thing = (posX, posY, size, angle) => {
    const a = random(360)
    const triangle = makeDottedPolygon(p, 0, 0, 100, 3, size, a)
    const triangleCon = makeDottedPolygon(p, 0, 0, 3, 3, size, a)
    const triangle2 = makeDottedPolygon(p, 0, 0, 100, 3, size / 4, random(360))

    p.push()
    p.translate(posX, posY)
    p.rotate(angle)

    p.push()
    p.beginShape()
    p.noFill()
    ctx.shadowColor = sample(colors.rgbaColors)
    ctx.shadowBlur = 50
    p.stroke(sample(colors.rgbaColors))
    for (let i = 0; i < triangleCon.length; i += 1) {
      p.vertex(triangleCon[i].x, triangleCon[i].y)
    }
    p.endShape(p.CLOSE)
    p.pop()

    const c = colors.getLerpColors(triangle.length, true)
    for (let i = 0; i < triangle.length; i += 1) {
      p.push()
      p.noStroke()
      ctx.shadowColor = c[(i + 10) % c.length]
      ctx.shadowBlur = 20
      p.fill(c[i])
      p.beginShape()
      p.vertex(triangle[i].x, triangle[i].y)
      p.vertex(
        triangle2[(i + 20) % triangle2.length].x,
        triangle2[(i + 20) % triangle2.length].y
      )
      p.vertex(
        triangle[(i + 1) % triangle.length].x,
        triangle[(i + 1) % triangle.length].y
      )
      p.endShape(p.CLOSE)
      p.pop()
    }
    p.pop()
  }

  const thing2 = (posX, posY, size, angle) => {
    const circle = makeDottedPolygon(p, 0, 0, 100, 100, size, 0)
    const circle2 = makeDottedPolygon(p, 0, 0, 100, 100, size * 0.9, 0)
    p.push()
    p.translate(posX, posY)
    p.rotate(angle)
    const c = colors.getLerpColors(circle.length / 2, true)
    for (let i = 0; i < circle.length / 2; i += 1) {
      p.push()
      p.noStroke()
      ctx.shadowColor = c[(i + 10) % c.length]
      ctx.shadowBlur = 20
      p.fill(c[i])
      p.beginShape()
      p.vertex(circle[i].x, circle[i].y)
      p.vertex(
        circle2[(i + 10) % circle2.length].x,
        circle2[(i + 10) % circle2.length].y
      )
      p.vertex(
        circle[(i + 1) % circle.length].x,
        circle[(i + 1) % circle.length].y
      )
      p.endShape(p.CLOSE)
      p.pop()
    }
    p.pop()
  }

  const thing3 = (posX, posY, size, angle) => {
    const circle = makeDottedPolygon(p, 0, 0, 50, 50, size, random(360))
    const innerRect = makeDottedPolygon(p, 0, 0, 4, 4, size, random(360))
    const bigRect = makeDottedPolygon(p, 0, 0, 4, 4, 580, random(360))
    p.push()
    p.translate(posX, posY)
    const c = colors.getLerpColors(circle.length, true)
    p.rotate(angle)

    for (let i = 0; i < bigRect.length; i += 1) {
      p.push()
      p.stroke(sample(colors.rgbaColors))
      p.strokeWeight(1)
      ctx.shadowColor = c[(i + 10) % c.length]
      ctx.shadowBlur = 20
      p.line(bigRect[i].x, bigRect[i].y, innerRect[i].x, innerRect[i].y)
      p.pop()
    }

    for (let i = 0; i < circle.length; i += 1) {
      p.push()
      p.noStroke()
      ctx.shadowColor = c[(i + 10) % c.length]
      ctx.shadowBlur = 20
      p.fill(c[i])
      p.beginShape()
      p.vertex(circle[i].x, circle[i].y)
      p.vertex(0, 0)
      p.vertex(
        circle[(i + 1) % circle.length].x,
        circle[(i + 1) % circle.length].y
      )
      p.endShape(p.CLOSE)
      p.pop()
    }
    p.pop()
  }

  const keyReleased = () => {
    if (p.key === 's' || p.key === 'S')
      p.saveCanvas(new Date().toDateString(), SETTINGS.FILE_FORMAT)
    if (p.key === 'a' || p.key === 'A') generate()
  }

  return <Sketch setup={setup} keyReleased={keyReleased} />
}

export default Frwrd
