<template>
  <div class="user-settings">
    <h3>系统设置</h3>
    <div class="settings-content">
      <div class="setting-section">
        <h4>主题设置</h4>
        <div class="setting-item">
          <label>主题模式:</label>
          <select v-model="selectedTheme" @change="updateTheme">
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
          </select>
        </div>
      </div>

      <div class="setting-section">
        <h4>通知设置</h4>
        <div class="setting-item">
          <label>
            <input type="checkbox" v-model="notifications.email" @change="updateNotifications">
            邮件通知
          </label>
        </div>
        <div class="setting-item">
          <label>
            <input type="checkbox" v-model="notifications.sms" @change="updateNotifications">
            短信通知
          </label>
        </div>
      </div>

      <div class="setting-section">
        <h4>数据管理</h4>
        <div class="setting-item">
          <button @click="exportData" class="export-btn">导出数据</button>
          <button @click="clearCache" class="clear-btn">清除缓存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserSettings',
  data() {
    return {
      selectedTheme: 'light',
      notifications: {
        email: true,
        sms: false
      }
    }
  },
  methods: {
    ...mapActions(['updateGlobalState']),
    updateTheme() {
      this.updateGlobalState({
        theme: this.selectedTheme,
        source: 'child1-settings'
      })
    },
    updateNotifications() {
      this.updateGlobalState({
        notifications: this.notifications,
        source: 'child1-settings'
      })
    },
    exportData() {
      // 导出数据逻辑
      console.log('导出数据')
    },
    clearCache() {
      // 清除缓存逻辑
      console.log('清除缓存')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-settings {
  h3 {
    margin: 0 0 2rem 0;
    color: #333;
  }

  .settings-content {
    .setting-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;

      h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1.1rem;
      }

      .setting-item {
        margin-bottom: 1rem;

        label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-weight: 500;
        }

        select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.9rem;
          margin-left: 1rem;

          &:focus {
            outline: none;
            border-color: #667eea;
          }
        }

        input[type="checkbox"] {
          margin-right: 0.5rem;
        }

        .export-btn, .clear-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          margin-right: 1rem;

          &.export-btn {
            background: #4caf50;
            color: white;

            &:hover {
              background: #45a049;
            }
          }

          &.clear-btn {
            background: #f44336;
            color: white;

            &:hover {
              background: #da190b;
            }
          }
        }
      }
    }
  }
}
</style>
