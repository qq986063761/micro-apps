import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/child1',
    redirect: '/child1/users'
  },
  {
    path: '/child1/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/child1/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/child1/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? '/child1' : '/',
  routes
})

export default router
