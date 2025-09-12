<template>
  <div id="app">
    <div class="app-header">
      <h1>子应用1 - 用户管理系统</h1>
      <nav class="nav">
        <router-link to="/child1/users" class="nav-link">用户列表</router-link>
        <router-link to="/child1/profile" class="nav-link">个人资料</router-link>
        <router-link to="/child1/settings" class="nav-link">设置</router-link>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
