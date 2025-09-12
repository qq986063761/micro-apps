<template>
  <div class="home">
    <h2>欢迎使用 Qiankun 微前端 Demo</h2>
    <p>这是一个基于 qiankun 的微前端架构演示项目</p>
    <p>包含一个主应用和两个子应用，都使用 Vue2 技术栈</p>
    
    <div class="features">
      <h3>功能特性：</h3>
      <ul>
        <li>✅ 主应用管理子应用的生命周期</li>
        <li>✅ 子应用独立开发、独立部署</li>
        <li>✅ 应用间路由管理</li>
        <li>✅ 样式隔离</li>
        <li>✅ JavaScript 沙箱</li>
      </ul>
    </div>
    
    <div class="apps">
      <h3>应用列表：</h3>
      <div class="app-cards">
        <div class="app-card">
          <h4>主应用 (Main)</h4>
          <p>负责子应用的注册、启动和路由管理</p>
          <p><strong>端口：</strong> 8080</p>
        </div>
        <div class="app-card">
          <h4>子应用1 (Child1)</h4>
          <p>第一个子应用，展示用户管理功能</p>
          <p><strong>端口：</strong> 8081</p>
        </div>
        <div class="app-card">
          <h4>子应用2 (Child2)</h4>
          <p>第二个子应用，展示商品管理功能</p>
          <p><strong>端口：</strong> 8082</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.features {
  margin: 30px 0;
  text-align: left;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.apps {
  margin: 40px 0;
}

.app-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.app-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: left;
}

.app-card h4 {
  color: #42b983;
  margin: 0 0 10px 0;
}

.app-card p {
  margin: 5px 0;
  color: #666;
}
</style>
