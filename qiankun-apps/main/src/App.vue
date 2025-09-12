<template>
  <div id="app">
    <div class="header">
      <h1>Qiankun 微前端 Demo</h1>
      <nav class="nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/child1" class="nav-link">用户管理</router-link>
        <router-link to="/child2" class="nav-link">商品管理</router-link>
      </nav>
      <div class="user-info">
        <span>欢迎，{{ user.name }}</span>
        <button @click="toggleTheme" class="theme-toggle">
          {{ theme === 'light' ? '🌙' : '☀️' }}
        </button>
      </div>
    </div>
    
    <div class="content">
      <router-view />
      
      <!-- 子应用容器 -->
      <div id="child1-container" v-show="$route.path.startsWith('/child1')"></div>
      <div id="child2-container" v-show="$route.path.startsWith('/child2')"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['user', 'globalData'])
  },
  data() {
    return {
      theme: 'light'
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      // 通知子应用主题变化
      if (window.microAppActions) {
        window.microAppActions.setGlobalState({
          theme: this.theme
        })
      }
    }
  },
  mounted() {
    // 监听全局状态变化
    if (window.microAppActions) {
      window.microAppActions.onGlobalStateChange((state) => {
        this.theme = state.theme || 'light'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  background: #42b983;
  color: white;
  padding: 20px;
  text-align: center;
}

.header h1 {
  margin: 0 0 20px 0;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}

.content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.home {
  text-align: center;
  padding: 40px 20px;
}

.home h2 {
  color: #42b983;
  margin-bottom: 20px;
}

.home p {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}
</style>
