<template>
  <div class="about child1-about">
    <h1>📋 Child1 About 页面</h1>
    <div class="about-content">
      <div class="section">
        <h3>关于 Child1 应用</h3>
        <p>这是一个基于 Vue.js 的微前端子应用，展示了 Module Federation 的强大功能。</p>
      </div>
      
      <div class="section">
        <h3>技术栈</h3>
        <div class="tech-stack">
          <span class="tech">Vue 2.6.14</span>
          <span class="tech">Vue Router</span>
          <span class="tech">Vuex</span>
          <span class="tech">Webpack 5</span>
          <span class="tech">Module Federation</span>
        </div>
      </div>
      
      <div class="section">
        <h3>功能展示</h3>
        <div class="demo-area">
          <button @click="incrementCounter" class="demo-button">
            点击计数: {{ counter }}
          </button>
          <p class="demo-text">这个计数器展示了组件状态管理功能</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter() {
      this.counter++
    }
  }
}
</script>

<style scoped lang="scss">
.child1-about {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  margin: 10px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.about-content {
  margin-top: 20px;
}

.section {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
  backdrop-filter: blur(10px);
}

.section h3 {
  margin: 0 0 15px 0;
  color: #fff;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  backdrop-filter: blur(5px);
}

.demo-area {
  text-align: center;
}

.demo-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.demo-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.demo-text {
  margin-top: 15px;
  font-size: 14px;
  opacity: 0.9;
}
</style>
