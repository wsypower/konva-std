/*
 * @Description: demoStore
 * @Author: wsy
 * @Date: 2022-02-15 22:15:50
 * @LastEditTime: 2022-07-14 14:08:09
 * @LastEditors: wsy
 */
import { defineStore } from 'pinia'
import { piniaStore } from '@/store'

export const demoStore = defineStore('demoStore', {
  state: () => ({
    list: []
  }),
  getters: {
    getList: (state) => {
      return state.list
    }
  },
  actions: {
    add(name) {
      this.list.push(name)
    },
    // eslint-disable-next-line
    remove(name) {
      this.list.filter((name) => name === name)
    },
    clean() {
      this.list = []
    }
  }
})

export function useDmoStoreStore() {
  return demoStore(piniaStore)
}
