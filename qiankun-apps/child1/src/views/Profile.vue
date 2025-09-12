<template>
  <div class="profile">
    <div class="profile-header">
      <h2>个人资料</h2>
    </div>
    
    <div class="profile-content">
      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar">
            <img :src="user.avatar" :alt="user.name" v-if="user.avatar">
            <div v-else class="avatar-placeholder">
              {{ user.name.charAt(0) }}
            </div>
          </div>
          <button @click="changeAvatar" class="btn btn-secondary">更换头像</button>
        </div>
        
        <div class="profile-form">
          <div class="form-group">
            <label>姓名:</label>
            <input v-model="user.name" class="form-input">
          </div>
          <div class="form-group">
            <label>邮箱:</label>
            <input v-model="user.email" type="email" class="form-input">
          </div>
          <div class="form-group">
            <label>电话:</label>
            <input v-model="user.phone" class="form-input">
          </div>
          <div class="form-group">
            <label>部门:</label>
            <select v-model="user.department" class="form-input">
              <option value="tech">技术部</option>
              <option value="product">产品部</option>
              <option value="design">设计部</option>
              <option value="marketing">市场部</option>
            </select>
          </div>
          <div class="form-group">
            <label>个人简介:</label>
            <textarea v-model="user.bio" class="form-textarea" rows="4"></textarea>
          </div>
          
          <div class="form-actions">
            <button @click="saveProfile" class="btn btn-primary">保存资料</button>
            <button @click="resetProfile" class="btn btn-secondary">重置</button>
          </div>
        </div>
      </div>
      
      <div class="stats-card">
        <h3>账户统计</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ userStats.loginCount }}</div>
            <div class="stat-label">登录次数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStats.lastLogin }}</div>
            <div class="stat-label">最后登录</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStats.createdAt }}</div>
            <div class="stat-label">注册时间</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userStats.role }}</div>
            <div class="stat-label">用户角色</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        department: 'tech',
        bio: '我是一名前端开发工程师，专注于Vue.js和微前端技术。',
        avatar: ''
      },
      originalUser: {},
      userStats: {
        loginCount: 156,
        lastLogin: '2024-01-15 14:30',
        createdAt: '2023-06-01',
        role: '管理员'
      }
    }
  },
  mounted() {
    this.originalUser = { ...this.user }
  },
  methods: {
    saveProfile() {
      // 模拟保存
      this.$message = this.$message || { success: (msg) => alert(msg) }
      this.$message.success('个人资料保存成功！')
      this.originalUser = { ...this.user }
    },
    resetProfile() {
      this.user = { ...this.originalUser }
    },
    changeAvatar() {
      // 模拟头像上传
      alert('头像上传功能（演示）')
    }
  }
}
</script>

<style scoped>
.profile-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.profile-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #007bff;
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.profile-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-input, .form-textarea {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.stats-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
}

.stats-card h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary { background: #007bff; color: white; }
.btn-secondary { background: #6c757d; color: white; }

.btn:hover { opacity: 0.8; }

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
