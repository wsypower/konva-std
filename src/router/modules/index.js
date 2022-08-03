/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-08-03 16:03:33
 * @LastEditors: wsy
 */
const demo = () => import('@/views/system/demo/index.vue')
const Layout = () => import('@/layout/index.vue')
export default [
  {
    path: '/index',
    component: Layout,
    redirect: '/index/home',
    meta: {
      title: '测试布局'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/system/demo/container.vue'),
        meta: {
          title: '测试首页'
        },
        children: [
          {
            path: 'test1',
            component: demo,
            meta: {
              title: '子集路由'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/test1',
    meta: {
      title: '测试布局'
    },
    children: [
      {
        path: 'test1',
        component: demo,
        meta: {
          title: '平级路由'
        }
      }
    ]
  }
]
