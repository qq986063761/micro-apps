<template>
  <div class="products">
    <div class="page-header">
      <h2>商品管理</h2>
      <button @click="addProduct" class="btn btn-primary">添加商品</button>
    </div>
    
    <div class="product-filters">
      <input 
        v-model="searchQuery" 
        placeholder="搜索商品..." 
        class="search-input"
        @input="filterProducts"
      >
      <select v-model="selectedCategory" @change="filterProducts" class="category-select">
        <option value="">所有分类</option>
        <option value="electronics">电子产品</option>
        <option value="clothing">服装</option>
        <option value="books">图书</option>
        <option value="home">家居用品</option>
      </select>
      <select v-model="sortBy" @change="sortProducts" class="sort-select">
        <option value="name">按名称排序</option>
        <option value="price">按价格排序</option>
        <option value="stock">按库存排序</option>
        <option value="created">按创建时间排序</option>
      </select>
    </div>
    
    <div class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" v-if="product.image">
          <div v-else class="image-placeholder">
            <span>{{ product.name.charAt(0) }}</span>
          </div>
          <div class="product-status" :class="product.status">
            {{ product.status === 'active' ? '在售' : '下架' }}
          </div>
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-meta">
            <span class="product-category">{{ getCategoryText(product.category) }}</span>
            <span class="product-stock">库存: {{ product.stock }}</span>
          </div>
          <div class="product-price">¥{{ product.price }}</div>
        </div>
        
        <div class="product-actions">
          <button @click="editProduct(product)" class="btn btn-sm btn-secondary">编辑</button>
          <button @click="toggleProductStatus(product)" class="btn btn-sm" :class="product.status === 'active' ? 'btn-warning' : 'btn-success'">
            {{ product.status === 'active' ? '下架' : '上架' }}
          </button>
          <button @click="deleteProduct(product.id)" class="btn btn-sm btn-danger">删除</button>
        </div>
      </div>
    </div>
    
    <!-- 添加/编辑商品模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>{{ editingProduct ? '编辑商品' : '添加商品' }}</h3>
        <form @submit.prevent="saveProduct">
          <div class="form-group">
            <label>商品名称:</label>
            <input v-model="productForm.name" required>
          </div>
          <div class="form-group">
            <label>商品描述:</label>
            <textarea v-model="productForm.description" rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>价格:</label>
              <input v-model="productForm.price" type="number" step="0.01" required>
            </div>
            <div class="form-group">
              <label>库存:</label>
              <input v-model="productForm.stock" type="number" required>
            </div>
          </div>
          <div class="form-group">
            <label>分类:</label>
            <select v-model="productForm.category" required>
              <option value="electronics">电子产品</option>
              <option value="clothing">服装</option>
              <option value="books">图书</option>
              <option value="home">家居用品</option>
            </select>
          </div>
          <div class="form-group">
            <label>商品图片URL:</label>
            <input v-model="productForm.image" type="url">
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
  name: 'Products',
  data() {
    return {
      products: [
        { 
          id: 1, 
          name: 'iPhone 15 Pro', 
          description: '最新款苹果手机，配备A17 Pro芯片', 
          price: 7999, 
          stock: 50, 
          category: 'electronics', 
          status: 'active',
          image: 'https://via.placeholder.com/200x200?text=iPhone'
        },
        { 
          id: 2, 
          name: 'MacBook Pro', 
          description: '专业级笔记本电脑，M3芯片', 
          price: 12999, 
          stock: 25, 
          category: 'electronics', 
          status: 'active',
          image: 'https://via.placeholder.com/200x200?text=MacBook'
        },
        { 
          id: 3, 
          name: 'Nike运动鞋', 
          description: '舒适透气的运动鞋', 
          price: 599, 
          stock: 100, 
          category: 'clothing', 
          status: 'active',
          image: 'https://via.placeholder.com/200x200?text=Nike'
        },
        { 
          id: 4, 
          name: 'Vue.js实战', 
          description: 'Vue.js开发指南', 
          price: 89, 
          stock: 200, 
          category: 'books', 
          status: 'active',
          image: 'https://via.placeholder.com/200x200?text=Book'
        },
        { 
          id: 5, 
          name: '智能台灯', 
          description: '可调节亮度的智能台灯', 
          price: 299, 
          stock: 0, 
          category: 'home', 
          status: 'inactive',
          image: 'https://via.placeholder.com/200x200?text=Lamp'
        }
      ],
      filteredProducts: [],
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name',
      showModal: false,
      editingProduct: null,
      productForm: {
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'electronics',
        image: ''
      }
    }
  },
  mounted() {
    this.filteredProducts = [...this.products]
  },
  methods: {
    filterProducts() {
      let filtered = this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory
        return matchesSearch && matchesCategory
      })
      
      // 排序
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'price':
            return a.price - b.price
          case 'stock':
            return a.stock - b.stock
          case 'created':
            return b.id - a.id
          default:
            return 0
        }
      })
      
      this.filteredProducts = filtered
    },
    sortProducts() {
      this.filterProducts()
    },
    addProduct() {
      this.editingProduct = null
      this.productForm = {
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'electronics',
        image: ''
      }
      this.showModal = true
    },
    editProduct(product) {
      this.editingProduct = product
      this.productForm = { ...product }
      this.showModal = true
    },
    saveProduct() {
      if (this.editingProduct) {
        // 编辑商品
        const index = this.products.findIndex(p => p.id === this.editingProduct.id)
        this.products.splice(index, 1, { ...this.productForm, id: this.editingProduct.id, status: this.editingProduct.status })
      } else {
        // 添加商品
        const newId = Math.max(...this.products.map(p => p.id)) + 1
        this.products.push({ ...this.productForm, id: newId, status: 'active' })
      }
      this.filterProducts()
      this.closeModal()
    },
    toggleProductStatus(product) {
      product.status = product.status === 'active' ? 'inactive' : 'active'
      this.filterProducts()
    },
    deleteProduct(id) {
      if (confirm('确定要删除这个商品吗？')) {
        this.products = this.products.filter(p => p.id !== id)
        this.filterProducts()
      }
    },
    closeModal() {
      this.showModal = false
      this.editingProduct = null
    },
    getCategoryText(category) {
      const categoryMap = {
        electronics: '电子产品',
        clothing: '服装',
        books: '图书',
        home: '家居用品'
      }
      return categoryMap[category] || category
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

.product-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input, .category-select, .sort-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #999;
}

.product-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.product-status.active {
  background: #51cf66;
  color: white;
}

.product-status.inactive {
  background: #ffd43b;
  color: #333;
}

.product-info {
  padding: 15px;
}

.product-name {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.product-description {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 12px;
  color: #999;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.product-actions {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 8px;
}

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
.btn-success { background: #28a745; color: white; }
.btn-warning { background: #ffc107; color: #333; }
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
  width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .product-filters {
    flex-direction: column;
  }
}
</style>
