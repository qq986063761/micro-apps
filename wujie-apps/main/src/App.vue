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
    console.log('主应用已挂载，微前端应用引用:', {
      child1: this.$refs.wujie1,
      child2: this.$refs.wujie2
    });
    
    // 暴露 child2Modal 方法到全局，供子应用调用
    window.child2Modal = {
      show: this.showChild2Modal,
      showWithInput: this.showChild2ModalWithInput
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
      console.log('[主应用] 切换到 Child1 应用');
      // 延迟检查 wujie 实例
      this.$nextTick(() => {
        console.log('[主应用] Child1 wujie 实例:', this.$refs.wujie1);
      });
    },
    showChild2() {
      this.currentView = 'child2';
      console.log('[主应用] 切换到 Child2 应用');
      // 延迟检查 wujie 实例
      this.$nextTick(() => {
        console.log('[主应用] Child2 wujie 实例:', this.$refs.wujie2);
      });
    },
    // 通过 wujie2 调用 Child2 的弹窗方法
    showChild2Modal(title, message) {
      console.log('[主应用] 调用 Child2 弹窗:', { title, message });
      
      // 确保 Child2 可见
      if (this.currentView !== 'child2') {
        this.currentView = 'child2';
      }

      const childWindow = window.document.querySelector("iframe[name=child2]").contentWindow
      childWindow.child2Modal.show(title, message, (data) => {
        console.log('[主应用] 成功调用 Child2 弹窗', data);
      })
    },
    showChild2ModalWithInput(title, message) {
      console.log('[主应用] 调用 Child2 输入弹窗:', { title, message });
      
      // 确保 Child2 可见
      if (this.currentView !== 'child2') {
        this.currentView = 'child2';
      }
      
      // 获取子应用的 window 对象
      this.getChild2Window().then(childWindow => {
        if (childWindow && childWindow.child2Modal && childWindow.child2Modal.showWithInput) {
          childWindow.child2Modal.showWithInput(title, message);
          console.log('[主应用] 成功调用 Child2 输入弹窗');
        } else {
          console.log('[主应用] Child2 输入弹窗方法暂不可用');
        }
      }).catch(error => {
        console.error('[主应用] 获取 Child2 window 失败:', error);
      });
    },
    // 获取 Child2 应用的 window 对象
    getChild2Window() {
      return new Promise((resolve, reject) => {
        const maxRetries = 10;
        let retryCount = 0;
        
        const tryGetWindow = () => {
          retryCount++;
          console.log(`[主应用] 尝试获取 Child2 window (第${retryCount}次)`);
          
          // 方法1: 通过 wujie 实例获取
          if (this.$refs.wujie2) {
            const wujieInstance = this.$refs.wujie2;
            console.log('[主应用] wujie2 实例:', wujieInstance);
            
            // 尝试通过 wujie 的 getWindow 方法
            if (wujieInstance.getWindow && typeof wujieInstance.getWindow === 'function') {
              try {
                const childWindow = wujieInstance.getWindow();
                if (childWindow) {
                  console.log('[主应用] 通过 wujie.getWindow() 获取到 Child2 window');
                  resolve(childWindow);
                  return;
                }
              } catch (error) {
                console.log('[主应用] wujie.getWindow() 失败:', error);
              }
            }
            
            // 方法2: 通过 iframe 获取
            if (wujieInstance.$el) {
              const iframe = wujieInstance.$el.querySelector('iframe');
              if (iframe && iframe.contentWindow) {
                console.log('[主应用] 通过 iframe.contentWindow 获取到 Child2 window');
                resolve(iframe.contentWindow);
                return;
              }
            }
          }
          
          // 方法3: 通过 wujie 全局方法获取
          if (window.$wujie && window.$wujie.getWindow) {
            try {
              const childWindow = window.$wujie.getWindow('child2');
              if (childWindow) {
                console.log('[主应用] 通过 window.$wujie.getWindow() 获取到 Child2 window');
                resolve(childWindow);
                return;
              }
            } catch (error) {
              console.log('[主应用] window.$wujie.getWindow() 失败:', error);
            }
          }
          
          // 如果还没获取到，重试
          if (retryCount < maxRetries) {
            setTimeout(tryGetWindow, 200);
          } else {
            reject(new Error('无法获取 Child2 window 对象'));
          }
        };
        
        tryGetWindow();
      });
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
