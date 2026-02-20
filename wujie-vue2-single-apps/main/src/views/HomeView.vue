<template>
  <div class="home">
    <el-card class="card theme-demo-card" shadow="hover">
      <template #header>
        <span>主应用主题色</span>
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
        <span>不加载子应用直接使用组件</span>
      </template>
      <Child1Button />
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView'
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
