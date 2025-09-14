<template>
  <div id="app">
    <div class="child1-app">
      <header class="app-header">
        <h1>Child1 应用</h1>
        <p>微前端子应用 - 路由测试</p>
      </header>
      
      <!-- Tab 导航 -->
      <nav class="tab-nav">
        <router-link 
          v-for="tab in tabs" 
          :key="tab.name"
          :to="tab.path" 
          class="tab-link"
          :class="{ active: $route.path === tab.path }"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </router-link>
      </nav>

      <!-- 路由内容区域 -->
      <main class="app-content">
        <router-view />
      </main>

      <!-- 路由信息显示 -->
      <div class="route-info">
        <p>当前路由: <strong>{{ $route.path }}</strong></p>
        <p>路由名称: <strong>{{ $route.name }}</strong></p>
        <button @click="goBack" class="back-btn" :disabled="!canGoBack">浏览器返回</button>
        <button @click="callChild2Modal" class="cross-app-btn">调用 Child2 弹窗</button>
        <button @click="callChild2ModalWithInput" class="cross-app-btn">调用 Child2 输入弹窗</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tabs: [
        { name: 'home', path: '/', label: '首页', icon: '🏠' },
        { name: 'dashboard', path: '/dashboard', label: '仪表板', icon: '📊' },
        { name: 'profile', path: '/profile', label: '个人资料', icon: '👤' },
        { name: 'settings', path: '/settings', label: '设置', icon: '⚙️' },
        { name: 'about', path: '/about', label: '关于', icon: 'ℹ️' }
      ],
      canGoBack: false
    }
  },
  mounted() {
    console.log('[Child1] App 已挂载')
    this.updateCanGoBack()
    
    // 监听浏览器返回按钮
    window.addEventListener('popstate', this.handlePopState)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.handlePopState)
  },
  methods: {
    goBack() {
      if (this.canGoBack) {
        this.$router.go(-1)
      }
    },
    handlePopState() {
      console.log('[Child1] 检测到浏览器返回按钮点击')
      this.updateCanGoBack()
    },
    updateCanGoBack() {
      this.canGoBack = window.history.length > 1
    },
    // 跨应用通信方法
    callChild2Modal() {
      console.log('[Child1] 尝试调用 Child2 弹窗')
      
      // 通过主应用调用 Child2 弹窗
      if (window.parent && window.parent.child2Modal && window.parent.child2Modal.show) {
        window.parent.child2Modal.show('来自 Child1 的调用', '这是 Child1 应用调用 Child2 弹窗组件的演示！')
      } else {
        console.log('[Child1] 主应用的 Child2 弹窗方法暂不可用，请确保主应用和 Child2 应用已加载')
      }
    },
    callChild2ModalWithInput() {
      console.log('[Child1] 尝试调用 Child2 输入弹窗')
      
      // 通过主应用调用 Child2 输入弹窗
      if (window.parent && window.parent.child2Modal && window.parent.child2Modal.showWithInput) {
        window.parent.child2Modal.showWithInput('来自 Child1 的输入弹窗', '请输入一些内容：')
      } else {
        console.log('[Child1] 主应用的 Child2 输入弹窗方法暂不可用，请确保主应用和 Child2 应用已加载')
      }
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(`[Child1] 路由变化: ${from.path} -> ${to.path}`)
      this.updateCanGoBack()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.child1-app {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .app-header {
    text-align: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    h1 {
      margin: 0 0 10px 0;
      font-size: 2.5em;
    }

    p {
      margin: 0;
      font-size: 1.1em;
      opacity: 0.9;
    }
  }

  .tab-nav {
    display: flex;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    overflow-x: auto;

    .tab-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 20px;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.8);
      transition: all 0.3s;
      min-width: 100px;
      border-bottom: 3px solid transparent;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      &.active {
        color: white;
        background: rgba(255, 255, 255, 0.2);
        border-bottom-color: #4CAF50;
      }

      .tab-icon {
        font-size: 1.5em;
        margin-bottom: 5px;
      }

      .tab-label {
        font-size: 0.9em;
        font-weight: 500;
      }
    }
  }

  .app-content {
    flex: 1;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    color: #2c3e50;
    margin: 0;
    border-radius: 0;
  }

  .route-info {
    background: rgba(0, 0, 0, 0.2);
    padding: 15px 20px;
    text-align: center;
    font-size: 0.9em;

    p {
      margin: 5px 0;
      color: rgba(255, 255, 255, 0.9);
    }

    .back-btn, .cross-app-btn {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin: 5px;
      transition: background 0.3s;

      &:hover:not(:disabled) {
        background: #45a049;
      }

      &:disabled {
        background: #666;
        cursor: not-allowed;
      }
    }

    .cross-app-btn {
      background: #2196F3;
      
      &:hover:not(:disabled) {
        background: #1976D2;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .child1-app {
    .tab-nav {
      .tab-link {
        min-width: 80px;
        padding: 12px 15px;

        .tab-icon {
          font-size: 1.2em;
        }

        .tab-label {
          font-size: 0.8em;
        }
      }
    }

    .app-content {
      padding: 15px;
    }
  }
}
</style>
