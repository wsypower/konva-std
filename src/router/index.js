/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 17:09:43
 * @LastEditTime: 2022-07-14 15:16:35
 * @LastEditors: wsy
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import screen from './modules'
import { useProgress } from '@/hooks/useProgress'
import '@/style/scss/nprogress.scss'
const { openNProgress, closeNProgress } = useProgress()

const router = createRouter({
  history: createWebHashHistory(),
  routes: [screen]
})

function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
}
router.beforeEach(async (to, from, next) => {
  console.info(to, from)
  openNProgress()
  await sleep()
  closeNProgress()
  next()
})

router.afterEach((to, from) => {
  console.info(to, from)
})

async function setupRouter(app) {
  app.use(router)
}
export { router, setupRouter }
