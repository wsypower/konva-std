/*
 * @Description: useTrochal
 * @Author: wsy
 * @Date: 2023-02-13 18:18:32
 * @LastEditTime: 2023-02-13 19:02:21
 * @LastEditors: wsy
 */

import Konva from 'konva'
import { useElementSize } from '@vueuse/core'

class Trochal {
  width = 0
  height = 0
  layers = new Map()
  constructor(container) {
    this.stage = this.createStage(container)
    this.createLayer('inner')
    this.createLayer('outer')
  }
  draw() {
    this.drawInnerCircle()
  }
  drawInnerCircle() {
    let layer = this.layers.get('inner')
    let circle = this.circle(250, 250, 100, 'red', 'black', 4)
    layer.add(circle)
  }
  createStage(container) {
    return new Konva.Stage({
      container: container,
      width: 960,
      height: 1080
    })
  }
  createLayer(name) {
    let layer = new Konva.Layer()
    this.layers.set(name, layer)
    this.stage.add(layer)
    return layer
  }
  circle(x, y, radius, fill, stroke, strokeWidth) {
    return new Konva.Circle({
      x,
      y,
      radius,
      fill,
      stroke,
      strokeWidth
    })
  }
}

function createTrochal(container) {
  const { width, height } = useElementSize(container)
  const layout = unref(container)
  const trochal = new Trochal(layout)
  trochal.width = width
  trochal.height = height
  return trochal
}

function useTrochal(container) {
  const trochal = ref(null)
  onMounted(() => {
    const trochal = createTrochal(container)
    trochal.draw()
  })
  return trochal
}

export default useTrochal
