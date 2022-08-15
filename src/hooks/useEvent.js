/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-08-15 10:59:02
 * @LastEditTime: 2022-08-15 11:22:39
 * @LastEditors: wsy
 */
import mitt from 'mitt'

const emitter = mitt()
export function useEmitter() {
  return emitter
}
