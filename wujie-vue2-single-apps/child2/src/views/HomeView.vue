<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Child1Button />

    <el-button type="danger" @click="openChild1Modal">
      打开 child1 弹窗
    </el-button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
    openChild1Modal() {
      const { useComp } = window.parent.$microApp
      
      useComp({
        module: 'child1',
        name: 'modal',
        method: 'show',
        args: [{
          title: 'child1 弹窗',
          content: 'child1 弹窗内容',
          onConfirm: data => {
            console.log('child1 弹窗回调 onConfirm', data)
          },
          onCancel: data => {
            console.log('child1 弹窗回调 onCancel', data)
          }
        }]
      })
    }
  }
}
</script>
