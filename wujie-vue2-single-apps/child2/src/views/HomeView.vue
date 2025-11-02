<template>
  <div class="home">
    <div class="header">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    
    <h1>【webpack5联邦】测试引入其他应用组件</h1>
    <Child1Button />

    <h1>【同域】测试互相调用其他应用组件</h1>
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
      const { useComp } = window.parent.$mApp
      
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

<style lang="scss">
.home {
  .header {
    text-align: center;
  }
}
</style>
