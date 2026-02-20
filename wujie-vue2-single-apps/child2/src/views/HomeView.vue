<template>
  <div class="home">
    <el-card class="card" shadow="hover">
      <template #header>
        <span>【webpack5联邦】测试引入其他应用组件</span>
      </template>
      <Child1Button />
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <span>【同域】测试互相调用其他应用组件</span>
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
      const { use } = window.$parentApp || {}

      use({
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
  padding: 20px;

  .card {
    margin-bottom: 20px;
  }
}
</style>
