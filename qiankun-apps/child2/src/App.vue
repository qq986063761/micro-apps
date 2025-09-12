<template>
  <div id="app">
    <div class="app-header">
      <h1>子应用2 - 商品管理系统</h1>
      <nav class="nav">
        <router-link to="/child2/products" class="nav-link">商品列表</router-link>
        <router-link to="/child2/categories" class="nav-link">分类管理</router-link>
        <router-link to="/child2/orders" class="nav-link">订单管理</router-link>
        <router-link to="/child2/analytics" class="nav-link">数据分析</router-link>
      </nav>
    </div>
    
    <div class="app-content">
      <router-view />
    </div>
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

.app-header {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 20px;
  text-align: center;
}

.app-header h1 {
  margin: 0 0 20px 0;
  font-size: 24px;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.app-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
