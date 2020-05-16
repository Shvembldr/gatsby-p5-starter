export const makeRightPolygon = (
  p,
  posX,
  posY,
  vertexCount,
  size,
  startAngle
) => {
  const dots = []
  for (let i = 0; i < vertexCount; i += 1) {
    dots.push({
      x: posX + size * p.cos(startAngle),
      y: posY + size * p.sin(startAngle),
    })
    startAngle += 360 / vertexCount
  }
  return dots
}

export const makeDottedPolygon = (
  p,
  centerX,
  centerY,
  pointsCount,
  vertexCount,
  size,
  startAngle
) => {
  const figure = makeRightPolygon(
    p,
    centerX,
    centerY,
    vertexCount,
    size,
    startAngle
  )

  const figurePointsCount = pointsCount / vertexCount

  const arr = []

  for (let i = 0; i < vertexCount; i += 1) {
    for (let j = 0; j < figurePointsCount; j += 1) {
      const x = p.lerp(
        figure[i].x,
        figure[(i + 1) % figure.length].x,
        j / figurePointsCount
      )
      const y = p.lerp(
        figure[i].y,
        figure[(i + 1) % figure.length].y,
        j / figurePointsCount
      )
      arr.push({ x, y })
    }
  }
  return arr
}
