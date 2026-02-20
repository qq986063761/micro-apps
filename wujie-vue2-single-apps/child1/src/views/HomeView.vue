<template>
  <div class="home">
    <el-card class="card" shadow="hover">
      <template #header>
        <span>【同域】测试切换子应用，数据缓存</span>
      </template>
      <el-input v-model="input" placeholder="请输入内容，切换子应用返回能保存状态"/>
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <span>【同域】测试子应用互相跳转路由</span>
      </template>
      <el-button type="danger" @click="handleClick">跳转到 child2 的 about 页面</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
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
  padding: 20px;

  .card {
    margin-bottom: 20px;
  }
}
</style>
