/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-08-02 17:38:49
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
      title: '面包屑导航',
      icon: 'icon-cup'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/system/demo/container.vue'),
        meta: {
          title: '首页',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test1',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test2',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test3',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test4',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test5',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test6',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test7',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      },
      {
        path: 'test8',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup'
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/test1',
    meta: {
      title: '面包屑导航',
      icon: 'icon-cup'
    },
    children: [
      {
        path: 'test1',
        component: demo,
        meta: {
          title: '面包屑导航',
          icon: 'icon-cup',
          cache: true
        }
      }
    ]
  }
]
