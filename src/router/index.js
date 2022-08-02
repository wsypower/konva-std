/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 17:09:43
 * @LastEditTime: 2022-08-02 19:09:52
 * @LastEditors: wsy
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import screen from './modules'
import { constantRoutes, lastRoute } from './system'
import { keepAliveHelper } from './helper'
import { useProgress } from '@/hooks/useProgress'
import { useRouteOutsideStore } from '@/store/modules/router'
import { useUserOutsideStore } from '@/store/modules/user'
import { wrapperEnv } from '@/util/env'
import { useTitle } from '@vueuse/core'
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
      routeStore.flatRoutes.forEach((route) => {
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

router.afterEach((to, from) => {
  const routeStore = useRouteOutsideStore()
  const routerTitle = to.meta.title
  const rawTitle = typeof routerTitle === 'function' ? routerTitle() : routerTitle
  const title = useTitle()
  title.value = rawTitle
    ? `${import.meta.env.VITE_APP_TITLE} | ${rawTitle}`
    : import.meta.env.VITE_APP_TITLE
  closeNProgress()
  routeStore.routerDirection(to, from)
  keepAliveHelper(to, from)
})

async function setupRouter(app) {
  app.use(router)
}
export { router, setupRouter }
