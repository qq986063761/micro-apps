<template>
  <div class="products-view">
    <h2>🛍️ 商品管理</h2>
    <div class="products-content">
      <div class="products-header">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="搜索商品..." class="search-input">
          <button @click="searchProducts" class="search-btn">搜索</button>
        </div>
        <button @click="addProduct" class="add-btn">添加商品</button>
      </div>

      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-image">
            <div class="image-placeholder">{{ product.name.charAt(0) }}</div>
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-price">¥{{ product.price }}</p>
            <p class="product-stock">库存: {{ product.stock }}</p>
            <div class="product-actions">
              <button @click="editProduct(product)" class="edit-btn">编辑</button>
              <button @click="deleteProduct(product.id)" class="delete-btn">删除</button>
            </div>
          </div>
        </div>
      </div>

      <div class="products-stats">
        <div class="stat-item">
          <h4>总商品数</h4>
          <p>{{ products.length }}</p>
        </div>
        <div class="stat-item">
          <h4>总库存</h4>
          <p>{{ totalStock }}</p>
        </div>
        <div class="stat-item">
          <h4>平均价格</h4>
          <p>¥{{ averagePrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  data() {
    return {
      searchQuery: '',
      products: [
        { id: 1, name: '智能手机', price: 2999, stock: 50 },
        { id: 2, name: '笔记本电脑', price: 5999, stock: 25 },
        { id: 3, name: '无线耳机', price: 299, stock: 100 },
        { id: 4, name: '智能手表', price: 1299, stock: 30 },
        { id: 5, name: '平板电脑', price: 3999, stock: 20 },
        { id: 6, name: '蓝牙音箱', price: 199, stock: 80 }
      ]
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) return this.products
      return this.products.filter(product => 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    totalStock() {
      return this.products.reduce((sum, product) => sum + product.stock, 0)
    },
    averagePrice() {
      const total = this.products.reduce((sum, product) => sum + product.price, 0)
      return Math.round(total / this.products.length)
    }
  },
  methods: {
    searchProducts() {
      console.log('[Child2] 搜索商品:', this.searchQuery)
    },
    addProduct() {
      console.log('[Child2] 添加商品')
      alert('添加商品功能')
    },
    editProduct(product) {
      console.log('[Child2] 编辑商品:', product)
      alert(`编辑商品: ${product.name}`)
    },
    deleteProduct(id) {
      console.log('[Child2] 删除商品:', id)
      if (confirm('确定要删除这个商品吗？')) {
        this.products = this.products.filter(p => p.id !== id)
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.products-view {
  padding: 20px;
  color: #2c3e50;

  h2 {
    margin-bottom: 30px;
    color: #f5576c;
    font-size: 2em;
  }

  .products-content {
    .products-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      .search-bar {
        display: flex;
        gap: 10px;

        .search-input {
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          width: 300px;
        }

        .search-btn {
          background: #f5576c;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: #e04a5c;
          }
        }
      }

      .add-btn {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: #45a049;
        }
      }
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .product-card {
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        .product-image {
          height: 150px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          display: flex;
          align-items: center;
          justify-content: center;

          .image-placeholder {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2em;
            font-weight: bold;
          }
        }

        .product-info {
          padding: 20px;

          h3 {
            margin: 0 0 10px 0;
            color: #2c3e50;
          }

          .product-price {
            font-size: 1.5em;
            font-weight: bold;
            color: #f5576c;
            margin: 0 0 5px 0;
          }

          .product-stock {
            color: #666;
            margin: 0 0 15px 0;
          }

          .product-actions {
            display: flex;
            gap: 10px;

            .edit-btn, .delete-btn {
              flex: 1;
              padding: 8px 12px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              transition: background 0.3s;
            }

            .edit-btn {
              background: #2196F3;
              color: white;

              &:hover {
                background: #1976D2;
              }
            }

            .delete-btn {
              background: #f44336;
              color: white;

              &:hover {
                background: #d32f2f;
              }
            }
          }
        }
      }
    }

    .products-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;

      .stat-item {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;

        h4 {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 0.9em;
        }

        p {
          margin: 0;
          font-size: 2em;
          font-weight: bold;
          color: #f5576c;
        }
      }
    }
  }
}
</style>
