/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-11 15:30:39
 * @LastEditors: wsy
 */
const Layout = () => import('@/layout/index.vue')

export default {
  path: '/',
  component: Layout,
  name: 'breadcrumbExample',
  meta: {
    title: '面包屑导航',
    icon: 'icon-cup'
  }
}
