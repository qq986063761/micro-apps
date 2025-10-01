import Vue from 'vue'
import store from '@/store'
import ajax from '@/ajax'
import modal1 from '@/components/modal1.js'
Vue.prototype.$ajax = ajax

// 导入需要暴露的组件和插件
import Button from '@/components/Button.vue'
import modal from '@/components/modal.js'

// 统一暴露所有组件和插件
export {
  Button,
  modal
}


Vue.prototype.$modal1 = modal1

// 也可以作为默认导出
export default {
  Button,
  modal,
  async init(cb) {
    // 这里请求需要的应用内的全局数据准备好后在调用 cb 传组件给其他应用
    ajax.getData()
    store.dispatch('fetchData')
    
    cb({
      Button,
      modal
    })
  }
}