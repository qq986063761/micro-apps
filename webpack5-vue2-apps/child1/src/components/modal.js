import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import ajax from '@/ajax'
import Modal from '@/components/Modal.vue'

export default {
  show() {
    if (!this.vm) {
      Vue.prototype.$ajax = ajax

      const ModalVue = Vue.extend(Modal)
      this.vm = new ModalVue({
        store,
        router
      })
      this.vm.$mount()
      document.body.appendChild(this.vm.$el)
    }

    this.vm.show()
  }
}