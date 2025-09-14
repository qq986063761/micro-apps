<template>
  <div class="home">
    <div class="welcome-section">
      <h1>欢迎使用微前端管理系统</h1>
      <p class="subtitle">基于 Vue2 + qiankun 构建的现代化微前端架构</p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">👥</div>
        <h3>用户管理</h3>
        <p>管理用户信息、权限和系统设置</p>
        <router-link to="/user" class="feature-link">进入用户管理</router-link>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📦</div>
        <h3>商品管理</h3>
        <p>管理商品信息、分类和订单</p>
        <router-link to="/product" class="feature-link">进入商品管理</router-link>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔧</div>
        <h3>系统设置</h3>
        <p>主题切换、语言设置等</p>
        <button @click="showSettings = true" class="feature-link">系统设置</button>
      </div>
    </div>

    <div class="stats-section">
      <h2>系统概览</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">当前主题</span>
          <span class="stat-value">{{ theme === 'light' ? '浅色模式' : '深色模式' }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">用户角色</span>
          <span class="stat-value">{{ userInfo.role === 'admin' ? '管理员' : '普通用户' }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">系统状态</span>
          <span class="stat-value status-active">运行中</span>
        </div>
      </div>
    </div>

    <!-- 设置模态框 -->
    <div v-if="showSettings" class="modal-overlay" @click="showSettings = false">
      <div class="modal" @click.stop>
        <h3>系统设置</h3>
        <div class="setting-item">
          <label>主题模式:</label>
          <select v-model="selectedTheme" @change="updateTheme">
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
          </select>
        </div>
        <div class="setting-item">
          <label>语言:</label>
          <select v-model="selectedLanguage" @change="updateLanguage">
            <option value="zh-CN">中文</option>
            <option value="en-US">English</option>
          </select>
        </div>
        <div class="modal-actions">
          <button @click="showSettings = false" class="cancel-btn">取消</button>
          <button @click="saveSettings" class="save-btn">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { setGlobalState } from '../micro-apps'

export default {
  name: 'HomeView',
  data() {
    return {
      showSettings: false,
      selectedTheme: 'light',
      selectedLanguage: 'zh-CN'
    }
  },
  computed: {
    ...mapState(['userInfo', 'theme', 'language'])
  },
  methods: {
    ...mapMutations(['setTheme', 'setLanguage']),
    updateTheme() {
      this.setTheme(this.selectedTheme)
      setGlobalState({ theme: this.selectedTheme })
    },
    updateLanguage() {
      this.setLanguage(this.selectedLanguage)
      setGlobalState({ language: this.selectedLanguage })
    },
    saveSettings() {
      this.updateTheme()
      this.updateLanguage()
      this.showSettings = false
    }
  },
  mounted() {
    this.selectedTheme = this.theme
    this.selectedLanguage = this.language
  }
}
</script>

<style lang="scss" scoped>
.home {
  .welcome-section {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #666;
      margin: 0;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }

      .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.3rem;
      }

      p {
        color: #666;
        margin: 0 0 1.5rem 0;
        line-height: 1.6;
      }

      .feature-link {
        display: inline-block;
        background: #667eea;
        color: white;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        transition: background-color 0.3s ease;

        &:hover {
          background: #5a6fd8;
        }
      }
    }
  }

  .stats-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0 0 1.5rem 0;
      color: #333;
      text-align: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;

        .stat-label {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          color: #333;
          font-weight: 600;
          font-size: 1.1rem;

          &.status-active {
            color: #4caf50;
          }
        }
      }
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    max-width: 90vw;

    h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .setting-item {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #666;
        font-weight: 500;
      }

      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.9rem;

        &:focus {
          outline: none;
          border-color: #667eea;
        }
      }
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;

        &.cancel-btn {
          background: #f5f5f5;
          color: #666;

          &:hover {
            background: #e0e0e0;
          }
        }

        &.save-btn {
          background: #667eea;
          color: white;

          &:hover {
            background: #5a6fd8;
          }
        }
      }
    }
  }
}
</style>
