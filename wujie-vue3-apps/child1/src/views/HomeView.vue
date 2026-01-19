<template>
  <div class="home">
    <div class="header">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>

    <h1>【同域】测试切换子应用，数据缓存</h1>
    <el-input v-model="input" placeholder="请输入内容，切换子应用返回能保存状态"/>

    <h1>【同域】测试子应用互相跳转路由</h1>
    <el-button type="danger" @click="handleClick">跳转到 child2 的 about 页面</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

const input = ref('')

const handleClick = () => {
  // 使用无界 API
  if (window.$wujie) {
    const { methods } = window.$wujie.props
    
    // 方式1: 通过 props 中的 methods 调用
    if (methods && methods.toChildPage) {
      methods.toChildPage({
        app: 'child2',
        route: {
          name: 'about',
          query: {},
          params: {}
        }
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
