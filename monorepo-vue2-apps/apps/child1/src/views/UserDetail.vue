<template>
  <div class="user-detail">
    <el-card>
      <div slot="header">
        <el-button type="text" @click="goBack">← 返回</el-button>
        <span style="margin-left: 20px;">用户详情</span>
      </div>
      
      <div v-if="user" class="user-info">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户ID">{{ user.id }}</el-descriptions-item>
          <el-descriptions-item label="姓名">{{ user.name }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
          <el-descriptions-item label="角色">{{ user.role }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="user.status === 'active' ? 'success' : 'danger'">
              {{ user.status === 'active' ? '活跃' : '禁用' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ user.createTime }}</el-descriptions-item>
        </el-descriptions>
        
        <div class="actions" style="margin-top: 20px;">
          <el-button type="primary" @click="editUser">编辑用户</el-button>
          <el-button type="danger" @click="deleteUser">删除用户</el-button>
        </div>
      </div>
      
      <div v-else class="no-data">
        <el-empty description="用户不存在"></el-empty>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', createTime: '2023-01-01' },
        { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active', createTime: '2023-01-02' },
        { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user', status: 'inactive', createTime: '2023-01-03' },
        { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'moderator', status: 'active', createTime: '2023-01-04' }
      ]
    }
  },
  computed: {
    user() {
      return this.users.find(user => user.id == this.id)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    editUser() {
      this.$message.info(`编辑用户 ${this.id}`)
    },
    deleteUser() {
      this.$confirm('确定要删除这个用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.goBack()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style scoped>
.user-detail {
  padding: 20px;
}

.user-info {
  max-width: 800px;
}

.actions {
  text-align: center;
}

.no-data {
  text-align: center;
  padding: 50px 0;
}
</style>
