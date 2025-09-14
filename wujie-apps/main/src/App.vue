<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <button @click="showChild1" :class="{ active: currentView === 'child1' }">Child1</button> |
      <button @click="showChild2" :class="{ active: currentView === 'child2' }">Child2</button>
    </nav>
    
    <!-- 微前端应用展示区域 -->
    <div class="micro-apps-container" v-show="currentView !== 'main'">
      <div class="app-section" v-show="currentView === 'child1'">
        <h2>Child1 微前端应用</h2>
        <WujieVue
          width="100%"
          height="500px"
          name="child1"
          url="http://localhost:8081"
          :sync="false"
        />
      </div>
      
      <div class="app-section" v-show="currentView === 'child2'">
        <h2>Child2 微前端应用</h2>
        <WujieVue
          width="100%"
          height="500px"
          name="child2"
          url="http://localhost:8082"
          :sync="false"
        />
      </div>
    </div>
    
    <!-- 路由视图区域 -->
    <router-view v-show="currentView === 'main'"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentView: 'main' // 'main', 'child1', 'child2'
    }
  },
  mounted() {
    // 暴露 child2Modal 方法到全局，供子应用调用
    window.child2Modal = {
      show: this.showChild2Modal
    };
  },
  beforeDestroy() {
    // 清理全局方法
    if (window.child2Modal) {
      delete window.child2Modal;
    }
  },
  methods: {
    handleChild1Ready() {
      console.log('[主应用] Child1 加载完毕');
    },
    handleChild2Ready() {
      console.log('[主应用] Child2 加载完毕');
    },
    showChild1() {
      this.currentView = 'child1';
      console.log('[主应用] 切换到 Child1 应用')
    },
    showChild2() {
      this.currentView = 'child2';
      console.log('[主应用] 切换到 Child2 应用')
    },
    // 通过 wujie2 调用 Child2 的弹窗方法
    showChild2Modal(title, message) {
      // 确保 Child2 可见
      if (this.currentView !== 'child2') {
        this.currentView = 'child2';
      }

      const { child2 } = window.$microApp.apps
      child2.window.$microApp.useComponent({
        component: 'child2Modal',
        method: 'show',
        args: [title, message, (data) => {
          console.log('[主应用] 成功调用 Child2 弹窗', data);
        }]
      })
    },
  },
  watch: {
    '$route'(to, from) {
      // 当路由变化时，显示主应用内容
      this.currentView = 'main';
      console.log('路由变化，切换到主应用视图');
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  button {
    background: none;
    border: none;
    font-weight: bold;
    color: #2c3e50;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }

    &.active {
      color: #42b983;
      background-color: #e8f5e8;
    }
  }

}

.micro-apps-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  
  .app-section {
    flex: 1;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background-color: #fafafa;
    
    h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #2c3e50;
      font-size: 1.5em;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .micro-apps-container {
    flex-direction: column;
    padding: 10px;
    
    .app-section {
      margin-bottom: 20px;
    }
  }
}
</style>
