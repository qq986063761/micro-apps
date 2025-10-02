<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <el-input v-model="input" placeholder="请输入内容，切换子应用返回能保存状态"/>

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
      const { toPage } = window.parent.$microApp

      toPage({
        module: 'child2',
        routeName: 'about',
        query: {},
        params: {}
      })
    }
  }
}
</script>
