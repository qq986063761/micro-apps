<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <h2>子应用2 - 商品管理</h2>
      </el-header>
      
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  background-color: #67c23a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.header h2 {
  margin: 0;
  color: white;
}

.main-content {
  padding: 20px;
  min-height: calc(100vh - 60px);
}
</style>
