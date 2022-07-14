/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 15:24:13
 * @LastEditTime: 2022-07-14 20:21:35
 * @LastEditors: wsy
 */
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
// import { useUserOutsideStore } from './user'
import { cloneDeep } from 'lodash-es'
export const useRouteStore = defineStore('route', {
  state: () => ({
    isGenerate: false,
    routes: [],
    currentRemoveRoutes: []
  }),
  actions: {
    async generateRoutesAtFront(asyncRoutes, isAuthority = true) {
      // const userStore = useUserOutsideStore()
      let accessedRoutes = []
      if (isAuthority) {
        console.info(1)
        // const permissions = await userStore.getPermissions()
        accessedRoutes = cloneDeep(asyncRoutes)
      } else {
        console.info(2)
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
