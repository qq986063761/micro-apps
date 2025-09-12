<template>
  <div class="analytics">
    <div class="page-header">
      <h2>数据分析</h2>
      <div class="date-range">
        <label>时间范围:</label>
        <select v-model="selectedPeriod" @change="updateAnalytics">
          <option value="7">最近7天</option>
          <option value="30">最近30天</option>
          <option value="90">最近90天</option>
          <option value="365">最近一年</option>
        </select>
      </div>
    </div>
    
    <div class="analytics-overview">
      <div class="overview-card">
        <div class="card-icon sales">💰</div>
        <div class="card-content">
          <div class="card-value">¥{{ overviewData.totalSales.toLocaleString() }}</div>
          <div class="card-label">总销售额</div>
          <div class="card-change positive">+{{ overviewData.salesGrowth }}%</div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon orders">📦</div>
        <div class="card-content">
          <div class="card-value">{{ overviewData.totalOrders }}</div>
          <div class="card-label">总订单数</div>
          <div class="card-change positive">+{{ overviewData.ordersGrowth }}%</div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon customers">👥</div>
        <div class="card-content">
          <div class="card-value">{{ overviewData.totalCustomers }}</div>
          <div class="card-label">客户数量</div>
          <div class="card-change positive">+{{ overviewData.customersGrowth }}%</div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon products">🛍️</div>
        <div class="card-content">
          <div class="card-value">{{ overviewData.totalProducts }}</div>
          <div class="card-label">商品数量</div>
          <div class="card-change positive">+{{ overviewData.productsGrowth }}%</div>
        </div>
      </div>
    </div>
    
    <div class="charts-section">
      <div class="chart-container">
        <h3>销售趋势</h3>
        <div class="chart-placeholder">
          <div class="chart-mock">
            <div class="chart-bars">
              <div v-for="(value, index) in salesData" :key="index" class="bar" :style="{ height: value + '%' }"></div>
            </div>
            <div class="chart-labels">
              <span v-for="(label, index) in chartLabels" :key="index">{{ label }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>商品分类销售占比</h3>
        <div class="chart-placeholder">
          <div class="pie-chart-mock">
            <div class="pie-slice" style="--percentage: 35; --color: #ff6b6b;">
              <span>电子产品 35%</span>
            </div>
            <div class="pie-slice" style="--percentage: 25; --color: #4ecdc4;">
              <span>服装 25%</span>
            </div>
            <div class="pie-slice" style="--percentage: 20; --color: #45b7d1;">
              <span>图书 20%</span>
            </div>
            <div class="pie-slice" style="--percentage: 20; --color: #96ceb4;">
              <span>其他 20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tables-section">
      <div class="table-container">
        <h3>热销商品TOP10</h3>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>排名</th>
                <th>商品名称</th>
                <th>销量</th>
                <th>销售额</th>
                <th>增长率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in topProducts" :key="product.id">
                <td class="rank">{{ index + 1 }}</td>
                <td class="product-name">{{ product.name }}</td>
                <td class="sales-count">{{ product.salesCount }}</td>
                <td class="sales-amount">¥{{ product.salesAmount.toLocaleString() }}</td>
                <td class="growth" :class="product.growth > 0 ? 'positive' : 'negative'">
                  {{ product.growth > 0 ? '+' : '' }}{{ product.growth }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="table-container">
        <h3>客户分析</h3>
        <div class="customer-stats">
          <div class="stat-item">
            <div class="stat-value">{{ customerStats.newCustomers }}</div>
            <div class="stat-label">新增客户</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ customerStats.repeatCustomers }}</div>
            <div class="stat-label">复购客户</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">¥{{ customerStats.avgOrderValue.toLocaleString() }}</div>
            <div class="stat-label">平均订单价值</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ customerStats.retentionRate }}%</div>
            <div class="stat-label">客户留存率</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Analytics',
  data() {
    return {
      selectedPeriod: '30',
      overviewData: {
        totalSales: 1256800,
        salesGrowth: 12.5,
        totalOrders: 2847,
        ordersGrowth: 8.3,
        totalCustomers: 1256,
        customersGrowth: 15.2,
        totalProducts: 89,
        productsGrowth: 5.7
      },
      salesData: [65, 78, 82, 75, 88, 92, 85],
      chartLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      topProducts: [
        { id: 1, name: 'iPhone 15 Pro', salesCount: 156, salesAmount: 1248000, growth: 15.2 },
        { id: 2, name: 'MacBook Pro', salesCount: 89, salesAmount: 1155000, growth: 8.7 },
        { id: 3, name: 'Nike运动鞋', salesCount: 234, salesAmount: 140400, growth: 22.1 },
        { id: 4, name: 'Vue.js实战', salesCount: 456, salesAmount: 40584, growth: 35.6 },
        { id: 5, name: 'AirPods Pro', salesCount: 123, salesAmount: 245700, growth: 18.9 },
        { id: 6, name: 'iPad Air', salesCount: 67, salesAmount: 294800, growth: 12.3 },
        { id: 7, name: '智能台灯', salesCount: 189, salesAmount: 56511, growth: 28.4 },
        { id: 8, name: '无线充电器', salesCount: 278, salesAmount: 55600, growth: 41.2 },
        { id: 9, name: '蓝牙耳机', salesCount: 345, salesAmount: 69000, growth: 19.8 },
        { id: 10, name: '手机壳', salesCount: 567, salesAmount: 28350, growth: 33.5 }
      ],
      customerStats: {
        newCustomers: 89,
        repeatCustomers: 156,
        avgOrderValue: 441,
        retentionRate: 78.5
      }
    }
  },
  methods: {
    updateAnalytics() {
      // 模拟数据更新
      console.log(`更新分析数据，时间范围: ${this.selectedPeriod}天`)
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

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-range select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.analytics-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.overview-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s;
}

.overview-card:hover {
  transform: translateY(-2px);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.card-icon.sales { background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); }
.card-icon.orders { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
.card-icon.customers { background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); }
.card-icon.products { background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%); }

.card-content {
  flex: 1;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.card-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.card-change {
  font-size: 12px;
  font-weight: 500;
}

.card-change.positive {
  color: #28a745;
}

.card-change.negative {
  color: #dc3545;
}

.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.chart-container {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chart-container h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
}

.chart-mock {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 8px;
  height: 200px;
  margin-bottom: 20px;
}

.bar {
  width: 30px;
  background: linear-gradient(to top, #007bff, #66a6ff);
  border-radius: 4px 4px 0 0;
  min-height: 20px;
}

.chart-labels {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

.chart-labels span {
  width: 30px;
  text-align: center;
}

.pie-chart-mock {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.pie-slice {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--color);
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.tables-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.table-container {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.table-container h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.table-wrapper {
  overflow-x: auto;
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
  color: #666;
}

.rank {
  font-weight: bold;
  color: #007bff;
}

.product-name {
  font-weight: 500;
}

.sales-count {
  color: #666;
}

.sales-amount {
  font-weight: 600;
  color: #e74c3c;
}

.growth {
  font-weight: 500;
}

.growth.positive {
  color: #28a745;
}

.growth.negative {
  color: #dc3545;
}

.customer-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 12px;
}

@media (max-width: 768px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
  
  .tables-section {
    grid-template-columns: 1fr;
  }
  
  .analytics-overview {
    grid-template-columns: 1fr;
  }
  
  .customer-stats {
    grid-template-columns: 1fr;
  }
  
  .overview-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
