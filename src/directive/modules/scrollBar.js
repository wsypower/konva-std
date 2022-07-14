/*
 * @Description: scrollBar
 * @Author: wsy
 * @Date: 2022-05-27 15:47:48
 * @LastEditTime: 2022-07-14 14:07:06
 * @LastEditors: wsy
 */
import PerfectScrollbar from 'perfect-scrollbar'
import consola from 'consola'
const elScrollBar = (el) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    el._ps_ = new PerfectScrollbar(el, {
      suppressScrollX: true
    })
  }
}

export default {
  mounted(el) {
    try {
      elScrollBar(el)
    } catch (error) {
      consola.error(error)
      elScrollBar(el)
    }
  }
}
