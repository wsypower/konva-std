/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-18 15:58:30
 * @LastEditTime: 2022-07-18 16:15:05
 * @LastEditors: wsy
 */
import { useUrlSearchParams } from '@vueuse/core'
// import storage from '@/util/storage'
import consola from 'consola'
export async function urlParamsLogin() {
  let params = useUrlSearchParams('history')
  const { API_LOGIN } = useRequest()
  if (params.token) {
    __DEV__ && consola.info('开启系统免等')
    API_LOGIN(params).then((res) => {
      // 设置本地持久化缓存
      console.info(res)
      // storage.local.set('account', res.data.account)
      // storage.local.set('token', res.data.token)
      // storage.local.set('failure_time', res.data.failure_time)
      __DEV__ && consola.info('免登成功')
    })
  }
}
