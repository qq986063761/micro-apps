<template>
  <div class="home">
    <el-card class="card" shadow="hover">
      <template #header>
        <span>切换子应用后返回，数据能被缓存</span>
      </template>
      <el-input v-model="input" placeholder="请输入内容，切换子应用返回能保存状态"/>
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <span>跨应用跳转路由</span>
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
  min-height: 100%;

  .card {
    margin-bottom: 20px;
    border-radius: 8px;
  }
}
</style>
