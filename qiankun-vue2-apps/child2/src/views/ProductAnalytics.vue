<template>
  <div class="product-analytics">
    <h3>数据分析</h3>
    
    <div class="analytics-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h4>总销售额</h4>
          <p class="stat-value">¥{{ totalSales.toLocaleString() }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-content">
          <h4>商品总数</h4>
          <p class="stat-value">{{ productCount }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <h4>低库存商品</h4>
          <p class="stat-value">{{ lowStockProducts.length }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-content">
          <h4>热销商品</h4>
          <p class="stat-value">{{ topSellingProducts.length }}</p>
        </div>
      </div>
    </div>

    <div class="charts-section">
      <div class="chart-card">
        <h4>热销商品排行</h4>
        <div class="ranking-list">
          <div v-for="(product, index) in topSellingProducts" :key="product.id" class="ranking-item">
            <span class="rank">{{ index + 1 }}</span>
            <span class="product-name">{{ product.name }}</span>
            <span class="sales-count">{{ product.sales }} 件</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h4>库存预警</h4>
        <div class="warning-list">
          <div v-if="lowStockProducts.length === 0" class="no-warning">
            <p>✅ 所有商品库存充足</p>
          </div>
          <div v-else>
            <div v-for="product in lowStockProducts" :key="product.id" class="warning-item">
              <span class="product-name">{{ product.name }}</span>
              <span class="stock-count">{{ product.stock }} 件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductAnalytics',
  computed: {
    ...mapGetters(['productCount', 'totalSales', 'lowStockProducts', 'topSellingProducts'])
  }
}
</script>

<style lang="scss" scoped>
.product-analytics {
  h3 {
    margin: 0 0 2rem 0;
    color: #333;
  }

  .analytics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;

      .stat-icon {
        font-size: 2rem;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 50%;
      }

      .stat-content {
        h4 {
          margin: 0 0 0.5rem 0;
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .stat-value {
          margin: 0;
          color: #333;
          font-size: 1.5rem;
          font-weight: 600;
        }
      }
    }
  }

  .charts-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    .chart-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h4 {
        margin: 0 0 1.5rem 0;
        color: #333;
        font-size: 1.1rem;
      }

      .ranking-list {
        .ranking-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .rank {
            width: 30px;
            height: 30px;
            background: #f5576c;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.9rem;
            margin-right: 1rem;
          }

          .product-name {
            flex: 1;
            color: #333;
            font-weight: 500;
          }

          .sales-count {
            color: #666;
            font-size: 0.9rem;
          }
        }
      }

      .warning-list {
        .no-warning {
          text-align: center;
          padding: 2rem;
          color: #4caf50;
        }

        .warning-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .product-name {
            color: #333;
            font-weight: 500;
          }

          .stock-count {
            color: #f44336;
            font-weight: 600;
            background: #ffebee;
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .charts-section {
      grid-template-columns: 1fr;
    }
  }
}
</style>
