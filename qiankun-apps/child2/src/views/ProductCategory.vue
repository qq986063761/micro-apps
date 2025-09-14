<template>
  <div class="product-category">
    <h3>分类管理</h3>
    
    <div class="category-content">
      <div class="category-list">
        <h4>商品分类</h4>
        <div class="category-items">
          <div v-for="category in categories" :key="category" class="category-item">
            <span class="category-name">{{ category }}</span>
            <span class="product-count">{{ getCategoryCount(category) }} 个商品</span>
            <button @click="deleteCategory(category)" class="delete-btn">删除</button>
          </div>
        </div>
        
        <div class="add-category">
          <input v-model="newCategory" type="text" placeholder="输入新分类名称" class="category-input">
          <button @click="addCategory" class="add-btn">添加分类</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductCategory',
  data() {
    return {
      newCategory: ''
    }
  },
  computed: {
    ...mapState(['categories', 'products'])
  },
  methods: {
    ...mapActions(['updateGlobalState']),
    getCategoryCount(category) {
      return this.products.filter(product => product.category === category).length
    },
    addCategory() {
      if (this.newCategory.trim() && !this.categories.includes(this.newCategory.trim())) {
        this.categories.push(this.newCategory.trim())
        this.newCategory = ''
        this.updateGlobalState({
          message: '新分类已添加',
          timestamp: new Date().toISOString()
        })
      }
    },
    deleteCategory(category) {
      if (confirm(`确定要删除分类 "${category}" 吗？`)) {
        const index = this.categories.indexOf(category)
        if (index > -1) {
          this.categories.splice(index, 1)
          this.updateGlobalState({
            message: '分类已删除',
            timestamp: new Date().toISOString()
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-category {
  h3 {
    margin: 0 0 2rem 0;
    color: #333;
  }

  .category-content {
    .category-list {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h4 {
        margin: 0 0 1.5rem 0;
        color: #333;
        font-size: 1.1rem;
      }

      .category-items {
        margin-bottom: 2rem;

        .category-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 1rem;
          background: #f8f9fa;

          .category-name {
            flex: 1;
            font-weight: 500;
            color: #333;
          }

          .product-count {
            color: #666;
            font-size: 0.9rem;
            margin-right: 1rem;
          }

          .delete-btn {
            background: #f44336;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;

            &:hover {
              background: #da190b;
            }
          }
        }
      }

      .add-category {
        display: flex;
        gap: 1rem;
        align-items: center;

        .category-input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.9rem;

          &:focus {
            outline: none;
            border-color: #f5576c;
          }
        }

        .add-btn {
          background: #f5576c;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;

          &:hover {
            background: #e04a5c;
          }
        }
      }
    }
  }
}
</style>
