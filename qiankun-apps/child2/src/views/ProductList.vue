<template>
  <div class="product-list">
    <div class="list-header">
      <h3>商品列表</h3>
      <button @click="showAddModal = true" class="add-btn">添加商品</button>
    </div>

    <div class="list-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else class="product-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>商品名称</th>
              <th>价格</th>
              <th>分类</th>
              <th>库存</th>
              <th>销量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>¥{{ product.price }}</td>
              <td>
                <span class="category-badge">{{ product.category }}</span>
              </td>
              <td>
                <span :class="['stock-badge', product.stock < 30 ? 'low' : 'normal']">
                  {{ product.stock }}
                </span>
              </td>
              <td>{{ product.sales }}</td>
              <td>
                <button @click="editProduct(product)" class="edit-btn">编辑</button>
                <button @click="deleteProduct(product.id)" class="delete-btn">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 添加商品模态框 -->
    <div v-if="showAddModal" class="modal-overlay" @click="showAddModal = false">
      <div class="modal" @click.stop>
        <h4>添加商品</h4>
        <form @submit.prevent="handleAddProduct">
          <div class="form-group">
            <label>商品名称:</label>
            <input v-model="newProduct.name" type="text" required>
          </div>
          <div class="form-group">
            <label>价格:</label>
            <input v-model="newProduct.price" type="number" required>
          </div>
          <div class="form-group">
            <label>分类:</label>
            <select v-model="newProduct.category">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>库存:</label>
            <input v-model="newProduct.stock" type="number" required>
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
  name: 'ProductList',
  data() {
    return {
      showAddModal: false,
      newProduct: {
        name: '',
        price: '',
        category: '手机',
        stock: ''
      }
    }
  },
  computed: {
    ...mapState(['products', 'categories', 'loading'])
  },
  methods: {
    ...mapActions(['addProduct', 'deleteProduct', 'updateGlobalState']),
    editProduct(product) {
      // 编辑商品逻辑
      console.log('编辑商品:', product)
    },
    handleAddProduct() {
      this.addProduct({
        ...this.newProduct,
        price: Number(this.newProduct.price),
        stock: Number(this.newProduct.stock)
      })
      this.showAddModal = false
      this.newProduct = { name: '', price: '', category: '手机', stock: '' }
      this.updateGlobalState({
        message: '新商品已添加',
        timestamp: new Date().toISOString()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
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

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .product-table {
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

  .category-badge {
    background: #e3f2fd;
    color: #1976d2;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .stock-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;

    &.normal {
      background: #e8f5e8;
      color: #2e7d32;
    }

    &.low {
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
          border-color: #f5576c;
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
          background: #f5576c;
          color: white;

          &:hover {
            background: #e04a5c;
          }
        }
      }
    }
  }
}
</style>
