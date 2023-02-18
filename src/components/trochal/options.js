export default class DefaultOptions {
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
}
