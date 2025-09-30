<template>
  <div class="product-list">
    <el-card>
      <div slot="header">
        <span>商品列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addProduct">添加商品</el-button>
      </div>
      
      <el-table :data="products" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
        <el-table-column prop="category" label="分类" width="120"></el-table-column>
        <el-table-column prop="price" label="价格" width="100">
          <template slot-scope="{row}">
            ¥{{ row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button size="mini" @click="viewProduct(row.id)">查看</el-button>
            <el-button size="mini" type="primary" @click="editProduct(row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteProduct(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        { id: 1, name: 'iPhone 14', category: '手机', price: 5999, stock: 50, status: 'active' },
        { id: 2, name: 'MacBook Pro', category: '电脑', price: 12999, stock: 20, status: 'active' },
        { id: 3, name: 'AirPods Pro', category: '耳机', price: 1999, stock: 100, status: 'active' },
        { id: 4, name: 'iPad Air', category: '平板', price: 4399, stock: 0, status: 'inactive' }
      ]
    }
  },
  methods: {
    viewProduct(id) {
      this.$router.push(`/product/${id}`)
    },
    editProduct(id) {
      this.$message.info(`编辑商品 ${id}`)
    },
    deleteProduct(id) {
      this.$confirm('确定要删除这个商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.products = this.products.filter(product => product.id !== id)
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    addProduct() {
      this.$message.info('添加商品功能')
    }
  }
}
</script>

<style scoped>
.product-list {
  padding: 20px;
}
</style>
