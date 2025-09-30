<template>
  <div class="product-detail">
    <el-card>
      <div slot="header">
        <el-button type="text" @click="goBack">← 返回</el-button>
        <span style="margin-left: 20px;">商品详情</span>
      </div>
      
      <div v-if="product" class="product-info">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="商品ID">{{ product.id }}</el-descriptions-item>
          <el-descriptions-item label="商品名称">{{ product.name }}</el-descriptions-item>
          <el-descriptions-item label="分类">{{ product.category }}</el-descriptions-item>
          <el-descriptions-item label="价格">¥{{ product.price }}</el-descriptions-item>
          <el-descriptions-item label="库存">{{ product.stock }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="product.status === 'active' ? 'success' : 'danger'">
              {{ product.status === 'active' ? '上架' : '下架' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ product.createTime }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ product.updateTime }}</el-descriptions-item>
        </el-descriptions>
        
        <div class="actions" style="margin-top: 20px;">
          <el-button type="primary" @click="editProduct">编辑商品</el-button>
          <el-button type="success" @click="toggleStatus">
            {{ product.status === 'active' ? '下架' : '上架' }}
          </el-button>
          <el-button type="danger" @click="deleteProduct">删除商品</el-button>
        </div>
      </div>
      
      <div v-else class="no-data">
        <el-empty description="商品不存在"></el-empty>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      products: [
        { id: 1, name: 'iPhone 14', category: '手机', price: 5999, stock: 50, status: 'active', createTime: '2023-01-01', updateTime: '2023-01-15' },
        { id: 2, name: 'MacBook Pro', category: '电脑', price: 12999, stock: 20, status: 'active', createTime: '2023-01-02', updateTime: '2023-01-16' },
        { id: 3, name: 'AirPods Pro', category: '耳机', price: 1999, stock: 100, status: 'active', createTime: '2023-01-03', updateTime: '2023-01-17' },
        { id: 4, name: 'iPad Air', category: '平板', price: 4399, stock: 0, status: 'inactive', createTime: '2023-01-04', updateTime: '2023-01-18' }
      ]
    }
  },
  computed: {
    product() {
      return this.products.find(product => product.id == this.id)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    editProduct() {
      this.$message.info(`编辑商品 ${this.id}`)
    },
    toggleStatus() {
      const newStatus = this.product.status === 'active' ? 'inactive' : 'active'
      this.product.status = newStatus
      this.$message.success(`商品已${newStatus === 'active' ? '上架' : '下架'}`)
    },
    deleteProduct() {
      this.$confirm('确定要删除这个商品吗？', '提示', {
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
.product-detail {
  padding: 20px;
}

.product-info {
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
