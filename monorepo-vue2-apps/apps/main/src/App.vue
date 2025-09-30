<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <div class="logo">
          <h2>微前端主应用</h2>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="nav-menu"
          mode="horizontal"
          router
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/child1">子应用1</el-menu-item>
          <el-menu-item index="/child2">子应用2</el-menu-item>
        </el-menu>
      </el-header>
      
      <el-main class="main-content">
        <router-view />
        
        <!-- 子应用容器 -->
        <div id="child1-container" v-show="$route.path.startsWith('/child1')"></div>
        <div id="child2-container" v-show="$route.path.startsWith('/child2')"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    activeIndex() {
      return this.$route.path
    }
  }
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
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo h2 {
  margin: 0;
  color: white;
}

.nav-menu {
  background-color: transparent;
  border-bottom: none;
}

.nav-menu .el-menu-item {
  color: white;
  border-bottom: 2px solid transparent;
}

.nav-menu .el-menu-item:hover,
.nav-menu .el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom-color: white;
}

.main-content {
  padding: 20px;
  min-height: calc(100vh - 60px);
}

.home-content {
  text-align: center;
  padding: 50px 0;
}

.home-content h1 {
  color: #409eff;
  margin-bottom: 20px;
}

.home-content p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}
</style>
