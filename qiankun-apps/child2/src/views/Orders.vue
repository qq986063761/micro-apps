<template>
  <div class="orders">
    <div class="page-header">
      <h2>订单管理</h2>
      <div class="header-actions">
        <select v-model="statusFilter" @change="filterOrders" class="status-filter">
          <option value="">所有状态</option>
          <option value="pending">待处理</option>
          <option value="processing">处理中</option>
          <option value="shipped">已发货</option>
          <option value="delivered">已送达</option>
          <option value="cancelled">已取消</option>
        </select>
        <button @click="exportOrders" class="btn btn-outline">导出订单</button>
      </div>
    </div>
    
    <div class="orders-stats">
      <div class="stat-card">
        <div class="stat-value">{{ totalOrders }}</div>
        <div class="stat-label">总订单数</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">¥{{ totalRevenue.toLocaleString() }}</div>
        <div class="stat-label">总销售额</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ pendingOrders }}</div>
        <div class="stat-label">待处理</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ deliveredOrders }}</div>
        <div class="stat-label">已送达</div>
      </div>
    </div>
    
    <div class="orders-table">
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>客户</th>
            <th>商品</th>
            <th>金额</th>
            <th>状态</th>
            <th>下单时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td class="order-id">{{ order.orderNumber }}</td>
            <td>
              <div class="customer-info">
                <div class="customer-name">{{ order.customer.name }}</div>
                <div class="customer-phone">{{ order.customer.phone }}</div>
              </div>
            </td>
            <td>
              <div class="products-info">
                <div v-for="item in order.items" :key="item.id" class="product-item">
                  {{ item.name }} × {{ item.quantity }}
                </div>
              </div>
            </td>
            <td class="order-amount">¥{{ order.totalAmount }}</td>
            <td>
              <span :class="['status-badge', order.status]">
                {{ getStatusText(order.status) }}
              </span>
            </td>
            <td class="order-date">{{ formatDate(order.createdAt) }}</td>
            <td>
              <div class="order-actions">
                <button @click="viewOrder(order)" class="btn btn-sm btn-secondary">查看</button>
                <button v-if="order.status === 'pending'" @click="processOrder(order)" class="btn btn-sm btn-primary">处理</button>
                <button v-if="order.status === 'processing'" @click="shipOrder(order)" class="btn btn-sm btn-success">发货</button>
                <button v-if="order.status === 'shipped'" @click="deliverOrder(order)" class="btn btn-sm btn-info">送达</button>
                <button v-if="['pending', 'processing'].includes(order.status)" @click="cancelOrder(order)" class="btn btn-sm btn-danger">取消</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 订单详情模态框 -->
    <div v-if="showOrderModal" class="modal-overlay" @click="closeOrderModal">
      <div class="modal order-modal" @click.stop>
        <h3>订单详情 - {{ selectedOrder?.orderNumber }}</h3>
        <div v-if="selectedOrder" class="order-details">
          <div class="detail-section">
            <h4>客户信息</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <label>姓名:</label>
                <span>{{ selectedOrder.customer.name }}</span>
              </div>
              <div class="detail-item">
                <label>电话:</label>
                <span>{{ selectedOrder.customer.phone }}</span>
              </div>
              <div class="detail-item">
                <label>地址:</label>
                <span>{{ selectedOrder.customer.address }}</span>
              </div>
            </div>
          </div>
          
          <div class="detail-section">
            <h4>商品信息</h4>
            <div class="items-list">
              <div v-for="item in selectedOrder.items" :key="item.id" class="item-row">
                <div class="item-info">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-price">¥{{ item.price }}</div>
                </div>
                <div class="item-quantity">× {{ item.quantity }}</div>
                <div class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>
          </div>
          
          <div class="detail-section">
            <h4>订单信息</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <label>订单状态:</label>
                <span :class="['status-badge', selectedOrder.status]">
                  {{ getStatusText(selectedOrder.status) }}
                </span>
              </div>
              <div class="detail-item">
                <label>下单时间:</label>
                <span>{{ formatDate(selectedOrder.createdAt) }}</span>
              </div>
              <div class="detail-item">
                <label>总金额:</label>
                <span class="total-amount">¥{{ selectedOrder.totalAmount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closeOrderModal" class="btn btn-secondary">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data() {
    return {
      orders: [
        {
          id: 1,
          orderNumber: 'ORD202401001',
          customer: {
            name: '张三',
            phone: '13800138001',
            address: '北京市朝阳区xxx街道xxx号'
          },
          items: [
            { id: 1, name: 'iPhone 15 Pro', price: 7999, quantity: 1 },
            { id: 2, name: 'AirPods Pro', price: 1999, quantity: 1 }
          ],
          totalAmount: 9998,
          status: 'pending',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          orderNumber: 'ORD202401002',
          customer: {
            name: '李四',
            phone: '13800138002',
            address: '上海市浦东新区xxx路xxx号'
          },
          items: [
            { id: 3, name: 'MacBook Pro', price: 12999, quantity: 1 }
          ],
          totalAmount: 12999,
          status: 'processing',
          createdAt: '2024-01-15T14:20:00Z'
        },
        {
          id: 3,
          orderNumber: 'ORD202401003',
          customer: {
            name: '王五',
            phone: '13800138003',
            address: '广州市天河区xxx大道xxx号'
          },
          items: [
            { id: 4, name: 'Nike运动鞋', price: 599, quantity: 2 },
            { id: 5, name: 'Vue.js实战', price: 89, quantity: 1 }
          ],
          totalAmount: 1287,
          status: 'shipped',
          createdAt: '2024-01-14T16:45:00Z'
        },
        {
          id: 4,
          orderNumber: 'ORD202401004',
          customer: {
            name: '赵六',
            phone: '13800138004',
            address: '深圳市南山区xxx科技园xxx号'
          },
          items: [
            { id: 6, name: '智能台灯', price: 299, quantity: 1 }
          ],
          totalAmount: 299,
          status: 'delivered',
          createdAt: '2024-01-13T09:15:00Z'
        },
        {
          id: 5,
          orderNumber: 'ORD202401005',
          customer: {
            name: '钱七',
            phone: '13800138005',
            address: '杭州市西湖区xxx路xxx号'
          },
          items: [
            { id: 7, name: 'iPad Air', price: 4399, quantity: 1 }
          ],
          totalAmount: 4399,
          status: 'cancelled',
          createdAt: '2024-01-12T11:30:00Z'
        }
      ],
      filteredOrders: [],
      statusFilter: '',
      showOrderModal: false,
      selectedOrder: null
    }
  },
  computed: {
    totalOrders() {
      return this.orders.length
    },
    totalRevenue() {
      return this.orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.totalAmount, 0)
    },
    pendingOrders() {
      return this.orders.filter(order => order.status === 'pending').length
    },
    deliveredOrders() {
      return this.orders.filter(order => order.status === 'delivered').length
    }
  },
  mounted() {
    this.filteredOrders = [...this.orders]
  },
  methods: {
    filterOrders() {
      if (!this.statusFilter) {
        this.filteredOrders = [...this.orders]
      } else {
        this.filteredOrders = this.orders.filter(order => order.status === this.statusFilter)
      }
    },
    viewOrder(order) {
      this.selectedOrder = order
      this.showOrderModal = true
    },
    processOrder(order) {
      order.status = 'processing'
      this.filterOrders()
    },
    shipOrder(order) {
      order.status = 'shipped'
      this.filterOrders()
    },
    deliverOrder(order) {
      order.status = 'delivered'
      this.filterOrders()
    },
    cancelOrder(order) {
      if (confirm('确定要取消这个订单吗？')) {
        order.status = 'cancelled'
        this.filterOrders()
      }
    },
    closeOrderModal() {
      this.showOrderModal = false
      this.selectedOrder = null
    },
    exportOrders() {
      alert('导出订单功能（演示）')
    },
    getStatusText(status) {
      const statusMap = {
        pending: '待处理',
        processing: '处理中',
        shipped: '已发货',
        delivered: '已送达',
        cancelled: '已取消'
      }
      return statusMap[status] || status
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN')
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

.header-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.status-filter {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.orders-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

.orders-table {
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

.order-id {
  font-family: monospace;
  font-weight: 600;
}

.customer-info {
  display: flex;
  flex-direction: column;
}

.customer-name {
  font-weight: 500;
}

.customer-phone {
  font-size: 12px;
  color: #666;
}

.products-info {
  max-width: 200px;
}

.product-item {
  font-size: 12px;
  margin-bottom: 2px;
}

.order-amount {
  font-weight: 600;
  color: #e74c3c;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.pending { background: #fff3cd; color: #856404; }
.status-badge.processing { background: #cce5ff; color: #004085; }
.status-badge.shipped { background: #d1ecf1; color: #0c5460; }
.status-badge.delivered { background: #d4edda; color: #155724; }
.status-badge.cancelled { background: #f8d7da; color: #721c24; }

.order-date {
  font-size: 12px;
  color: #666;
}

.order-actions {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
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
.btn-info { background: #17a2b8; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-outline { background: transparent; color: #007bff; border: 2px solid #007bff; }
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
  width: 600px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

.order-modal {
  width: 700px;
}

.detail-section {
  margin-bottom: 25px;
}

.detail-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 8px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-item label {
  font-weight: 500;
  color: #666;
  margin-bottom: 5px;
}

.items-list {
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}

.item-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 15px;
  padding: 12px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.item-row:last-child {
  border-bottom: none;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 500;
}

.item-price {
  font-size: 12px;
  color: #666;
}

.item-quantity {
  text-align: center;
  font-weight: 500;
}

.item-total {
  text-align: right;
  font-weight: 600;
  color: #e74c3c;
}

.total-amount {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .orders-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .order-actions {
    flex-direction: column;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .item-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
