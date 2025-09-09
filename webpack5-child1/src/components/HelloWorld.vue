<template>
  <div class="hello child1-component">
    <h1>🚀 Child1 HelloWorld 组件</h1>
    <p class="description">这是来自 Child1 应用的 HelloWorld 组件</p>
    <div class="info-card">
      <h3>应用信息</h3>
      <ul>
        <li><strong>应用名称:</strong> Child1</li>
        <li><strong>端口:</strong> 8081</li>
        <li><strong>状态:</strong> <span class="status">运行中</span></li>
        <li><strong>组件:</strong> HelloWorld</li>
      </ul>
    </div>
    <div class="features">
      <h3>功能特性</h3>
      <div class="feature-list">
        <span class="feature">✅ 微前端集成</span>
        <span class="feature">✅ 独立部署</span>
        <span class="feature">✅ 共享依赖</span>
        <span class="feature">✅ 热更新</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.child1-component {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin: 10px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.description {
  font-size: 16px;
  margin: 15px 0;
  opacity: 0.9;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
}

.info-card h3 {
  margin: 0 0 15px 0;
  color: #fff;
}

.info-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-card li {
  margin: 8px 0;
  display: block;
}

.status {
  color: #4ade80;
  font-weight: bold;
}

.features {
  margin-top: 20px;
}

.features h3 {
  margin: 0 0 15px 0;
  color: #fff;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.feature {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  backdrop-filter: blur(5px);
}
</style>
