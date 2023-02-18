/*
 *                                |~~~~~~~|
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *     |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
 *     |  \  o \_         ,XXXXX),                         _..-~ o /  |
 *     |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
 *      ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
 *               `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
 *                 ~-.       `:;;/;; \          _..-~~
 *                    ~-._      `''        /-~-~
 *                        `\              /  /
 *                          |         ,   | |
 *                           |  '        /  |
 *                            \/;          |
 *                             ;;          |
 *                             `;   .       |
 *                             |~~~-----.....|
 *                            | \             \
 *                           | /\~~--...__    |
 *                           (|  `\       __-\|
 *                           ||    \_   /~    |
 *                           |)     \~-'      |
 *                            |      | \      '
 *                            |      |  \    :
 *                             \     |  |    |
 *                              |    )  (    )
 *                               \  /;  /\  |
 *                               |    |/   |
 *                               |    |   |
 *                                \  .'  ||
 *                                |  |  | |
 *                                (  | |  |
 *                                |   \ \ |
 *                                || o `.)|
 *                                |`\\) |
 *                                |       |
 *                                |       |
 *
 * @Description: useTrochal
 * @Author: wsy
 * @Date: 2023-02-13 18:18:32
 * @LastEditTime: 2023-02-16 18:31:22
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
  originX = 575

  /**
   * The y-coordinate of the origin of the filter.
   * @type {number}
   */
  originY = 1080 / 2

  /**
   * The radius of the circle that the filter is applied to.
   * @type {number}
   */
  radius = 800

  /**
   * The color to fill the page with.
   * @type {string}
   */
  fill = ''

  /**
   * A function that takes in a wedge and fills it with the given color.
   * @param {Wedge} wedge - the wedge to fill
   * @param {string} color - the color to fill the wedge with
   * @returns None
   */
  innerWedgeFill = {}

  /**
   * A function that takes in a string of code and returns a string of code that is formatted
   * to be used as a CSS filter style sheet.
   * @param {string} code - the code to format
   * @returns {string} - the formatted code
   */
  outerWedgeFill = {}

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
  innerwedgeStroke = '#1D64A0'

  /**
   * The width of the stroke used to draw the border around the filter.
   * @type {number}
   */
  strokeWidth = 2

  /**
   * The angle of the inner sector of the circle.
   * @type {number}
   */
  innerSectorAngle = 10

  /**
   * The angle of the outer sector of the circle.
   * @type {number}
   */
  outerSectorAngle = 30

  /**
   * The number of children in the outer sector.
   * @returns {number} - the number of children in the outer sector.
   */
  outerSectorAngleChildren = 2.3
  /**
   * Starts the current index at the given number.
   * @param {number} startCurrent - the number to start the current index at.
   * @returns None
   */
  startCurrent = 3

  /**
   * The starting angle of the current animation.
   */
  startCurrentAngle = 0

  padding = 450
  activeId = 0
  data = []

  rawData = []
  /**
   * Initializes the stage and layers for the filter.
   * @param {HTMLElement} container - the container for the filter.
   * @returns None
   */
  initStage(container) {
    this.stage = this.createStage(container)
    this.createLayer('inner')
    this.createLayer('outerWarp')
    this.createLayer('outer')

    this.createLayer('innerWarp')
  }
  /**
   * Draws the filter.
   * @returns None
   */
  draw() {
    this.drawInnerWarp()
    this.drawInner()

    this.drawOuterWarp()
    this.drawOuter()
  }
  drawInnerWarp() {
    this.drawInnerCircle('innerWarp')
  }
  drawOuterWarp() {
    const radius = this.radius + this.padding
    const strokeLinearGradientColorStops = [
      0,
      'rgba(1,206,255,0)',
      0.9,
      'rgba(1,206,255,0)',
      1,
      'rgba(1,206,255,0.8)'
    ]
    let warpLine = this.drawInnerCircle('outerWarp', radius)
    warpLine.strokeLinearGradientColorStops(strokeLinearGradientColorStops)

    let warpShow = this.drawInnerCircle('outerWarp', radius + 20)
    warpShow.strokeLinearGradientColorStops(strokeLinearGradientColorStops)

    let warpShowOverlap = this.drawInnerCircle('outerWarp', radius + 35)
    warpShowOverlap.strokeLinearGradientColorStops(strokeLinearGradientColorStops)
  }
  /**
   * Draws the inner circle of the pie chart.
   * @returns None
   */
  drawInner() {
    const innerSectorSize = Math.floor(360 / this.innerSectorAngle)
    const offsetAngle = (this.innerSectorAngle * this.data.length) / 2
    const remainder = innerSectorSize % this.data.length
    const multiple = Math.floor(innerSectorSize / this.data.length)

    this.rawData = this.data
    this.data = this.normalizeData(multiple, remainder)

    for (let i = 0; i < innerSectorSize; i++) {
      const angle = this.innerSectorAngle
      const rotation = i * angle - offsetAngle
      const id = `${i}-inner-group`
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
   * Draws the outer group of the pie chart.
   * @returns None
   */
  drawOuter() {
    this.drawOuterCircle()

    const rawData = toRaw(this.rawData)

    // pre iterate to get the total angle
    for (let i = 0; i < rawData.length; i++) {
      const outer = rawData[i]
      const children = outer.value
      const currentAngle = this.outerSectorAngleChildren * children.length + 1.5
      outer.angle = currentAngle
      outer.totalAngle = i > 0 ? rawData[i - 1].totalAngle + rawData[i - 1].angle : 0
    }
    const offset = rawData[this.startCurrent].totalAngle

    const innerStartSectorRotation = this.searchWedge(
      'inner',
      `${this.startCurrent}-inner-group`,
      `${this.startCurrent}-inner-group-sector`
    ).getRotation()

    // Calculate the total angle of the outer circle
    for (let i = 0; i < rawData.length; i++) {
      const outer = rawData[i]
      const id = `${i}-outer-group`
      const name = `${i}-outer-group`
      const idx = i
      this.createOuterGroup({
        angle: outer.angle,
        rotation: outer.totalAngle - offset + innerStartSectorRotation,
        id,
        name,
        idx
      })

      // group.opacity(0)
    }
  }

  /**
   * Draws the inner circle of the filter.
   * @returns None
   */
  drawInnerCircle(name = 'inner', radius = this.radius) {
    let layer = this.layers.get(name)
    const circle = new Konva.Circle({
      x: this.originX,
      y: this.originY,
      radius: radius + 1,
      strokeWidth: 3,
      strokeLinearGradientStartPoint: { x: 0, y: 0 },
      strokeLinearGradientEndPoint: { x: radius, y: 0 },
      strokeLinearGradientColorStops: [
        0,
        'rgba(1,206,255,0)',
        0.8,
        'rgba(1,206,255,0)',
        1,
        'rgba(1,206,255,1)'
      ],
      shadowColor: 'black',
      shadowBlur: 20,
      shadowOffset: {
        x: 10,
        y: 0
      }
    })
    layer.add(circle)
    return circle
  }

  /**
   * Draws the outer circle of the filter.
   * @returns None
   */
  drawOuterCircle() {
    let layer = this.layers.get('outer')
    const circle = this.createCircle({
      radius: this.radius + this.padding
    })
    layer.add(circle)
    return circle
  }

  /**
   * Selects the layer with the given name.
   * @param {string} name - the name of the layer to select
   * @returns {Layer} the layer with the given name
   */
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
    layer.zIndex(0)

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
    const circle = new Konva.Circle({
      x,
      y,
      radius,
      fill,
      stroke,
      strokeWidth
    })
    circle.fillRadialGradientEndPoint({
      x: 20,
      y: 10
    })
    circle.fillRadialGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green')
    return circle
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
        rotation: rotation + angle / 2.6,
        value: this.data[idx].name,
        name: `${id}-text`,
        id: `${id}-text`
      })
      group.add(text)
    }
    layer.add(group)
    this.innerGroupAddEventer(group)
    if (idx === this.startCurrent) {
      layer.fire('setStartCurrent', { id: group.id() })
    }
    const sectorAbsoluteRotation = sector.getAbsoluteRotation()
    group.opacity(this.mapAngleToRange(sectorAbsoluteRotation))

    return group
  }

  /**
   * Create a group that contains the outer sector and the text.
   * @param {number} angle - The angle of the outer sector.
   * @param {number} rotation - The rotation of the outer sector.
   * @param {string} id - The id of the outer sector.
   * @param {string} name - The name of the outer sector.
   * @param {number} idx - The index of the outer sector.
   * @returns A group containing the outer sector and the text.
   */
  createOuterGroup({ angle, rotation, id, name, idx }) {
    const group = this.createGroup({ id, name })
    const layer = this.selectLayer('outer')
    const sector = this.createOuterSector({
      angle: angle,
      rotation: rotation,
      name: `${id}-sector`,
      id: `${id}-sector`,
      idx
    })
    group.add(sector)
    if (this.rawData[idx]) {
      const children = this.rawData[idx].value
      for (let i = 0; i < children.length; i++) {
        const textRotaion = this.outerSectorAngleChildren * i + rotation
        const text = this.createOuterText({
          rotation: textRotaion,
          value: children[i].name,
          offsetX: -this.padding - this.radius * 0.6,
          offsetY: -22,
          name: `${id}-sector`,
          id: `${id}-text`,
          idx
        })
        group.add(text)
      }
    }
    layer.add(group)
    return group
  }

  /**
   * Adds an event listener to the given group.
   * @param {Group} group - the group to add the event listener to.
   * @returns None
   */
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
      rotation,
      id,
      fillRadialGradientStartPoint: {
        x: 0,
        y: 0
      },
      fillRadialGradientEndPoint: {
        x: 30,
        y: 0
      },
      fillRadialGradientStartRadius: radius / 4,
      fillRadialGradientEndRadius: radius, // #023779
      fillRadialGradientColorStops: [0, 'transparent', 1, '#033A8D'],

      strokeWidth: 2,
      strokeLinearGradientStartPoint: { x: 0, y: 0 },
      strokeLinearGradientEndPoint: { x: radius, y: 0 },
      strokeLinearGradientColorStops: [
        0,
        'rgba(64,149,198,0.0)',
        0.45,
        'rgba(64,149,198,0)',
        0.5,
        'rgba(64,149,198,0)',
        0.6,
        'rgba(64,149,198,0.1)',
        0.7,
        'rgba(64,149,198,0.5)',
        0.8,
        'rgba(64,149,198,0.25)',
        1,
        'rgba(64,149,198,0.1)'
      ],
      name
    })

    layer.on('setStartCurrent', ({ id }) => {
      let group = wedge.getParent()
      if (group.id() === id) {
        this.fillInnerRadialGradient(wedge)
        this.startCurrentAngle = wedge.rotation()
        this.activeId = wedge.id()
        Promise.resolve().then(() => {
          if (wedge.id() === this.activeId) {
            this.active({ group })
          }
          const innerWedgeName = wedge.name()
          const outerGroupName = wedge.getParent().name().replace('inner', 'outer')
          const outerWedgeName = innerWedgeName.replace('inner', 'outer')
          const outerWedge = this.searchWedge('outer', outerGroupName, outerWedgeName)
          this.fillOuterRadialGradient(outerWedge)
        })
      }
    })

    layer.on('setActiveFill', ({ wedgeId }) => {
      if (wedge.id() === wedgeId) {
        this.activeId = wedge.id()
        this.active({ wedge })
        this.fillInnerRadialGradient(wedge)
        this.innerAnimation({ wedge })
        this.outerAnimation({ wedge })
      }
    })
    layer.on('resetFill', ({ wedgeId }) => {
      const innerWedgeName = wedge.name()
      const outerGroupName = wedge.getParent().name().replace('inner', 'outer')
      const outerWedgeName = innerWedgeName.replace('inner', 'outer')
      const outerWedge = this.searchWedge('outer', outerGroupName, outerWedgeName)
      if (wedge.id() !== wedgeId) {
        for (const [key, value] of Object.entries(this.innerWedgeFill)) {
          wedge[key](value)
        }
        for (const [key, value] of Object.entries(this.outerWedgeFill)) {
          outerWedge[key](value)
        }
      }
    })

    return wedge
  }
  fillInnerRadialGradient(wedge) {
    if (Object.keys(this.innerWedgeFill).length === 0) {
      this.innerWedgeFill = {
        fillRadialGradientStartRadius: wedge.fillRadialGradientStartRadius(),
        fillRadialGradientColorStops: wedge.fillRadialGradientColorStops(),
        strokeLinearGradientColorStops: wedge.strokeLinearGradientColorStops()
      }
    }

    wedge.fillRadialGradientStartRadius(this.radius / 3)
    wedge.fillRadialGradientColorStops([
      0,
      'transparent',
      0.6,
      'rgba(6,100,208,0.4)',
      0.78,
      '#0658D0',
      0.88,
      '#0664D0',
      1,
      '#01A5F0'
    ])
    wedge.strokeLinearGradientColorStops([
      0,
      'rgba(64,149,198,0.0)',
      0.45,
      'rgba(64,149,198,0)',
      0.5,
      'rgba(64,149,198,0)',
      0.7,
      'rgba(64,149,198,0.2)',
      0.8,
      'rgba(1,206,255,1)',
      0.9,
      'rgba(64,149,198,0.8)',
      1,
      'rgba(64,149,198,0.1)'
    ])
  }

  fillOuterRadialGradient(wedge) {
    if (Object.keys(this.outerWedgeFill).length === 0) {
      this.outerWedgeFill = {
        fillRadialGradientColorStops: wedge.fillRadialGradientColorStops(),
        fillRadialGradientStartRadius: wedge.fillRadialGradientStartRadius(),
        strokeLinearGradientColorStops: wedge.strokeLinearGradientColorStops(),
        shadowColor: wedge.shadowColor(),
        shadowBlur: wedge.shadowBlur(),
        shadowOffset: wedge.shadowOffset()
      }
    }
    const outerRadius = this.radius + this.padding
    wedge.fillRadialGradientStartRadius(outerRadius / 4)
    wedge.fillRadialGradientColorStops([
      0,
      'transparent',
      0.5,
      'rgba(6,100,208,0.05)',
      0.6,
      'rgba(6,100,208,0.2)',
      0.78,
      'rgba(6,88,208,0.4)',
      0.9,
      'rgba(6,100,208,0.8)',
      1,
      'rgba(6,100,208,1)'
    ])
    wedge.strokeLinearGradientEndPoint({ x: outerRadius, y: outerRadius })
    wedge.strokeLinearGradientColorStops([
      0,
      'rgba(64,149,198,0.0)',
      0.45,
      'rgba(64,149,198,0)',
      0.5,
      'rgba(64,149,198,0)',
      0.7,
      'rgba(64,149,198,0.5)',
      0.8,
      'rgba(6,100,208,1)',
      1,
      '#01A5F0'
    ])
    wedge.shadowColor('rgba(1,165,240,0.4)')
    wedge.shadowBlur(100)
    wedge.shadowOffset({
      x: -10,
      y: 20
    })
  }
  /**
   * Creates a sector of the outer ring.
   * @param {number} angle - the angle of the wedge.
   * @param {number} rotation - the rotation of the wedge.
   * @param {string} id - the id of the wedge.
   * @param {string} name - the name of the wedge.
   * @returns {Konva.Wedge} - the wedge object.
   */
  createOuterSector({ angle, rotation, id, name }) {
    const { radius, originX: x, originY: y } = this
    const outerRadius = radius + this.padding
    const wedge = new Konva.Wedge({
      x,
      y,
      radius: outerRadius,
      angle,
      rotation,
      id,
      name,
      fillRadialGradientStartPoint: {
        x: 0,
        y: 0
      },
      fillRadialGradientEndPoint: {
        x: 200,
        y: 0
      },
      fillRadialGradientStartRadius: outerRadius / 2,
      fillRadialGradientEndRadius: outerRadius,
      fillRadialGradientColorStops: [0, 'transparent', 1, 'rgba(3, 58, 141, 1)'],
      strokeWidth: 2,
      strokeLinearGradientStartPoint: { x: 0, y: 0 },
      strokeLinearGradientEndPoint: { x: outerRadius, y: 0 },
      strokeLinearGradientColorStops: [
        0,
        'rgba(64,149,198,0.0)',
        0.45,
        'rgba(64,149,198,0)',
        0.5,
        'rgba(64,149,198,0)',
        0.6,
        'rgba(64,149,198,0)',
        0.7,
        'rgba(64,149,198,0.1)',
        0.8,
        'rgba(64,149,198,0.4)',
        1,
        'rgba(64,149,198,0)'
      ]
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
  createText({ rotation, value, name, id }) {
    const { originX: x, originY: y, radius } = this
    const layer = this.selectLayer('inner')
    const text = new Konva.Text({
      x,
      y,
      text: value,
      fontSize: 26,
      fontStyle: 'bold',
      padding: 0,
      fill: 'white',
      strokeWidth: 3,
      height: this.outerSectorAngleChildren,
      offsetX: -radius * 0.7,
      rotation,
      name,
      id
    })
    layer.on('setStartCurrent', ({ id }) => {
      if (text.getParent().id() === id) {
      }
    })
    layer.on('setActiveFill', ({ textId }) => {
      if (text.id() === textId) {
      }
    })
    return text
  }

  /**
   * Creates a text object for the given parameters.
   * @param {number} angle - the angle of the text object.
   * @param {number} rotation - the rotation of the text object.
   * @param {string} value - the value of the text object.
   * @returns {Konva.Text} - the text object.
   */
  createOuterText({ rotation, value, offsetX, offsetY }) {
    const { originX: x, originY: y } = this
    const layer = this.selectLayer('inner')
    const text = new Konva.Text({
      x,
      y,
      text: value,
      fontSize: 20,
      padding: 0,
      fill: 'white',
      fontStyle: 'bold',
      strokeWidth: 3,
      height: this.outerSectorAngleChildren,
      align: 'center',
      verticalAlign: 'center',
      offsetX,
      offsetY,
      rotation
    })
    layer.on('setStartCurrent', ({ id }) => {
      if (text.getParent().id() === id) {
      }
    })
    layer.on('setActiveFill', ({ textId }) => {
      if (text.id() === textId) {
      }
    })
    return text
  }

  /**
   * An inner animation function that animates the inner layer of the wedge.
   * @param {Wedge} wedge - the wedge to animate.
   * @returns None
   */
  innerAnimation({ wedge }) {
    const layer = this.selectLayer('inner')
    const wedgeRotation = wedge.getAbsoluteRotation()
    const layerCurrentRotation = layer.getRotation()
    const rotation = layerCurrentRotation - wedgeRotation + this.startCurrentAngle

    const wedgesGroup = layer.getChildren((node) => node.name().includes('group'))
    const tween = new Konva.Tween({
      node: layer,
      duration: 1,
      easing: Konva.Easings.EaseInOut,
      rotation,
      onUpdate: () => this.wedgeOpacityAnimation(wedgesGroup)
    })
    tween.play()
  }

  wedgeOpacityAnimation(wedgesGroup) {
    for (let i = 0; i < wedgesGroup.length; i++) {
      const group = wedgesGroup[i]
      const wedge = group
        .getChildren((node) => {
          return node.name().includes('sector')
        })
        .at(0)
      const targetRotation = wedge.getAbsoluteRotation()
      let opacity = this.mapAngleToRange(targetRotation)
      if (this.activeId === wedge.id()) {
        opacity = 1
      }
      group.opacity(opacity)
    }
  }
  /**
   * An animation that rotates the outer layer of the wedge.
   * @param {Wedge} wedge - the wedge to rotate
   */
  outerAnimation({ wedge }) {
    const layer = this.selectLayer('outer')
    const innerWedgeName = wedge.name()
    const outerGroupName = wedge.getParent().name().replace('inner', 'outer')
    const outerWedgeName = innerWedgeName.replace('inner', 'outer')
    const outerWedge = this.searchWedge('outer', outerGroupName, outerWedgeName)
    this.fillOuterRadialGradient(outerWedge)
    const outerAngle = outerWedge.getRotation()
    const rotation = layer.getRotation()
    let targetAngle = rotation - (outerAngle - this.startCurrentAngle + rotation)

    if (targetAngle >= 0) {
      targetAngle = targetAngle - 360
    }
    if (targetAngle <= -180) {
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

  /**
   * Searches for a wedge in the given layer and group.
   * @param {string} layerName - the name of the layer to search in
   * @param {string} groupName - the name of the group to search in
   * @param {string} wedgeName - the name of the wedge to search for
   * @returns {Layer} the wedge layer
   */
  searchWedge(layerName, groupName, wedgeName) {
    const mapInnerIndexToOuterIndex = (name) =>
      name.replace(/\d+/s, (match) => match % this.rawData.length)
    groupName = mapInnerIndexToOuterIndex(groupName)
    wedgeName = mapInnerIndexToOuterIndex(wedgeName)

    let layer = this.selectLayer(layerName)
    return layer
      .getChildren((node) => node.name() === groupName)
      .at(0)
      .getChildren((node) => node.name() === wedgeName)
      .at(0)
  }

  active({ wedge, group }) {
    if (group) {
      group.opacity(1)
    } else if (wedge) {
      wedge.getParent().opacity(1)
    }
  }

  mapAngleToRange(angle) {
    const displayInterval = 65
    if (angle === 0) {
      return 1
    } else if (angle > 0 && angle <= displayInterval) {
      return 1 - angle / displayInterval
    } else if (angle < 0 && angle >= -displayInterval) {
      return 1 + angle / displayInterval
    } else {
      return 0
    }
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
          {
            name: '云网能力',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '云服务',
            value: [
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '大数据',
            value: [
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '人工智能-1', value: 10 },
              { name: '物联网-1', value: 10 },
              { name: '视联网-1', value: 10 },
              { name: '网络信息安全-1', value: 10 },
              { name: '企业应用与服务-1', value: 10 },
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 }
            ]
          },
          {
            name: '人工智能',
            value: [
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '人工智能-1', value: 10 },
              { name: '物联网-1', value: 10 },
              { name: '视联网-1', value: 10 },
              { name: '网络信息安全-1', value: 10 },
              { name: '企业应用与服务-1', value: 10 },
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 }
            ]
          },
          {
            name: '物联网',
            value: [
              { name: '云存储', value: 10 },
              { name: '大数据', value: 10 }
            ]
          },
          {
            name: '视联网',
            value: [
              { name: '云存储', value: 10 },
              { name: '大数据', value: 10 }
            ]
          },
          {
            name: '网络信息安全',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '云安全', value: 10 },
              { name: '云服务', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '企业应用与服务',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '云服务', value: 10 },
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '视频服务',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '云安全', value: 10 },
              { name: '云服务', value: 10 },
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          }
          // { name: '安全', value: 10 },
          // { name: '行业', value: 10 },
          // { name: '其他', value: 10 }
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
