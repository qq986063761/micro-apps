import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/SettingsView.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history' // 使用 history 模式以便测试浏览器返回按钮
})

// 添加路由监听，用于测试浏览器返回按钮
router.beforeEach((to, from, next) => {
  console.log(`[Child1] 路由变化: ${from.path} -> ${to.path}`)
  next()
})

router.afterEach((to, from) => {
  console.log(`[Child1] 路由变化完成: ${from.path} -> ${to.path}`)
})

export default router
