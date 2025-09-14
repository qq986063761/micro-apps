import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product/list',
    name: 'productList',
    component: () => import('../views/ProductList.vue')
  },
  {
    path: '/product/category',
    name: 'productCategory',
    component: () => import('../views/ProductCategory.vue')
  },
  {
    path: '/product/orders',
    name: 'productOrders',
    component: () => import('../views/ProductOrders.vue')
  },
  {
    path: '/product/analytics',
    name: 'productAnalytics',
    component: () => import('../views/ProductAnalytics.vue')
  },
  {
    path: '/',
    redirect: '/product/list'
  }
]

const router = new VueRouter({
  mode: 'hash', // 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/product' : '/',
  routes
})

export default router
