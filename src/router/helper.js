/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-18 15:58:30
 * @LastEditTime: 2022-08-02 17:40:32
 * @LastEditors: wsy
 */
import { useUrlSearchParams } from '@vueuse/core'
import consola from 'consola'
import { useKeepAliveOutsideStore } from '@/store/modules/keepAlive'

export async function urlParamsLogin() {
  let params = useUrlSearchParams('history')
  const { API_LOGIN } = useRequest()
  if (params.token) {
    __DEV__ && consola.info('开启系统免等')
    API_LOGIN(params).then((res) => {
      // 设置本地持久化缓存
      console.info(res)
      __DEV__ && consola.info('免登成功')
    })
  }
}
export function keepAliveHelper(to, from) {
  const cacheTypeClass = ['String', 'Array', 'Boolean']
  const noCacheTypeClass = ['String', 'Array']
  const keepAliveOutsideStore = useKeepAliveOutsideStore()
  if (to.meta.cache) {
    let componentName = to.matched[to.matched.length - 1].components.default.name
    if (componentName) {
      keepAliveOutsideStore.add(componentName)
    } else {
      consola.error(new Error('当前页面组件未设置组件名name,会导致缓存失效,请检查!'))
    }
  }
  if (from.meta.cache) {
    let componentName = from.matched[from.matched.length - 1].components.default.name
    const fromMetaCacheType = typeSource(from.meta.cache)
    if (!cacheTypeClass.includes(fromMetaCacheType)) {
      consola.error(new Error('cache类型必须是String, Array, Boolean,请检查!'))
    }
    switch (fromMetaCacheType) {
      case 'String':
        if (from.meta.cache != to.name) {
          keepAliveOutsideStore.remove(componentName)
        }
        break
      case 'Array':
        if (!from.meta.cache.includes(to.name)) {
          keepAliveOutsideStore.remove(componentName)
        }
        break
    }
    if (from.meta.noCache) {
      const fromMetaNoCacheType = typeSource(from.meta.noCache)
      if (!noCacheTypeClass.includes(fromMetaNoCacheType)) {
        consola.error(new Error('noCache类型必须是 String, Array,请检查'))
      }
      switch (fromMetaNoCacheType) {
        case 'String':
          if (from.meta.noCache == to.name) {
            keepAliveOutsideStore.remove(componentName)
          }
          break
        case 'Array':
          if (from.meta.noCache.includes(to.name)) {
            keepAliveOutsideStore.remove(componentName)
          }
          break
      }
    }
    if (to.name == 'reload') {
      keepAliveOutsideStore.remove(componentName)
    }
  }
  function typeSource(type) {
    return Object.prototype.toString.call(type).slice(8, -1)
  }
}
