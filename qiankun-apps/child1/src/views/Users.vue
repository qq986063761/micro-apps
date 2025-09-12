<template>
  <div class="users">
    <div class="page-header">
      <h2>用户列表</h2>
      <button @click="addUser" class="btn btn-primary">添加用户</button>
    </div>
    
    <div class="user-filters">
      <input 
        v-model="searchQuery" 
        placeholder="搜索用户..." 
        class="search-input"
        @input="filterUsers"
      >
      <select v-model="selectedRole" @change="filterUsers" class="role-select">
        <option value="">所有角色</option>
        <option value="admin">管理员</option>
        <option value="user">普通用户</option>
        <option value="guest">访客</option>
      </select>
    </div>
    
    <div class="user-table">
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
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['role-badge', user.role]">
                {{ getRoleText(user.role) }}
              </span>
            </td>
            <td>
              <span :class="['status-badge', user.status]">
                {{ user.status === 'active' ? '活跃' : '禁用' }}
              </span>
            </td>
            <td>
              <button @click="editUser(user)" class="btn btn-sm btn-secondary">编辑</button>
              <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 添加/编辑用户模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>{{ editingUser ? '编辑用户' : '添加用户' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label>姓名:</label>
            <input v-model="userForm.name" required>
          </div>
          <div class="form-group">
            <label>邮箱:</label>
            <input v-model="userForm.email" type="email" required>
          </div>
          <div class="form-group">
            <label>角色:</label>
            <select v-model="userForm.role" required>
              <option value="admin">管理员</option>
              <option value="user">普通用户</option>
              <option value="guest">访客</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">取消</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active' },
        { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active' },
        { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user', status: 'inactive' },
        { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'guest', status: 'active' },
        { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'user', status: 'active' }
      ],
      filteredUsers: [],
      searchQuery: '',
      selectedRole: '',
      showModal: false,
      editingUser: null,
      userForm: {
        name: '',
        email: '',
        role: 'user'
      }
    }
  },
  mounted() {
    this.filteredUsers = [...this.users]
  },
  methods: {
    filterUsers() {
      this.filteredUsers = this.users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesRole = !this.selectedRole || user.role === this.selectedRole
        return matchesSearch && matchesRole
      })
    },
    addUser() {
      this.editingUser = null
      this.userForm = { name: '', email: '', role: 'user' }
      this.showModal = true
    },
    editUser(user) {
      this.editingUser = user
      this.userForm = { ...user }
      this.showModal = true
    },
    saveUser() {
      if (this.editingUser) {
        // 编辑用户
        const index = this.users.findIndex(u => u.id === this.editingUser.id)
        this.users.splice(index, 1, { ...this.userForm, id: this.editingUser.id, status: this.editingUser.status })
      } else {
        // 添加用户
        const newId = Math.max(...this.users.map(u => u.id)) + 1
        this.users.push({ ...this.userForm, id: newId, status: 'active' })
      }
      this.filterUsers()
      this.closeModal()
    },
    deleteUser(id) {
      if (confirm('确定要删除这个用户吗？')) {
        this.users = this.users.filter(u => u.id !== id)
        this.filterUsers()
      }
    },
    closeModal() {
      this.showModal = false
      this.editingUser = null
    },
    getRoleText(role) {
      const roleMap = {
        admin: '管理员',
        user: '普通用户',
        guest: '访客'
      }
      return roleMap[role] || role
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input, .role-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.user-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
}

.role-badge, .status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.role-badge.admin { background: #ff6b6b; color: white; }
.role-badge.user { background: #4ecdc4; color: white; }
.role-badge.guest { background: #45b7d1; color: white; }

.status-badge.active { background: #51cf66; color: white; }
.status-badge.inactive { background: #ffd43b; color: #333; }

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary { background: #007bff; color: white; }
.btn-secondary { background: #6c757d; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-sm { padding: 4px 8px; font-size: 12px; }

.btn:hover { opacity: 0.8; }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
