<template>
  <div class="user-profile">
    <h3>个人资料</h3>
    <div class="profile-content">
      <div class="profile-avatar">
        <img :src="currentUser?.avatar || 'https://via.placeholder.com/100'" :alt="currentUser?.name">
        <button class="change-avatar-btn">更换头像</button>
      </div>
      <div class="profile-info">
        <div class="info-item">
          <label>姓名:</label>
          <span>{{ currentUser?.name || '未设置' }}</span>
        </div>
        <div class="info-item">
          <label>邮箱:</label>
          <span>{{ currentUser?.email || '未设置' }}</span>
        </div>
        <div class="info-item">
          <label>角色:</label>
          <span class="role-badge">{{ currentUser?.role === 'admin' ? '管理员' : '普通用户' }}</span>
        </div>
        <div class="info-item">
          <label>状态:</label>
          <span class="status-badge">{{ currentUser?.status === 'active' ? '活跃' : '非活跃' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserProfile',
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  h3 {
    margin: 0 0 2rem 0;
    color: #333;
  }

  .profile-content {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  .profile-avatar {
    text-align: center;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 3px solid #667eea;
      margin-bottom: 1rem;
    }

    .change-avatar-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;

      &:hover {
        background: #5a6fd8;
      }
    }
  }

  .profile-info {
    flex: 1;

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f0f0f0;

      label {
        width: 80px;
        font-weight: 500;
        color: #666;
      }

      span {
        color: #333;
      }

      .role-badge, .status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
      }

      .role-badge {
        background: #e3f2fd;
        color: #1976d2;
      }

      .status-badge {
        background: #e8f5e8;
        color: #2e7d32;
      }
    }
  }
}
</style>
