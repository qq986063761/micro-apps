<template>
  <div id="app" class="child1-app">
    <div class="app-header">
      <h2>用户管理系统</h2>
      <div class="header-info">
        <input type="text" v-model="inputValue" />
        <span class="user-count">用户总数: {{ userCount }}</span>
        <button @click="refreshData" class="refresh-btn">刷新</button>
      </div>
    </div>
    
    <div class="app-content">
      <nav class="app-nav">
        <router-link to="/user/list" class="nav-item">用户列表</router-link>
        <router-link to="/user/profile" class="nav-item">个人资料</router-link>
        <router-link to="/user/settings" class="nav-item">系统设置</router-link>
      </nav>
      
      <main class="app-main">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      inputValue: ''
    }
  },
  computed: {
    ...mapState(['userCount'])
  },
  methods: {
    ...mapActions(['fetchUsers', 'updateGlobalState']),
    refreshData() {
      this.fetchUsers()
      // 向主应用发送数据更新通知
      this.updateGlobalState({
        lastUpdate: new Date().toISOString(),
        source: 'child1'
      })
    }
  },
  mounted() {
    console.log('child1 mounted')
    this.fetchUsers()
  }
}
</script>

<style lang="scss">
.child1-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f8f9fa;
  min-height: 100vh;

  .app-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 1rem;

      .user-count {
        font-size: 0.9rem;
        opacity: 0.9;
      }

      .refresh-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  .app-content {
    padding: 2rem;
  }

  .app-nav {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;

    .nav-item {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: #f0f0f0;
        color: #667eea;
      }

      &.router-link-exact-active {
        background: #667eea;
        color: white;
      }
    }
  }

  .app-main {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

// 测试 css 隔离
// #app {
//   background: black;
// }
</style>
