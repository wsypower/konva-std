/*
 * @Description: useTrochal
 * @Author: wsy
 * @Date: 2023-02-13 18:18:32
 * @LastEditTime: 2023-02-13 22:24:16
 * @LastEditors: wsy
 */

import Konva from 'konva'

class Trochal {
  width = 0
  height = 0

  /**
   * A map of layer names to layer objects.
   * @type {Map<string, Layer>}
   */
  layers = new Map()

  /**
   * The x coordinate of the origin of the filter.
   * @type {number}
   */
  originX = 550

  /**
   * The y-coordinate of the origin of the filter.
   * @type {number}
   */
  originY = 550

  /**
   * The radius of the circle that the filter is applied to.
   * @type {number}
   */
  radius = 500
  /**
   * The color to fill the page with.
   * @type {string}
   */
  fill = '#75A99D'

  /**
   * The stroke color of the filter.
   * @type {string}
   */
  stroke = 'black'

  /**
   * The width of the stroke used to draw the border around the filter.
   * @type {number}
   */
  strokeWidth = 4

  data = []

  /**
   * Initializes the stage and layers for the filter.
   * @param {HTMLElement} container - the container for the filter.
   * @returns None
   */
  initStage(container) {
    this.stage = this.createStage(container)
    this.createLayer('inner')
    this.createLayer('outer')
  }
  /**
   * Draws the filter.
   * @returns None
   */
  draw() {
    this.drawInner()
  }

  /**
   * Draws the inner circle of the pie chart.
   * @returns None
   */
  drawInner() {
    this.drawInnerCircle()
    const sectorSize = this.data.length
    const supplementaryAngle = 70
    const sectorAngle = Math.floor((supplementaryAngle * 2) / sectorSize)
    for (let i = 0; i < sectorSize; i++) {
      const sector = this.createSector({
        angle: sectorAngle,
        rotation: i * sectorAngle - supplementaryAngle
      })
      const text = this.createText({
        angle: sectorAngle,
        rotation: i * sectorAngle + sectorAngle / 3 - supplementaryAngle,
        value: this.data[i].name
      })
      this.layers.get('inner').add(sector)
      this.layers.get('inner').add(text)
    }
  }

  /**
   * Draws the inner circle of the filter.
   * @returns None
   */
  drawInnerCircle() {
    let layer = this.layers.get('inner')
    const circle = this.createCircle()
    layer.add(circle)
    return circle
  }

  /**
   * Draws the inner sector of the wheel.
   * @returns None
   */
  drawInnerSector() {
    let layer = this.layers.get('inner')
    let sector = this.createSector({
      angle: 60,
      rotation: 0
    })
    layer.add(sector)
    return sector
  }

  /**
   * Creates a new Konva stage.
   * @param {string} container - the id of the container to create the stage in.
   * @returns {Konva.Stage} - the new stage.
   */
  createStage(container) {
    return new Konva.Stage({
      container: container,
      width: this.width,
      height: this.height
    })
  }

  /**
   * Creates a new layer and adds it to the stage.
   * @param {string} name - the name of the layer.
   * @returns {Konva.Layer} - the layer object.
   */
  createLayer(name) {
    let layer = new Konva.Layer()
    this.layers.set(name, layer)
    this.stage.add(layer)
    return layer
  }

  /**
   * Creates a Konva circle object.
   * @param {object} [options] - The options for the Konva circle object.
   * @param {number} [options.x=this.originX] - The x coordinate of the circle.
   * @param {number} [options.y=this.originY] - The y coordinate of the circle.
   * @param {number} [options.radius=this.radius] - The radius of the circle.
   * @param {string} [options.fill=this.fill] - The fill color of the circle.
   * @param {string} [options.stroke=this.stroke]
   */
  createCircle({
    x = this.originX,
    y = this.originY,
    radius = this.radius,
    fill = this.fill,
    stroke = this.stroke,
    strokeWidth = this.strokeWidth
  } = {}) {
    return new Konva.Circle({
      x,
      y,
      radius,
      fill,
      stroke,
      strokeWidth
    })
  }

  /**
   * Creates a sector object for the given sector angle and rotation.
   * @param {number} angle - the angle of the sector.
   * @param {number} rotation - the rotation of the sector.
   * @returns {Konva.Wedge} - the sector object.
   */
  createSector({ angle, rotation }) {
    const { radius, originX: x, originY: y } = this
    return new Konva.Wedge({
      x,
      y,
      radius,
      angle,
      fill: 'blue',
      stroke: 'red',
      rotation
    })
  }
  createText({ angle, rotation, value }) {
    const { originX: x, originY: y, radius } = this
    return new Konva.Text({
      x,
      y,
      text: value,
      fontSize: 24,
      align: 'center',
      padding: 0,
      fill: 'white',
      strokeWidth: 3,
      offsetX: -radius * 0.6,
      rotation,
      angle
    })
  }
}

/**
 * Extends the target object with the properties of the origin object.
 * @param {object} origin - the object to copy the properties from
 * @param {object} target - the object to copy the properties to
 * @returns {object} the target object with the properties of the origin object.
 */
function extend(origin, target) {
  return Object.assign(origin, target)
}

/**
 * Create a new Trochal instance.
 * @param {HTMLElement} container - The container element for the trochal instance.
 * @param {TrochalOptions} [options] - The options for the trochal instance.
 * @returns {Trochal} - A new Trochal instance.
 */
function createTrochal(container, options) {
  const layout = unref(container)
  const trochal = new Trochal()
  extend(trochal, options)
  trochal.initStage(layout)
  return trochal
}

function useTrochal(container, options) {
  const trochal = ref(null)
  onMounted(() => {
    const trochal = createTrochal(container, options)
    trochal.draw()
  })
  return trochal
}

export default useTrochal
