/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-11 14:19:44
 * @LastEditors: wsy
 */
import { createPinia } from 'pinia'
export const piniaStore = createPinia()
export function setupStore(app) {
  app.use(piniaStore)
}
