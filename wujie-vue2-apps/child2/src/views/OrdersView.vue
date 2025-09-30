<template>
  <div class="orders-view">
    <h2>📦 订单管理</h2>
    <div class="orders-content">
      <div class="orders-header">
        <div class="filter-bar">
          <select v-model="statusFilter" class="filter-select">
            <option value="">全部状态</option>
            <option value="pending">待处理</option>
            <option value="processing">处理中</option>
            <option value="shipped">已发货</option>
            <option value="delivered">已送达</option>
            <option value="cancelled">已取消</option>
          </select>
          <input type="date" v-model="dateFilter" class="date-input">
        </div>
        <div class="order-stats">
          <span class="stat">总订单: {{ orders.length }}</span>
          <span class="stat">今日订单: {{ todayOrders }}</span>
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
              <td>{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.product }}</td>
              <td>¥{{ order.amount }}</td>
              <td>
                <span class="status-badge" :class="order.status">
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td>{{ formatDate(order.createdAt) }}</td>
              <td>
                <button @click="viewOrder(order)" class="action-btn view">查看</button>
                <button @click="updateStatus(order)" class="action-btn update">更新</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="order-timeline">
        <h3>最近订单动态</h3>
        <div class="timeline">
          <div v-for="activity in recentActivities" :key="activity.id" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4>{{ activity.title }}</h4>
              <p>{{ activity.description }}</p>
              <span class="timeline-time">{{ formatDate(activity.time) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrdersView',
  data() {
    return {
      statusFilter: '',
      dateFilter: '',
      orders: [
        { id: 'ORD001', customer: '张三', product: '智能手机', amount: 2999, status: 'pending', createdAt: new Date('2024-01-15') },
        { id: 'ORD002', customer: '李四', product: '笔记本电脑', amount: 5999, status: 'processing', createdAt: new Date('2024-01-14') },
        { id: 'ORD003', customer: '王五', product: '无线耳机', amount: 299, status: 'shipped', createdAt: new Date('2024-01-13') },
        { id: 'ORD004', customer: '赵六', product: '智能手表', amount: 1299, status: 'delivered', createdAt: new Date('2024-01-12') },
        { id: 'ORD005', customer: '钱七', product: '平板电脑', amount: 3999, status: 'cancelled', createdAt: new Date('2024-01-11') },
        { id: 'ORD006', customer: '孙八', product: '蓝牙音箱', amount: 199, status: 'pending', createdAt: new Date() }
      ],
      recentActivities: [
        { id: 1, title: '新订单', description: '订单 ORD006 已创建', time: new Date() },
        { id: 2, title: '订单发货', description: '订单 ORD003 已发货', time: new Date(Date.now() - 3600000) },
        { id: 3, title: '订单送达', description: '订单 ORD004 已送达', time: new Date(Date.now() - 7200000) },
        { id: 4, title: '订单取消', description: '订单 ORD005 已取消', time: new Date(Date.now() - 86400000) }
      ]
    }
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders

      if (this.statusFilter) {
        filtered = filtered.filter(order => order.status === this.statusFilter)
      }

      if (this.dateFilter) {
        const filterDate = new Date(this.dateFilter)
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.createdAt)
          return orderDate.toDateString() === filterDate.toDateString()
        })
      }

      return filtered
    },
    todayOrders() {
      const today = new Date().toDateString()
      return this.orders.filter(order => 
        new Date(order.createdAt).toDateString() === today
      ).length
    }
  },
  methods: {
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
    formatDate(date) {
      return new Date(date).toLocaleDateString('zh-CN')
    },
    viewOrder(order) {
      console.log('[Child2] 查看订单:', order)
      alert(`查看订单: ${order.id}`)
    },
    updateStatus(order) {
      console.log('[Child2] 更新订单状态:', order)
      alert(`更新订单状态: ${order.id}`)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.orders-view {
  padding: 20px;
  color: #2c3e50;

  h2 {
    margin-bottom: 30px;
    color: #f5576c;
    font-size: 2em;
  }

  .orders-content {
    .orders-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      .filter-bar {
        display: flex;
        gap: 15px;

        .filter-select, .date-input {
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
      }

      .order-stats {
        display: flex;
        gap: 20px;

        .stat {
          background: #f5576c;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9em;
        }
      }
    }

    .orders-table {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-bottom: 30px;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f8f9fa;
          font-weight: bold;
          color: #2c3e50;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8em;
          font-weight: bold;

          &.pending {
            background: #fff3cd;
            color: #856404;
          }

          &.processing {
            background: #d1ecf1;
            color: #0c5460;
          }

          &.shipped {
            background: #d4edda;
            color: #155724;
          }

          &.delivered {
            background: #cce5ff;
            color: #004085;
          }

          &.cancelled {
            background: #f8d7da;
            color: #721c24;
          }
        }

        .action-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 5px;
          font-size: 0.8em;
          transition: background 0.3s;

          &.view {
            background: #2196F3;
            color: white;

            &:hover {
              background: #1976D2;
            }
          }

          &.update {
            background: #4CAF50;
            color: white;

            &:hover {
              background: #45a049;
            }
          }
        }
      }
    }

    .order-timeline {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      h3 {
        margin: 0 0 20px 0;
        color: #2c3e50;
      }

      .timeline {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #f5576c;
        }

        .timeline-item {
          position: relative;
          padding-left: 60px;
          margin-bottom: 30px;

          .timeline-dot {
            position: absolute;
            left: 12px;
            top: 5px;
            width: 16px;
            height: 16px;
            background: #f5576c;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 0 3px #f5576c;
          }

          .timeline-content {
            h4 {
              margin: 0 0 5px 0;
              color: #2c3e50;
            }

            p {
              margin: 0 0 5px 0;
              color: #666;
            }

            .timeline-time {
              font-size: 0.8em;
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>
