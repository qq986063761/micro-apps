<template>
  <div class="user-list">
    <el-card>
      <div slot="header">
        <span>用户列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="refreshData">刷新</el-button>
      </div>
      
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="role" label="角色" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '活跃' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button size="mini" @click="viewUser(row.id)">查看</el-button>
            <el-button size="mini" type="primary" @click="editUser(row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteUser(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active' },
        { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active' },
        { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user', status: 'inactive' },
        { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'moderator', status: 'active' }
      ]
    }
  },
  methods: {
    viewUser(id) {
      this.$router.push(`/user/${id}`)
    },
    editUser(id) {
      this.$message.info(`编辑用户 ${id}`)
    },
    deleteUser(id) {
      this.$confirm('确定要删除这个用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.users = this.users.filter(user => user.id !== id)
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    refreshData() {
      this.$message.success('数据已刷新')
    }
  }
}
</script>

<style scoped>
.user-list {
  padding: 20px;
}
</style>
