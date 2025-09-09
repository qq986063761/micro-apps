<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
    <div class="micro-apps">
      <h2>微前端应用</h2>
      
      <div class="app-section">
        <h3>Child1 应用组件</h3>
        <div v-if="child1Loading" class="loading">加载中...</div>
        <div v-else-if="child1Error" class="error">加载失败: {{ child1Error }}</div>
        <div v-else>
          <Child1HelloWorld v-if="Child1HelloWorld" />
          <Child1AboutView v-if="Child1AboutView" />
        </div>
      </div>
      
      <div class="app-section">
        <h3>Child2 应用组件</h3>
        <div v-if="child2Loading" class="loading">加载中...</div>
        <div v-else-if="child2Error" class="error">加载失败: {{ child2Error }}</div>
        <div v-else>
          <Child2HelloWorld v-if="Child2HelloWorld" />
          <Child2HomeView v-if="Child2HomeView" />
        </div>
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
    HelloWorld
  },
  data() {
    return {
      child1Loading: true,
      child2Loading: true,
      child1Error: null,
      child2Error: null,
      Child1HelloWorld: null,
      Child1AboutView: null,
      Child2HelloWorld: null,
      Child2HomeView: null
    }
  },
  async mounted() {
    await this.loadChild1Components()
    await this.loadChild2Components()
  },
  methods: {
    async loadChild1Components() {
      try {
        this.child1Loading = true
        this.child1Error = null
        
        // 动态导入 child1 的组件
        const { default: HelloWorld } = await import('child1/HelloWorld')
        const { default: AboutView } = await import('child1/AboutView')
        
        this.Child1HelloWorld = HelloWorld
        this.Child1AboutView = AboutView
      } catch (error) {
        console.error('加载 child1 组件失败:', error)
        this.child1Error = error.message
      } finally {
        this.child1Loading = false
      }
    },
    
    async loadChild2Components() {
      try {
        this.child2Loading = true
        this.child2Error = null
        
        // 动态导入 child2 的组件
        const { default: HelloWorld } = await import('child2/HelloWorld')
        const { default: HomeView } = await import('child2/HomeView')
        
        this.Child2HelloWorld = HelloWorld
        this.Child2HomeView = HomeView
      } catch (error) {
        console.error('加载 child2 组件失败:', error)
        this.child2Error = error.message
      } finally {
        this.child2Loading = false
      }
    }
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
</style>
