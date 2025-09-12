<template>
  <div class="settings">
    <div class="settings-header">
      <h2>系统设置</h2>
    </div>
    
    <div class="settings-content">
      <div class="settings-section">
        <h3>通知设置</h3>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" v-model="settings.emailNotifications">
            邮件通知
          </label>
          <p class="setting-desc">接收系统邮件通知</p>
        </div>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" v-model="settings.pushNotifications">
            推送通知
          </label>
          <p class="setting-desc">接收浏览器推送通知</p>
        </div>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" v-model="settings.smsNotifications">
            短信通知
          </label>
          <p class="setting-desc">接收重要短信通知</p>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>隐私设置</h3>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" v-model="settings.profilePublic">
            公开个人资料
          </label>
          <p class="setting-desc">允许其他用户查看您的个人资料</p>
        </div>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" v-model="settings.showOnlineStatus">
            显示在线状态
          </label>
          <p class="setting-desc">向其他用户显示您的在线状态</p>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>界面设置</h3>
        <div class="setting-item">
          <label class="setting-label">主题模式:</label>
          <select v-model="settings.theme" class="setting-select">
            <option value="light">浅色模式</option>
            <option value="dark">深色模式</option>
            <option value="auto">跟随系统</option>
          </select>
        </div>
        <div class="setting-item">
          <label class="setting-label">语言:</label>
          <select v-model="settings.language" class="setting-select">
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
          </select>
        </div>
        <div class="setting-item">
          <label class="setting-label">时区:</label>
          <select v-model="settings.timezone" class="setting-select">
            <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
            <option value="America/New_York">纽约时间 (UTC-5)</option>
            <option value="Europe/London">伦敦时间 (UTC+0)</option>
            <option value="Asia/Tokyo">东京时间 (UTC+9)</option>
          </select>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>安全设置</h3>
        <div class="setting-item">
          <label class="setting-label">自动登出时间:</label>
          <select v-model="settings.autoLogout" class="setting-select">
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
            <option value="120">2小时</option>
            <option value="480">8小时</option>
            <option value="0">从不</option>
          </select>
        </div>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" v-model="settings.twoFactorAuth">
            启用双因素认证
          </label>
          <p class="setting-desc">为您的账户添加额外的安全保护</p>
        </div>
      </div>
      
      <div class="settings-actions">
        <button @click="saveSettings" class="btn btn-primary">保存设置</button>
        <button @click="resetSettings" class="btn btn-secondary">重置为默认</button>
        <button @click="exportSettings" class="btn btn-outline">导出设置</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      settings: {
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        profilePublic: true,
        showOnlineStatus: true,
        theme: 'light',
        language: 'zh-CN',
        timezone: 'Asia/Shanghai',
        autoLogout: 60,
        twoFactorAuth: false
      },
      originalSettings: {}
    }
  },
  mounted() {
    this.originalSettings = { ...this.settings }
  },
  methods: {
    saveSettings() {
      // 模拟保存设置
      this.$message = this.$message || { success: (msg) => alert(msg) }
      this.$message.success('设置保存成功！')
      this.originalSettings = { ...this.settings }
    },
    resetSettings() {
      if (confirm('确定要重置所有设置为默认值吗？')) {
        this.settings = {
          emailNotifications: true,
          pushNotifications: false,
          smsNotifications: false,
          profilePublic: true,
          showOnlineStatus: true,
          theme: 'light',
          language: 'zh-CN',
          timezone: 'Asia/Shanghai',
          autoLogout: 60,
          twoFactorAuth: false
        }
      }
    },
    exportSettings() {
      const dataStr = JSON.stringify(this.settings, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'user-settings.json'
      link.click()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.settings-content {
  max-width: 800px;
  margin: 0 auto;
}

.settings-section {
  background: white;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.settings-section h3 {
  margin: 0 0 20px 0;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.setting-item {
  margin-bottom: 20px;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.setting-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #007bff;
}

.setting-desc {
  margin: 0;
  color: #666;
  font-size: 14px;
  margin-left: 28px;
}

.setting-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  min-width: 200px;
}

.settings-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary { 
  background: #007bff; 
  color: white; 
}

.btn-secondary { 
  background: #6c757d; 
  color: white; 
}

.btn-outline { 
  background: transparent; 
  color: #007bff; 
  border: 2px solid #007bff; 
}

.btn:hover { 
  opacity: 0.8; 
  transform: translateY(-1px);
}

.btn-outline:hover {
  background: #007bff;
  color: white;
}

@media (max-width: 768px) {
  .settings-actions {
    flex-direction: column;
  }
  
  .setting-select {
    min-width: 100%;
  }
}
</style>
