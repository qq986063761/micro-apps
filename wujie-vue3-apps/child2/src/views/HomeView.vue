<template>
  <div class="home">
    <div class="header">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    
    <h1>【webpack5联邦】测试引入其他应用组件</h1>
    <Suspense>
      <Child1Button />
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>

    <h1>【同域】测试互相调用其他应用组件</h1>
    <el-button type="danger" @click="openChild1Modal">
      打开 child1 弹窗
    </el-button>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'

const openChild1Modal = () => {
  // 使用无界 API
  if (window.$wujie) {
    const { methods } = window.$wujie.props
    
    // 方式1: 通过 props 中的 methods 调用
    if (methods && methods.useChildComp) {
      methods.useChildComp({
        app: 'child1',
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
