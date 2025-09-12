<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
    <div class="micro-apps">
      <h2>微前端应用</h2>
      
      <div class="app-section">
        <h3>Child1 应用组件</h3>
        <Child1Button />
        <!-- <Child1HelloWorld />
        <Child1AboutView /> -->
      </div>
      
      <div class="app-section">
        <h3>Child2 应用组件</h3>
        <!-- <Child2HelloWorld />
        <Child2HomeView /> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Child1Button: () => import('child1/Button'),
    // Child1HelloWorld: () => import('child1/HelloWorld'),
    // Child1AboutView: () => import('child1/AboutView'),
    // Child2HelloWorld: () => import('child2/HelloWorld'),
    // Child2HomeView: () => import('child2/HomeView')
  }
}
</script>

<style scoped>
.micro-apps {
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.app-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.app-section h3 {
  margin-top: 0;
  color: #42b983;
}

.loading {
  color: #666;
  font-style: italic;
}

.error {
  color: #e74c3c;
  font-weight: bold;
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.retry-btn:hover {
  background-color: #369870;
}

.component-error {
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ffcdd2;
  text-align: center;
  font-weight: bold;
}
</style>
