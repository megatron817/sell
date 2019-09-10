// 引入路由模块并使用它
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 定义路由
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/goods')
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/views/goods')
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: () => import('@/views/ratings')
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('@/views/seller')
  },
  {
    path: '*',
    redirect: '/goods'
  }
]

// 导出路由
export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
