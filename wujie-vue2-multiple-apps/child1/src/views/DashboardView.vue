<template>
  <div class="dashboard-view">
    <h2>📊 仪表板</h2>
    <div class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>总用户数</h3>
          <p class="stat-number">1,234</p>
        </div>
        <div class="stat-card">
          <h3>今日访问</h3>
          <p class="stat-number">567</p>
        </div>
        <div class="stat-card">
          <h3>活跃用户</h3>
          <p class="stat-number">89</p>
        </div>
        <div class="stat-card">
          <h3>转化率</h3>
          <p class="stat-number">12.5%</p>
        </div>
      </div>
      <div class="chart-section">
        <h3>访问趋势图</h3>
        <div class="mock-chart">
          <div class="chart-bar" style="height: 60%"></div>
          <div class="chart-bar" style="height: 80%"></div>
          <div class="chart-bar" style="height: 45%"></div>
          <div class="chart-bar" style="height: 90%"></div>
          <div class="chart-bar" style="height: 70%"></div>
          <div class="chart-bar" style="height: 85%"></div>
          <div class="chart-bar" style="height: 95%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-view {
  padding: 20px;
  color: #2c3e50;

  h2 {
    margin-bottom: 30px;
    color: #667eea;
    font-size: 2em;
  }

  .dashboard-content {
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;

      .stat-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;

        h3 {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 0.9em;
        }

        .stat-number {
          margin: 0;
          font-size: 2em;
          font-weight: bold;
          color: #667eea;
        }
      }
    }

    .chart-section {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      h3 {
        margin: 0 0 20px 0;
        color: #2c3e50;
      }

      .mock-chart {
        display: flex;
        align-items: end;
        height: 200px;
        gap: 10px;

        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, #667eea, #764ba2);
          border-radius: 4px 4px 0 0;
          min-height: 20px;
        }
      }
    }
  }
}
</style>
