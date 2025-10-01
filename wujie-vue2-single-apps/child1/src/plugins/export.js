import Vue from 'vue'
import Button from '@/components/Button.vue'
import store from '@/store'

const data = {
  Button,
  store,
}

export default {
  ...data,
  async init(cb) {
    // 如果需要等子应用数据初始化
    await store.dispatch('getData')

    cb(data)
  }
}