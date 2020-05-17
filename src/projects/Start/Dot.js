import p5 from 'p5'

class Dot {
  constructor(p, radius, index, colors, count, speed) {
    const r = p.random(p.TWO_PI)
    const x = p.width / 2 + p.sin(r) * radius
    const y = p.height / 2 + p.cos(r) * radius
    this.p = p
    this.pos = p.createVector(x, y)
    this.prev = p.createVector(x, y)
    this.color = p.color(255)
    this.deadCount = 0
    this.radius = radius
    this.colors = colors
    this.index = index
    this.count = count
    this.speed = speed
  }

  update(noize) {
    this.v = p5.Vector.fromAngle(
      noize * this.p.TWO_PI + this.deadCount * this.p.PI
    )
    this.v.setMag(this.speed)
    this.color = this.colors[this.index]
    this.prev = this.pos.copy()
    this.pos = this.pos.add(this.v)

    if (
      this.p.dist(this.p.width / 2, this.p.height / 2, this.pos.x, this.pos.y) >
      this.radius + 2
    ) {
      this.deadCount += 1
    }
  }

  draw() {
    if (
      this.p.dist(this.p.width / 2, this.p.height / 2, this.pos.x, this.pos.y) >
        this.radius ||
      this.p.dist(
        this.p.width / 2,
        this.p.height / 2,
        this.prev.x,
        this.prev.y
      ) > this.radius
    ) {
      return
    }

    this.p.strokeWeight(1)
    this.p.stroke(this.color)
    this.p.line(this.prev.x, this.prev.y, this.pos.x, this.pos.y)
  }
}

export default Dot
