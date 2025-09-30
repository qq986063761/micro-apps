import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/list',
    name: 'userList',
    component: () => import('../views/UserList.vue')
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/user/settings',
    name: 'userSettings',
    component: () => import('../views/UserSettings.vue')
  },
  {
    path: '/',
    redirect: '/user/list'
  }
]

const router = new VueRouter({
  mode: 'hash', // 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/user' : '/',
  routes
})

export default router
