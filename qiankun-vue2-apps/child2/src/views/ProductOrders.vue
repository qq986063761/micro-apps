<template>
  <div class="product-orders">
    <h3>订单管理</h3>
    
    <div class="orders-content">
      <div class="orders-table">
        <table>
          <thead>
            <tr>
              <th>订单ID</th>
              <th>商品名称</th>
              <th>客户</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.productName }}</td>
              <td>{{ order.customer }}</td>
              <td>¥{{ order.amount }}</td>
              <td>
                <span :class="['status-badge', order.status]">
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td>
                <button @click="updateOrderStatus(order.id, 'shipped')" 
                        v-if="order.status === 'pending'" 
                        class="ship-btn">发货</button>
                <button @click="updateOrderStatus(order.id, 'completed')" 
                        v-if="order.status === 'shipped'" 
                        class="complete-btn">完成</button>
                <button @click="cancelOrder(order.id)" 
                        v-if="order.status === 'pending'" 
                        class="cancel-btn">取消</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductOrders',
  computed: {
    ...mapState(['orders'])
  },
  methods: {
    ...mapActions(['updateOrderStatus', 'updateGlobalState']),
    getStatusText(status) {
      const statusMap = {
        pending: '待处理',
        shipped: '已发货',
        completed: '已完成',
        cancelled: '已取消'
      }
      return statusMap[status] || status
    },
    updateOrderStatus(orderId, newStatus) {
      this.updateOrderStatus({ id: orderId, status: newStatus })
      this.updateGlobalState({
        message: `订单 ${orderId} 状态已更新为 ${this.getStatusText(newStatus)}`,
        timestamp: new Date().toISOString()
      })
    },
    cancelOrder(orderId) {
      if (confirm('确定要取消这个订单吗？')) {
        this.updateOrderStatus({ id: orderId, status: 'cancelled' })
        this.updateGlobalState({
          message: `订单 ${orderId} 已取消`,
          timestamp: new Date().toISOString()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-orders {
  h3 {
    margin: 0 0 2rem 0;
    color: #333;
  }

  .orders-content {
    .orders-table {
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
  }

  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;

    &.pending {
      background: #fff3e0;
      color: #f57c00;
    }

    &.shipped {
      background: #e3f2fd;
      color: #1976d2;
    }

    &.completed {
      background: #e8f5e8;
      color: #2e7d32;
    }

    &.cancelled {
      background: #ffebee;
      color: #c62828;
    }
  }

  .ship-btn, .complete-btn, .cancel-btn {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    margin-right: 0.5rem;

    &.ship-btn {
      background: #2196f3;
      color: white;

      &:hover {
        background: #1976d2;
      }
    }

    &.complete-btn {
      background: #4caf50;
      color: white;

      &:hover {
        background: #45a049;
      }
    }

    &.cancel-btn {
      background: #f44336;
      color: white;

      &:hover {
        background: #da190b;
      }
    }
  }
}
</style>
