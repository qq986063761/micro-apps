<template>
  <div class="analytics-view">
    <h2>📈 数据分析</h2>
    <div class="analytics-content">
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon">💰</div>
          <div class="metric-info">
            <h3>总收入</h3>
            <p class="metric-value">¥{{ totalRevenue.toLocaleString() }}</p>
            <span class="metric-change positive">+12.5%</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">🛒</div>
          <div class="metric-info">
            <h3>订单数量</h3>
            <p class="metric-value">{{ totalOrders }}</p>
            <span class="metric-change positive">+8.3%</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">👥</div>
          <div class="metric-info">
            <h3>用户数量</h3>
            <p class="metric-value">{{ totalUsers }}</p>
            <span class="metric-change positive">+15.2%</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">📊</div>
          <div class="metric-info">
            <h3>转化率</h3>
            <p class="metric-value">{{ conversionRate }}%</p>
            <span class="metric-change negative">-2.1%</span>
          </div>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-container">
          <h3>销售趋势</h3>
          <div class="chart-placeholder">
            <div class="chart-bars">
              <div v-for="(value, index) in salesData" :key="index" class="chart-bar">
                <div class="bar" :style="{ height: (value / Math.max(...salesData)) * 100 + '%' }"></div>
                <span class="bar-label">{{ ['1月', '2月', '3月', '4月', '5月', '6月'][index] }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3>用户分布</h3>
          <div class="pie-chart">
            <div class="pie-segment" style="--percentage: 40; --color: #f5576c;">
              <span>移动端 40%</span>
            </div>
            <div class="pie-segment" style="--percentage: 35; --color: #4CAF50;">
              <span>桌面端 35%</span>
            </div>
            <div class="pie-segment" style="--percentage: 25; --color: #2196F3;">
              <span>平板端 25%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="data-table">
        <h3>热门商品排行</h3>
        <table>
          <thead>
            <tr>
              <th>排名</th>
              <th>商品名称</th>
              <th>销量</th>
              <th>收入</th>
              <th>增长率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in topProducts" :key="product.id">
              <td>
                <span class="rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.sales }}</td>
              <td>¥{{ product.revenue.toLocaleString() }}</td>
              <td>
                <span class="growth" :class="product.growth > 0 ? 'positive' : 'negative'">
                  {{ product.growth > 0 ? '+' : '' }}{{ product.growth }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="insights">
        <h3>数据洞察</h3>
        <div class="insight-cards">
          <div class="insight-card">
            <div class="insight-icon">📈</div>
            <div class="insight-content">
              <h4>销售增长</h4>
              <p>本月销售额比上月增长 12.5%，主要得益于智能手机和平板电脑的热销。</p>
            </div>
          </div>
          <div class="insight-card">
            <div class="insight-icon">🎯</div>
            <div class="insight-content">
              <h4>用户行为</h4>
              <p>移动端用户占比最高，建议优化移动端用户体验以提升转化率。</p>
            </div>
          </div>
          <div class="insight-card">
            <div class="insight-icon">⚠️</div>
            <div class="insight-content">
              <h4>关注点</h4>
              <p>转化率略有下降，需要分析用户流失原因并制定改进策略。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnalyticsView',
  data() {
    return {
      totalRevenue: 1250000,
      totalOrders: 2847,
      totalUsers: 1523,
      conversionRate: 3.2,
      salesData: [120000, 135000, 110000, 145000, 160000, 175000],
      topProducts: [
        { id: 1, name: '智能手机', sales: 245, revenue: 735000, growth: 15.2 },
        { id: 2, name: '笔记本电脑', sales: 89, revenue: 533000, growth: 8.7 },
        { id: 3, name: '平板电脑', sales: 156, revenue: 624000, growth: 22.1 },
        { id: 4, name: '智能手表', sales: 203, revenue: 263000, growth: -5.3 },
        { id: 5, name: '无线耳机', sales: 567, revenue: 170000, growth: 12.8 }
      ]
    }
  },
  mounted() {
    console.log('[Child2] AnalyticsView 已挂载')
  }
}
</script>

<style lang="scss" scoped>
.analytics-view {
  padding: 20px;
  color: #2c3e50;

  h2 {
    margin-bottom: 30px;
    color: #f5576c;
    font-size: 2em;
  }

  .analytics-content {
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;

      .metric-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;

        .metric-icon {
          font-size: 2.5em;
          margin-right: 15px;
        }

        .metric-info {
          h3 {
            margin: 0 0 5px 0;
            color: #666;
            font-size: 0.9em;
          }

          .metric-value {
            margin: 0 0 5px 0;
            font-size: 1.8em;
            font-weight: bold;
            color: #2c3e50;
          }

          .metric-change {
            font-size: 0.8em;
            font-weight: bold;

            &.positive {
              color: #4CAF50;
            }

            &.negative {
              color: #f44336;
            }
          }
        }
      }
    }

    .charts-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      margin-bottom: 30px;

      .chart-container {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        h3 {
          margin: 0 0 20px 0;
          color: #2c3e50;
        }

        .chart-placeholder {
          height: 200px;

          .chart-bars {
            display: flex;
            align-items: end;
            height: 100%;
            gap: 10px;

            .chart-bar {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;

              .bar {
                width: 100%;
                background: linear-gradient(to top, #f5576c, #f093fb);
                border-radius: 4px 4px 0 0;
                min-height: 20px;
                margin-bottom: 10px;
              }

              .bar-label {
                font-size: 0.8em;
                color: #666;
              }
            }
          }
        }

        .pie-chart {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .pie-segment {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 6px;
            background: var(--color);
            color: white;
            font-weight: bold;
          }
        }
      }
    }

    .data-table {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;

      h3 {
        margin: 0 0 20px 0;
        color: #2c3e50;
      }

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f8f9fa;
          font-weight: bold;
          color: #2c3e50;
        }

        .rank {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          font-weight: bold;
          color: white;

          &.rank-1 {
            background: #FFD700;
          }

          &.rank-2 {
            background: #C0C0C0;
          }

          &.rank-3 {
            background: #CD7F32;
          }

          &:not(.rank-1):not(.rank-2):not(.rank-3) {
            background: #666;
          }
        }

        .growth {
          font-weight: bold;

          &.positive {
            color: #4CAF50;
          }

          &.negative {
            color: #f44336;
          }
        }
      }
    }

    .insights {
      h3 {
        margin: 0 0 20px 0;
        color: #2c3e50;
      }

      .insight-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;

        .insight-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: flex-start;

          .insight-icon {
            font-size: 2em;
            margin-right: 15px;
          }

          .insight-content {
            h4 {
              margin: 0 0 10px 0;
              color: #2c3e50;
            }

            p {
              margin: 0;
              color: #666;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .analytics-content {
    .charts-section {
      grid-template-columns: 1fr;
    }

    .metrics-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
