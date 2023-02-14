/*
 * @Description: useTrochal
 * @Author: wsy
 * @Date: 2023-02-13 18:18:32
 * @LastEditTime: 2023-02-14 19:33:18
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
   * The color of the inner wedge of the filter.
   * @type {string}
   */
  innerWedgeFill = '#DADBDD'

  /**
   * The color of the inner wedge of the active fill.
   */
  innerWedgeActiveFill = '#BAC6DD'

  /**
   * The stroke color of the filter.
   * @type {string}
   */
  stroke = 'black'

  /**
   * The color of the inner wedge stroke.
   */
  innerwedgeStroke = 'red'

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

  startCurrent = 3

  startCurrentAngle = 0

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
      const angle = this.innerSectorAngle
      const rotation = i * this.innerSectorAngle - offsetAngle
      const id = `${i}-inner`
      const name = `${i}-inner-group`
      const idx = i
      this.createInnerGroup({
        angle,
        rotation,
        id,
        name,
        idx
      })
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
    let sector = this.createInnerSector({
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
    let layer = new Konva.Layer({
      x: this.originX,
      y: this.originY,
      offset: {
        x: this.originX,
        y: this.originY
      },
      name
    })
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
   * Creates a new group with the given id and name.
   * @param {string} id - the id of the group.
   * @param {string} name - the name of the group.
   * @returns {Konva.Group}
   */
  createGroup({ id, name }) {
    const group = new Konva.Group({ id, name })
    return group
  }

  /**
   * Create a group that contains a sector and text.
   * @param {number} angle - The angle of the sector.
   * @param {number} rotation - The rotation of the sector.
   * @param {string} id - The id of the group.
   * @param {string} name - The name of the group.
   * @param {number} idx - The index of the group.
   * @returns A group that contains a sector and text.
   */
  createInnerGroup({ angle, rotation, id, name, idx }) {
    const group = this.createGroup({ id, name })
    const layer = this.selectLayer('inner')
    const sector = this.createInnerSector({
      angle,
      rotation,
      name: `${id}-sector`,
      id: `${id}-sector`,
      idx
    })
    group.add(sector)
    if (this.data[idx]) {
      const text = this.createText({
        angle,
        rotation: rotation + angle / 3,
        value: this.data[idx].name,
        name: `${id}-sector`,
        id: `${id}-text`,
        idx
      })
      group.add(text)
    }
    this.selectLayer('inner').add(group)
    this.innerGroupAddEventer(group)
    if (idx === this.startCurrent) {
      layer.fire('setStartCurrent', { id: group.id() })
    }
    return group
  }

  innerGroupAddEventer(group) {
    const layer = this.selectLayer('inner')

    const wedge = group.getChildren((node) => node.getClassName() === 'Wedge').at(0)
    const text = group.getChildren((node) => node.getClassName() === 'Text').at(0)

    group.on('click', function () {
      layer.fire('resetFill', { wedgeId: wedge.id(), textId: text.id() })
      layer.fire('setActiveFill', { wedgeId: wedge.id(), textId: text.id() })
    })
  }

  /**
   * Creates a sector object for the given sector angle and rotation.
   * @param {number} angle - the angle of the sector.
   * @param {number} rotation - the rotation of the sector.
   * @returns {Konva.Wedge} - the sector object.
   */
  createInnerSector({ angle, rotation, id, name }) {
    const { radius, originX: x, originY: y } = this
    const layer = this.selectLayer('inner')
    const wedge = new Konva.Wedge({
      x,
      y,
      radius,
      angle,
      fill: this.innerWedgeFill,
      stroke: this.innerwedgeStroke,
      rotation,
      // listening: true,
      id,
      name
    })
    layer.on('setStartCurrent', ({ id }) => {
      if (wedge.getParent().id() === id) {
        wedge.fill(this.innerWedgeActiveFill)
        this.startCurrentAngle = wedge.rotation()
      }
    })
    layer.on('setActiveFill', ({ wedgeId }) => {
      if (wedge.id() === wedgeId) {
        wedge.fill(this.innerWedgeActiveFill)

        this.innerAnimation({ wedge })
      }
    })
    layer.on('resetFill', ({ wedgeId }) => {
      if (wedge.id() !== wedgeId) {
        wedge.fill(this.innerWedgeFill)
      }
    })

    return wedge
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
    const layer = this.selectLayer('inner')
    const text = new Konva.Text({
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
    layer.on('setStartCurrent', ({ id }) => {
      if (text.getParent().id() === id) {
        // text.fill(this.innerWedgeActiveFill)
      }
    })
    layer.on('setActiveFill', ({ textId }) => {
      if (text.id() === textId) {
        // text.fill(this.innerWedgeActiveFill)
      }
    })
    return text
  }
  innerAnimation({ wedge }) {
    const layer = this.selectLayer('inner')
    const wedgeRotation = wedge.getRotation()
    const rotation = layer.getRotation()

    let targetAngle = rotation - (wedgeRotation - this.startCurrentAngle + rotation)
    if (targetAngle > 0) {
      targetAngle = targetAngle - 360
    }
    if (targetAngle < -180) {
      targetAngle = targetAngle + 360
    }
    const tween = new Konva.Tween({
      node: layer,
      duration: 1,
      easing: Konva.Easings.EaseInOut,
      rotation: targetAngle
    })

    tween.play()
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

  /**
   * Inserts an array of items into the middle of an array.
   * @param {Array} arr - the array to insert the items into.
   * @param {Array} items - the items to insert into the array.
   * @returns None
   */
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
