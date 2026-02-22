import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChildView from '../views/ChildView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/child1',
    name: 'child',
    meta: { app: 'child1' },
    component: ChildView
  },
  {
    path: '/child1/:pathMatch(.*)',
    name: 'child',
    meta: { app: 'child1' },
    component: ChildView
  },
  {
    path: '/child2',
    name: 'child',
    meta: { app: 'child2' },
    component: ChildView
  },
  {
    path: '/child2/:pathMatch(.*)',
    name: 'child',
    meta: { app: 'child2' },
    component: ChildView
  }
]

const router = new VueRouter({
  routes
})

// 全局处理路由重复导航错误
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Router push error:', err)
      throw err
    }
  })
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Router replace error:', err)
      throw err
    }
  })
}

export default router
