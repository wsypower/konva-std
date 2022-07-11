/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 17:09:43
 * @LastEditTime: 2022-07-11 17:33:42
 * @LastEditors: wsy
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import screen from './modules'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [screen]
})

router.beforeEach(async (to, from, next) => {
  console.info(to, from)
  next()
})

router.afterEach((to, from) => {
  console.info(to, from)
})

async function setupRouter(app) {
  app.use(router)
}
export { router, setupRouter }
