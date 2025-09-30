<template>
  <div class="settings-view">
    <h2>⚙️ 设置</h2>
    <div class="settings-content">
      <div class="settings-section">
        <h3>账户设置</h3>
        <div class="setting-item">
          <label>用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <div class="setting-item">
          <label>邮箱</label>
          <input type="email" v-model="email" placeholder="请输入邮箱">
        </div>
        <div class="setting-item">
          <label>手机号</label>
          <input type="tel" v-model="phone" placeholder="请输入手机号">
        </div>
      </div>

      <div class="settings-section">
        <h3>通知设置</h3>
        <div class="setting-item">
          <label>邮件通知</label>
          <label class="switch">
            <input type="checkbox" v-model="emailNotification">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <label>短信通知</label>
          <label class="switch">
            <input type="checkbox" v-model="smsNotification">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <label>推送通知</label>
          <label class="switch">
            <input type="checkbox" v-model="pushNotification">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h3>隐私设置</h3>
        <div class="setting-item">
          <label>公开个人资料</label>
          <label class="switch">
            <input type="checkbox" v-model="publicProfile">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <label>显示在线状态</label>
          <label class="switch">
            <input type="checkbox" v-model="showOnlineStatus">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h3>主题设置</h3>
        <div class="theme-options">
          <div class="theme-option" :class="{ active: theme === 'light' }" @click="theme = 'light'">
            <div class="theme-preview light"></div>
            <span>浅色主题</span>
          </div>
          <div class="theme-option" :class="{ active: theme === 'dark' }" @click="theme = 'dark'">
            <div class="theme-preview dark"></div>
            <span>深色主题</span>
          </div>
          <div class="theme-option" :class="{ active: theme === 'auto' }" @click="theme = 'auto'">
            <div class="theme-preview auto"></div>
            <span>跟随系统</span>
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <button class="btn btn-primary" @click="saveSettings">保存设置</button>
        <button class="btn btn-secondary" @click="resetSettings">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsView',
  data() {
    return {
      username: '用户名',
      email: 'user@example.com',
      phone: '138****8888',
      emailNotification: true,
      smsNotification: false,
      pushNotification: true,
      publicProfile: true,
      showOnlineStatus: true,
      theme: 'light'
    }
  },
  methods: {
    saveSettings() {
      console.log('[Child1] 保存设置:', {
        username: this.username,
        email: this.email,
        phone: this.phone,
        emailNotification: this.emailNotification,
        smsNotification: this.smsNotification,
        pushNotification: this.pushNotification,
        publicProfile: this.publicProfile,
        showOnlineStatus: this.showOnlineStatus,
        theme: this.theme
      })
      alert('设置已保存！')
    },
    resetSettings() {
      this.username = '用户名'
      this.email = 'user@example.com'
      this.phone = '138****8888'
      this.emailNotification = true
      this.smsNotification = false
      this.pushNotification = true
      this.publicProfile = true
      this.showOnlineStatus = true
      this.theme = 'light'
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.settings-view {
  padding: 20px;
  color: #2c3e50;

  h2 {
    margin-bottom: 30px;
    color: #667eea;
    font-size: 2em;
  }

  .settings-content {
    .settings-section {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;

      h3 {
        margin: 0 0 20px 0;
        color: #2c3e50;
        border-bottom: 2px solid #667eea;
        padding-bottom: 10px;
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }

        label {
          font-weight: bold;
          color: #2c3e50;
        }

        input[type="text"], input[type="email"], input[type="tel"] {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 200px;
        }
      }

      .theme-options {
        display: flex;
        gap: 20px;

        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          padding: 10px;
          border-radius: 8px;
          transition: all 0.3s;

          &.active {
            background: #667eea;
            color: white;
          }

          .theme-preview {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-bottom: 8px;
            border: 2px solid #ddd;

            &.light {
              background: linear-gradient(45deg, #fff 50%, #f0f0f0 50%);
            }

            &.dark {
              background: linear-gradient(45deg, #333 50%, #666 50%);
            }

            &.auto {
              background: linear-gradient(45deg, #fff 50%, #333 50%);
            }
          }

          span {
            font-size: 0.9em;
          }
        }
      }
    }

    .settings-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;

      .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s;

        &.btn-primary {
          background: #667eea;
          color: white;

          &:hover {
            background: #5a6fd8;
          }
        }

        &.btn-secondary {
          background: #6c757d;
          color: white;

          &:hover {
            background: #5a6268;
          }
        }
      }
    }
  }
}

// 开关样式
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background-color: #667eea;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
}
</style>
