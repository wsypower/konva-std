/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 14:51:22
 * @LastEditTime: 2022-07-14 20:19:42
 * @LastEditors: wsy
 */
const Layout = () => import('@/layout/index.vue')
export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    component: Layout
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/system/login/login.vue'),
    meta: {
      title: '登录'
    }
  }
]
export const lastRoute = {
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/system/404/404.vue'),
  meta: {
    title: '找不到页面'
  }
}
