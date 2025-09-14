<template>
  <div id="app">
    <div class="child2-app">
      <header class="app-header">
        <h1>Child2 应用</h1>
        <p>电商管理平台 - 路由测试</p>
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

      <!-- 路由信息显示 -->
      <div class="route-info">
        <p>当前路由: <strong>{{ $route.path }}</strong></p>
        <p>路由名称: <strong>{{ $route.name }}</strong></p>
        <button @click="goBack" class="back-btn" :disabled="!canGoBack">浏览器返回</button>
        <button @click="showModal" class="modal-btn">显示弹窗</button>
      </div>

      <!-- 路由内容区域 -->
      <main class="app-content">
        <router-view />
      </main>
    </div>

    <!-- 弹窗组件 -->
    <Modal
      :visible="modalVisible"
      :title="modalTitle"
      :message="modalMessage"
      :showInput="modalShowInput"
      @close="closeModal"
      @confirm="handleModalConfirm"
    />
  </div>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    Modal
  },
  data() {
    return {
      tabs: [
        { name: 'home', path: '/', label: '首页', icon: '🏠' },
        { name: 'products', path: '/products', label: '商品管理', icon: '🛍️' },
        { name: 'orders', path: '/orders', label: '订单管理', icon: '📦' },
        { name: 'analytics', path: '/analytics', label: '数据分析', icon: '📈' },
        { name: 'about', path: '/about', label: '关于', icon: 'ℹ️' }
      ],
      canGoBack: false,
      modalVisible: false,
      modalTitle: 'Child2 弹窗',
      modalMessage: '这是来自 Child2 应用的弹窗组件！',
      modalShowInput: false
    }
  },
  mounted() {
    console.log('[Child2] App 已挂载')
    this.updateCanGoBack()
    
    // 监听浏览器返回按钮
    window.addEventListener('popstate', this.handlePopState)
    
    // 暴露弹窗方法到全局，供其他应用调用
    window.child2Modal = {
      show: this.showModalFromExternal
    }
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.handlePopState)
    // 清理全局方法
    if (window.child2Modal) {
      delete window.child2Modal
    }
  },
  methods: {
    goBack() {
      if (this.canGoBack) {
        this.$router.back()
      }
    },
    handlePopState() {
      console.log('[Child2] 检测到浏览器返回按钮点击')
      this.updateCanGoBack()
    },
    updateCanGoBack() {
      this.canGoBack = window.history.length > 1
    },
    // 弹窗相关方法
    showModal() {
      this.modalVisible = true
      this.modalTitle = 'Child2 弹窗'
      this.modalMessage = '这是来自 Child2 应用的弹窗组件！'
      this.modalShowInput = false
    },
    closeModal() {
      this.modalVisible = false
    },
    handleModalConfirm(value) {
      console.log('[Child2] 弹窗确认，输入值:', value)
      this.modalVisible = false
      if (value) {
        alert(`您输入的内容是: ${value}`)
      }
    },
    // 供外部应用调用的方法
    showModalFromExternal(title, message, cb) {
      this.modalTitle = title || 'Child2 弹窗'
      this.modalMessage = message || '这是来自 Child2 应用的弹窗组件！'
      this.modalShowInput = false
      this.modalVisible = true

      cb && cb({ value: '123' })
    },
  },
  watch: {
    '$route'(to, from) {
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

.child2-app {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

    .back-btn, .modal-btn {
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

    .modal-btn {
      background: #ff6b6b;
      
      &:hover:not(:disabled) {
        background: #ff5252;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .child2-app {
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
