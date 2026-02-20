<template>
  <div class="home">
    <el-card class="card" shadow="hover">
      <template #header>
        <span>不加载应用直接使用其他应用组件</span>
      </template>
      <Child1Button />
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <span>跨应用调用组件</span>
      </template>
      <el-button type="danger" @click="openChild1Modal">
        打开 child1 弹窗
      </el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    openChild1Modal() {
      const { use } = window.$app
      use({
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
  padding: 20px;
  min-height: 100%;

  .card {
    margin-bottom: 20px;
    border-radius: 8px;
  }
}
</style>
