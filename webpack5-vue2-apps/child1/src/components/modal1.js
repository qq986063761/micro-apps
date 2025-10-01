import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import Modal from '@/components/Modal1.vue'

export default {
  show() {
    if (!this.vm) {
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