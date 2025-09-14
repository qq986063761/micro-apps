<template>
  <div class="global-state-consumer">
    <h3>子应用全局状态消费示例</h3>
    
    <!-- 显示从主应用同步的全局状态 -->
    <div class="global-info">
      <h4>从主应用同步的状态</h4>
      <p>全局用户: {{ globalUser ? globalUser.name : '未同步' }}</p>
      <p>全局主题: {{ globalTheme || '未同步' }}</p>
      <p>全局语言: {{ globalLanguage || '未同步' }}</p>
    </div>
    
    <!-- 向主应用发送状态更新 -->
    <div class="send-to-main">
      <h4>向主应用发送更新</h4>
      <button @click="sendUserUpdate">发送用户更新</button>
      <button @click="sendThemeUpdate">发送主题更新</button>
      <button @click="sendMessage">发送消息</button>
    </div>
    
    <!-- 本地状态 -->
    <div class="local-state">
      <h4>本地状态</h4>
      <p>用户数量: {{ userCount }}</p>
      <p>活跃用户: {{ activeUsers.length }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GlobalStateConsumer',
  data() {
    return {
      globalUser: null,
      globalTheme: null,
      globalLanguage: null
    }
  },
  computed: {
    ...mapGetters(['userCount', 'activeUsers'])
  },
  mounted() {
    // 监听全局状态变化
    this.watchGlobalState()
  },
  methods: {
    ...mapActions(['updateGlobalState']),
    
    // 监听全局状态变化
    watchGlobalState() {
      if (window.__POWERED_BY_QIANKUN__ && window.microAppActions) {
        window.microAppActions.onGlobalStateChange((state, prevState) => {
          console.log('子应用收到全局状态变化:', state)
          this.globalUser = state.user
          this.globalTheme = state.theme
          this.globalLanguage = state.language
        }, true)
      }
    },
    
    // 向主应用发送用户更新
    sendUserUpdate() {
      this.updateGlobalState({
        user: {
          name: 'Child1 User',
          role: 'child-admin',
          lastUpdate: new Date().toISOString()
        }
      })
    },
    
    // 向主应用发送主题更新
    sendThemeUpdate() {
      this.updateGlobalState({
        theme: 'dark'
      })
    },
    
    // 向主应用发送消息
    sendMessage() {
      this.updateGlobalState({
        message: `来自子应用 child1 的消息: ${new Date().toLocaleTimeString()}`
      })
    }
  }
}
</script>

<style scoped>
.global-state-consumer {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
}

.global-info,
.send-to-main,
.local-state {
  margin: 15px 0;
  padding: 10px;
  background-color: #f0f8ff;
  border-radius: 4px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
