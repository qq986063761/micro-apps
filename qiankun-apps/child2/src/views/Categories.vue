<template>
  <div class="categories">
    <div class="page-header">
      <h2>分类管理</h2>
      <button @click="addCategory" class="btn btn-primary">添加分类</button>
    </div>
    
    <div class="categories-grid">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div class="category-icon">
          <span class="icon">{{ getCategoryIcon(category.name) }}</span>
        </div>
        <div class="category-info">
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-description">{{ category.description }}</p>
          <div class="category-stats">
            <span class="product-count">{{ category.productCount }} 个商品</span>
            <span class="category-status" :class="category.status">
              {{ category.status === 'active' ? '启用' : '禁用' }}
            </span>
          </div>
        </div>
        <div class="category-actions">
          <button @click="editCategory(category)" class="btn btn-sm btn-secondary">编辑</button>
          <button @click="toggleCategoryStatus(category)" class="btn btn-sm" :class="category.status === 'active' ? 'btn-warning' : 'btn-success'">
            {{ category.status === 'active' ? '禁用' : '启用' }}
          </button>
          <button @click="deleteCategory(category.id)" class="btn btn-sm btn-danger">删除</button>
        </div>
      </div>
    </div>
    
    <!-- 添加/编辑分类模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>{{ editingCategory ? '编辑分类' : '添加分类' }}</h3>
        <form @submit.prevent="saveCategory">
          <div class="form-group">
            <label>分类名称:</label>
            <input v-model="categoryForm.name" required>
          </div>
          <div class="form-group">
            <label>分类描述:</label>
            <textarea v-model="categoryForm.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>分类图标:</label>
            <select v-model="categoryForm.icon">
              <option value="📱">📱 电子产品</option>
              <option value="👕">👕 服装</option>
              <option value="📚">📚 图书</option>
              <option value="🏠">🏠 家居</option>
              <option value="🍎">🍎 食品</option>
              <option value="🚗">🚗 汽车</option>
              <option value="🎮">🎮 游戏</option>
              <option value="💄">💄 美妆</option>
            </select>
          </div>
          <div class="form-group">
            <label>排序权重:</label>
            <input v-model="categoryForm.sortOrder" type="number" min="0">
            <small>数字越小排序越靠前</small>
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
  name: 'Categories',
  data() {
    return {
      categories: [
        { 
          id: 1, 
          name: '电子产品', 
          description: '手机、电脑、数码产品等', 
          icon: '📱',
          productCount: 25, 
          status: 'active',
          sortOrder: 1
        },
        { 
          id: 2, 
          name: '服装', 
          description: '男装、女装、童装等', 
          icon: '👕',
          productCount: 48, 
          status: 'active',
          sortOrder: 2
        },
        { 
          id: 3, 
          name: '图书', 
          description: '技术书籍、小说、教育类图书', 
          icon: '📚',
          productCount: 156, 
          status: 'active',
          sortOrder: 3
        },
        { 
          id: 4, 
          name: '家居用品', 
          description: '家具、装饰、生活用品', 
          icon: '🏠',
          productCount: 32, 
          status: 'active',
          sortOrder: 4
        },
        { 
          id: 5, 
          name: '食品', 
          description: '零食、饮料、生鲜食品', 
          icon: '🍎',
          productCount: 0, 
          status: 'inactive',
          sortOrder: 5
        }
      ],
      showModal: false,
      editingCategory: null,
      categoryForm: {
        name: '',
        description: '',
        icon: '📱',
        sortOrder: 0
      }
    }
  },
  methods: {
    addCategory() {
      this.editingCategory = null
      this.categoryForm = {
        name: '',
        description: '',
        icon: '📱',
        sortOrder: 0
      }
      this.showModal = true
    },
    editCategory(category) {
      this.editingCategory = category
      this.categoryForm = { ...category }
      this.showModal = true
    },
    saveCategory() {
      if (this.editingCategory) {
        // 编辑分类
        const index = this.categories.findIndex(c => c.id === this.editingCategory.id)
        this.categories.splice(index, 1, { ...this.categoryForm, id: this.editingCategory.id, productCount: this.editingCategory.productCount, status: this.editingCategory.status })
      } else {
        // 添加分类
        const newId = Math.max(...this.categories.map(c => c.id)) + 1
        this.categories.push({ ...this.categoryForm, id: newId, productCount: 0, status: 'active' })
      }
      this.closeModal()
    },
    toggleCategoryStatus(category) {
      category.status = category.status === 'active' ? 'inactive' : 'active'
    },
    deleteCategory(id) {
      if (confirm('确定要删除这个分类吗？删除后该分类下的商品将变为未分类状态。')) {
        this.categories = this.categories.filter(c => c.id !== id)
      }
    },
    closeModal() {
      this.showModal = false
      this.editingCategory = null
    },
    getCategoryIcon(name) {
      const category = this.categories.find(c => c.name === name)
      return category ? category.icon : '📦'
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  gap: 15px;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.category-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon {
  font-size: 24px;
}

.category-info {
  flex: 1;
}

.category-name {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.category-description {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.category-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.product-count {
  color: #999;
}

.category-status {
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.category-status.active {
  background: #d4edda;
  color: #155724;
}

.category-status.inactive {
  background: #f8d7da;
  color: #721c24;
}

.category-actions {
  display: flex;
  flex-direction: column;
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
}

.modal h3 {
  margin: 0 0 20px 0;
  color: #333;
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

.form-group small {
  display: block;
  margin-top: 5px;
  color: #666;
  font-size: 12px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .category-card {
    flex-direction: column;
    text-align: center;
  }
  
  .category-actions {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
