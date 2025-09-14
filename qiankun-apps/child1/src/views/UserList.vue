<template>
  <div class="user-list">
    <div class="list-header">
      <h3>用户列表</h3>
      <button @click="showAddModal = true" class="add-btn">添加用户</button>
    </div>

    <div class="list-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['role-badge', user.role]">
                  {{ user.role === 'admin' ? '管理员' : '普通用户' }}
                </span>
              </td>
              <td>
                <span :class="['status-badge', user.status]">
                  {{ user.status === 'active' ? '活跃' : '非活跃' }}
                </span>
              </td>
              <td>
                <button @click="editUser(user)" class="edit-btn">编辑</button>
                <button @click="deleteUser(user.id)" class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 添加用户模态框 -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal" @click.stop>
        <h4>添加用户</h4>
        <form @submit.prevent="handleAddUser">
          <div class="form-group">
            <label>姓名:</label>
            <input v-model="newUser.name" type="text" required>
          </div>
          <div class="form-group">
            <label>邮箱:</label>
            <input v-model="newUser.email" type="email" required>
          </div>
          <div class="form-group">
            <label>角色:</label>
            <select v-model="newUser.role">
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" @click="showAddModal = false">取消</button>
            <button type="submit">添加</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserList',
  data() {
    return {
      showAddModal: false,
      newUser: {
        name: '',
        email: '',
        role: 'user'
      }
    }
  },
  computed: {
    ...mapState(['users', 'loading'])
  },
  methods: {
    ...mapActions(['addUser', 'deleteUser', 'updateGlobalState']),
    editUser(user) {
      // 编辑用户逻辑
      console.log('编辑用户:', user)
    },
    handleAddUser() {
      this.addUser(this.newUser)
      this.showAddModal = false
      this.newUser = { name: '', email: '', role: 'user' }
      this.updateGlobalState({
        message: '新用户已添加',
        timestamp: new Date().toISOString()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list {
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h3 {
      margin: 0;
      color: #333;
    }

    .add-btn {
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

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .user-table {
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      th {
        background: #f8f9fa;
        font-weight: 600;
        color: #333;
      }

      tr:hover {
        background: #f8f9fa;
      }
    }
  }

  .role-badge, .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;

    &.admin {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.user {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    &.active {
      background: #e8f5e8;
      color: #2e7d32;
    }

    &.inactive {
      background: #ffebee;
      color: #c62828;
    }
  }

  .edit-btn, .delete-btn {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    margin-right: 0.5rem;

    &.edit-btn {
      background: #4caf50;
      color: white;

      &:hover {
        background: #45a049;
      }
    }

    &.delete-btn {
      background: #f44336;
      color: white;

      &:hover {
        background: #da190b;
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

    h4 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #666;
        font-weight: 500;
      }

      input, select {
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

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;

      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;

        &[type="button"] {
          background: #f5f5f5;
          color: #666;

          &:hover {
            background: #e0e0e0;
          }
        }

        &[type="submit"] {
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
