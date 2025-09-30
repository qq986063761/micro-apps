<template>
  <div class="global-state-example">
    <h3>全局状态管理示例</h3>
    
    <!-- 用户信息 -->
    <div class="user-info">
      <h4>用户信息</h4>
      <p>姓名: {{ userInfo.name }}</p>
      <p>角色: {{ userInfo.role }}</p>
      <button @click="updateUser">更新用户信息</button>
    </div>
    
    <!-- 主题切换 -->
    <div class="theme-control">
      <h4>主题控制</h4>
      <p>当前主题: {{ theme }}</p>
      <button @click="toggleTheme">切换主题</button>
    </div>
    
    <!-- 语言设置 -->
    <div class="language-control">
      <h4>语言设置</h4>
      <p>当前语言: {{ language }}</p>
      <button @click="switchLanguage">切换语言</button>
    </div>
    
    <!-- 消息通知 -->
    <div class="message-control">
      <h4>消息通知</h4>
      <button @click="showMessage">显示消息</button>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
    
    <!-- 子应用状态 -->
    <div class="child-app-states">
      <h4>子应用状态</h4>
      <pre>{{ JSON.stringify(childAppStates, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'GlobalStateExample',
  computed: {
    ...mapState([
      'userInfo',
      'theme',
      'language',
      'message',
      'childAppStates'
    ])
  },
  methods: {
    ...mapActions([
      'updateUserInfo',
      'toggleTheme',
      'updateLanguage',
      'showMessage'
    ]),
    
    updateUser() {
      this.updateUserInfo({
        name: 'Updated Admin',
        role: 'super-admin'
      })
    },
    
    switchLanguage() {
      const newLang = this.language === 'zh-CN' ? 'en-US' : 'zh-CN'
      this.updateLanguage(newLang)
    }
  }
}
</script>

<style scoped>
.global-state-example {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
}

.user-info,
.theme-control,
.language-control,
.message-control,
.child-app-states {
  margin: 15px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.message {
  color: #28a745;
  font-weight: bold;
  margin-top: 10px;
}

pre {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
