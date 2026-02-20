<template>
  <div class="home">
    <el-card class="card theme-demo-card" shadow="hover">
      <template #header>
        <span>子应用主题色</span>
      </template>
      <div class="theme-colors">
        <div class="color-block color-primary">Primary</div>
        <div class="color-block color-success">Success</div>
        <div class="color-block color-warning">Warning</div>
        <div class="color-block color-danger">Danger</div>
        <div class="color-block color-info">Info</div>
      </div>
    </el-card>

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
      const { to } = window.$app
      
      to({
        app: 'child2',
        name: 'about',
        query: {},
        params: {}
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

  .theme-demo-card {
    .theme-colors {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .color-block {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .color-primary {
      background-color: var(--primary);
    }

    .color-success {
      background-color: var(--success);
    }

    .color-warning {
      background-color: var(--warning);
    }

    .color-danger {
      background-color: var(--danger);
    }

    .color-info {
      background-color: var(--info);
    }
  }
}
</style>
