import ajax from '../ajax'

export default {
  install(Vue, opts) {
    Vue.prototype.$ajax = ajax
  }
}