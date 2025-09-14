<template>
  <div class="profile-view">
    <h2>👤 个人资料</h2>
    <div class="profile-content">
      <div class="profile-header">
        <div class="avatar">
          <div class="avatar-placeholder">U</div>
        </div>
        <div class="user-info">
          <h3>用户名</h3>
          <p>user@example.com</p>
          <span class="status">在线</span>
        </div>
      </div>
      
      <div class="profile-details">
        <div class="detail-section">
          <h4>基本信息</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <label>姓名</label>
              <span>张三</span>
            </div>
            <div class="detail-item">
              <label>年龄</label>
              <span>28</span>
            </div>
            <div class="detail-item">
              <label>城市</label>
              <span>北京</span>
            </div>
            <div class="detail-item">
              <label>职业</label>
              <span>前端开发工程师</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>兴趣爱好</h4>
          <div class="tags">
            <span class="tag">编程</span>
            <span class="tag">摄影</span>
            <span class="tag">旅行</span>
            <span class="tag">音乐</span>
          </div>
        </div>

        <div class="detail-section">
          <h4>最近活动</h4>
          <div class="activity-list">
            <div class="activity-item">
              <span class="activity-time">2小时前</span>
              <span class="activity-desc">更新了个人资料</span>
            </div>
            <div class="activity-item">
              <span class="activity-time">1天前</span>
              <span class="activity-desc">登录了系统</span>
            </div>
            <div class="activity-item">
              <span class="activity-time">3天前</span>
              <span class="activity-desc">修改了密码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  mounted() {
    console.log('[Child1] ProfileView 已挂载')
  }
}
</script>

<style lang="scss" scoped>
.profile-view {
  padding: 20px;
  color: #2c3e50;

  h2 {
    margin-bottom: 30px;
    color: #667eea;
    font-size: 2em;
  }

  .profile-content {
    .profile-header {
      display: flex;
      align-items: center;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;

      .avatar {
        margin-right: 20px;

        .avatar-placeholder {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2em;
          font-weight: bold;
        }
      }

      .user-info {
        h3 {
          margin: 0 0 5px 0;
          color: #2c3e50;
        }

        p {
          margin: 0 0 10px 0;
          color: #666;
        }

        .status {
          background: #4CAF50;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8em;
        }
      }
    }

    .profile-details {
      .detail-section {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;

        h4 {
          margin: 0 0 20px 0;
          color: #2c3e50;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;

          .detail-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;

            label {
              font-weight: bold;
              color: #666;
            }

            span {
              color: #2c3e50;
            }
          }
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          .tag {
            background: #667eea;
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.9em;
          }
        }

        .activity-list {
          .activity-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;

            .activity-time {
              color: #666;
              font-size: 0.9em;
            }

            .activity-desc {
              color: #2c3e50;
            }
          }
        }
      }
    }
  }
}
</style>
