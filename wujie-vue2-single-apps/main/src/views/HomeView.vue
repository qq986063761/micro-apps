<template>
  <div class="home">
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
}
</style>
