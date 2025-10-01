import Vue from 'vue'
import Modal from './Modal.vue'
import router from '@/router'
import store from '@/store'

const ModalComponent = Vue.extend(Modal)

export default {
  show(...args) {
    if (!this.vm) {
      this.vm = new ModalComponent({
        router,
        store
      })
      
      this.vm.$mount()
      document.body.appendChild(this.vm.$el)
    }

    this.vm.show(...args)
  }
}