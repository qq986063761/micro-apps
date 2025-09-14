<template>
  <div id="app" :class="themeClass">
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">微前端管理系统</h1>
        <div class="header-actions">
          <div class="user-info">
            <img :src="userInfo.avatar" :alt="userInfo.name" class="user-avatar">
            <span class="user-name">{{ userInfo.name }}</span>
          </div>
          <button @click="toggleTheme" class="theme-toggle">
            {{ theme === 'light' ? '🌙' : '☀️' }}
          </button>
        </div>
      </div>
    </header>

    <nav class="app-nav">
      <router-link to="/" class="nav-item">首页</router-link>
      <a href="#/user" class="nav-item">用户管理</a>
      <a href="#/product" class="nav-item">商品管理</a>
      <router-link to="/about" class="nav-item">关于</router-link>
    </nav>

    <main class="app-main">
      <router-view/>
      <div id="subapp-viewport" class="subapp-container"></div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { onGlobalStateChange, setGlobalState } from './micro-apps'

export default {
  name: 'App',
  computed: {
    ...mapState(['userInfo', 'theme']),
    themeClass() {
      return `theme-${this.theme}`
    }
  },
  methods: {
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      this.$store.commit('setTheme', newTheme)
      setGlobalState({ theme: newTheme })
    }
  },
  mounted() {
    // 监听全局状态变化
    onGlobalStateChange((state, prev) => {
      console.log('全局状态变化:', state, prev)
      if (state.theme !== this.theme) {
        this.$store.commit('setTheme', state.theme)
      }
      if (state.user && state.user !== this.userInfo) {
        this.$store.commit('setUserInfo', state.user)
      }
    })
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  transition: all 0.3s ease;

  &.theme-light {
    background-color: #f5f5f5;
    color: #333;
  }

  &.theme-dark {
    background-color: #1a1a1a;
    color: #fff;
  }
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .app-title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .user-name {
    font-weight: 500;
  }

  .theme-toggle {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background-color 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.app-nav {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;

  .theme-dark & {
    background: #2a2a2a;
    border-bottom-color: #444;
  }

  .nav-item {
    padding: 1rem 0;
    text-decoration: none;
    color: #666;
    font-weight: 500;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;

    .theme-dark & {
      color: #ccc;
    }

    &:hover {
      color: #667eea;
    }

    &.router-link-exact-active {
      color: #667eea;
      border-bottom-color: #667eea;
    }

    // 为 hash 链接添加激活状态样式
    &[href="#/user"]:target,
    &[href="#/product"]:target {
      color: #667eea;
      border-bottom-color: #667eea;
    }
  }
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.subapp-container {
  min-height: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  margin-top: 2rem;

  .theme-dark & {
    background: #2a2a2a;
    border-color: #444;
  }
}

// 微前端应用样式隔离
#subapp-viewport {
  .child1-app {
    padding: 1rem;
  }

  .child2-app {
    padding: 1rem;
  }
}
</style>
