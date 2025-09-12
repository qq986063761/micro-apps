import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import Categories from '../views/Categories.vue'
import Orders from '../views/Orders.vue'
import Analytics from '../views/Analytics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/child2',
    redirect: '/child2/products'
  },
  {
    path: '/child2/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/child2/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/child2/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/child2/analytics',
    name: 'Analytics',
    component: Analytics
  }
]

const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/child2' : '/',
  routes
})

export default router
