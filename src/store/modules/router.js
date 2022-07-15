/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 15:24:13
 * @LastEditTime: 2022-07-15 17:45:44
 * @LastEditors: wsy
 */
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { useUserOutsideStore } from './user'
import { cloneDeep, isString, isArray, has, head } from 'lodash-es'
import consola from 'consola'

function hasPermission(permissions, route) {
  let isAuth = false
  if (route.meta && route.meta.auth) {
    isAuth = permissions.some((auth) => {
      if (isString(route.meta.auth)) {
        return route.meta.auth === auth
      } else if (isArray(route.meta.auth)) {
        return route.meta.auth.some((routeAuth) => routeAuth === auth)
      }
      consola.error(
        new Error(`route.meta.auth 必须是字符串或者数组，当前为 ${typeof route.meta.auth}`)
      )
    })
  } else {
    isAuth = true
  }
  return isAuth
}

function filterAsyncRoutes(routes, permissions) {
  return routes.filter((route) => {
    if (hasPermission(permissions, route)) {
      has(route, 'children') && (route.children = filterAsyncRoutes(route.children, permissions))
      return true
    }
    return false
  })
}
function flatAsyncRoutes(routes, baseUrl = '') {
  let res = []
  routes.forEach((route) => {
    if (route.children) {
      let childrenBaseUrl = ''
      if (baseUrl == '') {
        childrenBaseUrl = route.path
      } else if (route.path != '') {
        childrenBaseUrl = `${baseUrl}/${route.path}`
      }
      let tmpRoute = cloneDeep(route)
      tmpRoute.path = childrenBaseUrl
      delete tmpRoute.children
      res.push(tmpRoute)
      let childrenRoutes = flatAsyncRoutes(route.children, childrenBaseUrl)
      childrenRoutes.map((item) => {
        // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
        if (res.some((v) => v.path == item.path)) {
          res.forEach((v, i) => {
            if (v.path == item.path) {
              res[i] = item
            }
          })
        } else {
          res.push(item)
        }
      })
    } else {
      let tmpRoute = cloneDeep(route)
      if (baseUrl != '') {
        if (tmpRoute.path != '') {
          tmpRoute.path = `${baseUrl}/${tmpRoute.path}`
        } else {
          tmpRoute.path = baseUrl
        }
      }
      res.push(tmpRoute)
    }
  })
  return res
}
export const useRouteStore = defineStore('route', {
  state: () => ({
    isGenerate: false,
    routes: [],
    currentRemoveRoutes: []
  }),
  getters: {
    // 扁平化路由（将三级及以上路由数据拍平成二级）
    flatRoutes: (state) => {
      return state.routes.map((item) =>
        item.children
          ? {
              ...item,
              children: flatAsyncRoutes(item.children, item.path)
            }
          : item
      )
    },
    firstRouterPath() {
      const routerHead = head(this.flatRoutes)
      if (has(routerHead, 'children')) {
        return head(routerHead.children).path
      } else {
        return head(this.flatRoutes).path
      }
    }
  },
  actions: {
    async generateRoutesAtFront(asyncRoutes, isAuthority = true) {
      const userStore = useUserOutsideStore()
      let accessedRoutes = []
      if (isAuthority) {
        const permissions = await userStore.getPermissions()
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
      } else {
        accessedRoutes = cloneDeep(asyncRoutes)
      }
      this.isGenerate = true
      this.routes = accessedRoutes
    },
    setCurrentRemoveRoutes(routes) {
      this.currentRemoveRoutes = routes
    },
    removeRoutes() {
      this.isGenerate = false
      this.routes = []
      this.currentRemoveRoutes.forEach((removeRoute) => {
        removeRoute()
      })
      this.currentRemoveRoutes = []
    }
  }
})
export function useRouteOutsideStore() {
  return useRouteStore(piniaStore)
}
