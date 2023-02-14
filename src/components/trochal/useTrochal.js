/*
 * @Description: useTrochal
 * @Author: wsy
 * @Date: 2023-02-13 18:18:32
 * @LastEditTime: 2023-02-14 11:10:26
 * @LastEditors: wsy
 */

import Konva from 'konva'
import { ref, onMounted, h, defineComponent } from 'vue'

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

  /**
   * The angle of the inner sector of the circle.
   * @type {number}
   */
  innerSectorAngle = 10

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
    const innerSectorSize = Math.floor(360 / this.innerSectorAngle)
    const offsetAngle = (this.innerSectorAngle * this.data.length) / 2
    const remainder = innerSectorSize % this.data.length
    const multiple = Math.floor(innerSectorSize / this.data.length)
    this.data = this.normalizeData(multiple, remainder)

    for (let i = 0; i < innerSectorSize; i++) {
      const sector = this.createSector({
        angle: this.innerSectorAngle,
        rotation: i * this.innerSectorAngle - offsetAngle
      })
      this.selectLayer('inner').add(sector)
      if (this.data[i]) {
        const text = this.createText({
          angle: this.innerSectorAngle,
          rotation: i * this.innerSectorAngle + this.innerSectorAngle / 3 - offsetAngle,
          value: this.data[i].name
        })
        this.selectLayer('inner').add(text)
      }
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
  selectLayer(name) {
    return this.layers.get(name)
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

  /**
   * Creates a text object for the given parameters.
   * @param {number} angle - the angle of the text object.
   * @param {number} rotation - the rotation of the text object.
   * @param {string} value - the value of the text object.
   * @returns {Konva.Text} - the text object.
   */
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
  normalizeData(multiple, remainder) {
    const dataLength = this.data.length

    const arr = Array.from({ length: (multiple - 1) * dataLength })
      .map((item, index) => this.data[index % dataLength])
      .concat(Array.from({ length: remainder }))

    const chunks = chunk(arr, dataLength)
    if (remainder) {
      const remainderArr = chunks.pop()
      this.insertArr(chunks[Math.floor(chunks.length / 2)], remainderArr)
    }
    return this.data.concat(
      chunks.reduce((acc, chunk) => {
        return acc.concat(chunk)
      }, [])
    )
  }
  insertArr(arr, items) {
    const middle = Math.floor(arr.length / 2)
    arr.splice(middle, 0, ...items)
    return arr
  }
}
function chunk(arr, size) {
  const chunked = []
  for (let element of arr) {
    const last = chunked[chunked.length - 1]
    if (!last || last.length === size) {
      chunked.push([element])
    } else {
      last.push(element)
    }
  }
  return chunked
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

export default defineComponent({
  name: 'Trochal',
  props: {
    width: {
      type: Number,
      default() {
        return 1920
      }
    },
    height: {
      type: Number,
      default() {
        return 1080
      }
    },
    data: {
      type: Array,
      default() {
        return [
          { name: '云网能力', value: 10 },
          { name: '云服务', value: 10 },
          { name: '大数据', value: 10 },
          { name: '人工智能', value: 10 },
          { name: '物联网', value: 10 },
          { name: '视联网', value: 10 },
          { name: '网络信息安全', value: 10 },
          { name: '企业应用与服务', value: 10 },
          { name: '视频服务', value: 10 },
          { name: '安全', value: 10 },
          { name: '行业', value: 10 },
          { name: '其他', value: 10 }
        ]
      }
    }
  },
  setup(props) {
    const container = ref(null)
    useTrochal(container, props)
    return () =>
      h('div', {
        style: {
          width: `${props.width}px`,
          height: `${props.height}px`
        },
        ref: container
      })
  }
})
