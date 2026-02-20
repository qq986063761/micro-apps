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

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleClick() {
      // 优先用无界to（跨域安全），同域或独立运行时回退到 window.parent
      const { to } = window.$parentApp
      
      to({
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