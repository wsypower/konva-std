/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 17:09:43
 * @LastEditTime: 2022-07-15 17:50:57
 * @LastEditors: wsy
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import screen from './modules'
import { constantRoutes, lastRoute } from './system'
import { useProgress } from '@/hooks/useProgress'
import { useRouteOutsideStore } from '@/store/modules/router'
import { useUserOutsideStore } from '@/store/modules/user'
import { wrapperEnv } from '@/util/env'
import '@/style/scss/nprogress.scss'
const isAuthority = wrapperEnv(import.meta.env.VITE_AUTHORITY)
const { openNProgress, closeNProgress } = useProgress()

// 免登录白名单
const noLoginWhitelist = ['/login']

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

router.beforeEach(async (to, from, next) => {
  openNProgress()
  const routeStore = useRouteOutsideStore()
  const userStore = useUserOutsideStore()
  if (userStore.isLogin || !isAuthority) {
    if (routeStore.isGenerate) {
      if (to.name === 'login') {
        next({ path: '/' })
      } else {
        if (to.path === '/') {
          next({ path: routeStore.firstRouterPath, replace: true })
        } else {
          next()
        }
      }
    } else {
      await routeStore.generateRoutesAtFront(screen, isAuthority)
      let removeRoutes = []
      routeStore.routes.forEach((route) => {
        removeRoutes.push(router.addRoute(route))
      })
      removeRoutes.push(router.addRoute(lastRoute))
      routeStore.setCurrentRemoveRoutes(removeRoutes)
      next({ ...to, replace: true })
    }
  } else {
    if (!noLoginWhitelist.includes(to.path)) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  closeNProgress()
})

async function setupRouter(app) {
  app.use(router)
}
export { router, setupRouter }
