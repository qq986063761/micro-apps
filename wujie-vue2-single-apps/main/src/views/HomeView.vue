<template>
  <div class="home">
    <el-card class="card" shadow="hover">
      <template #header>
        <span>【webpack5联邦】测试引入子应用组件</span>
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

  .card {
    margin-bottom: 20px;
  }
}
</style>
