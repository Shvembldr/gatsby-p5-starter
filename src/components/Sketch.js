import React, { useEffect, useRef } from 'react'
import P5 from 'p5'

const Sketch = ({ setup, ...props }) => {
  const canvasRef = useRef(null)
  const sketch = useRef(null)

  useEffect(() => {
    sketch.current = new P5(p => {
      p.setup = () => {
        setup(p, canvasRef.current)
      }
      const p5Events = [
        'draw',
        'windowResized',
        'preload',
        'mouseClicked',
        'doubleClicked',
        'mouseMoved',
        'mousePressed',
        'mouseWheel',
        'mouseDragged',
        'mouseReleased',
        'keyPressed',
        'keyReleased',
        'keyTyped',
        'touchStarted',
        'touchMoved',
        'touchEnded',
        'deviceMoved',
        'deviceTurned',
        'deviceShaken',
      ]
      p5Events.forEach(event => {
        if (props[event]) {
          p[event] = () => {
            props[event](p)
          }
        }
      })
    })

    return () => {
      sketch.current.remove()
    }
  }, [setup, props])

  return <div ref={canvasRef} />
}

export default Sketch
