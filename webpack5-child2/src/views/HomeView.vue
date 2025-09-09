<template>
  <div class="home child2-home">
    <h1>🏠 Child2 Home 页面</h1>
    <div class="home-content">
      <div class="section">
        <h3>欢迎来到 Child2 应用</h3>
        <p>这是一个功能丰富的微前端子应用，展示了各种交互功能。</p>
      </div>
      
      <div class="section">
        <h3>实时数据展示</h3>
        <div class="data-display">
          <div class="data-item">
            <span class="label">当前时间:</span>
            <span class="value">{{ currentTime }}</span>
          </div>
          <div class="data-item">
            <span class="label">访问次数:</span>
            <span class="value">{{ visitCount }}</span>
          </div>
          <div class="data-item">
            <span class="label">用户评分:</span>
            <span class="value">{{ rating }}/5 ⭐</span>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h3>交互功能</h3>
        <div class="interactive-area">
          <button @click="incrementVisit" class="action-button">
            增加访问次数
          </button>
          <button @click="changeRating" class="action-button">
            更改评分
          </button>
          <button @click="resetData" class="action-button reset">
            重置数据
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      currentTime: '',
      visitCount: 0,
      rating: 5,
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 1000)
  },
  beforeDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleTimeString()
    },
    incrementVisit() {
      this.visitCount++
    },
    changeRating() {
      this.rating = Math.floor(Math.random() * 5) + 1
    },
    resetData() {
      this.visitCount = 0
      this.rating = 5
    }
  }
}
</script>

<style scoped lang="scss">
.child2-home {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
  padding: 25px;
  border-radius: 12px;
  margin: 10px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.home-content {
  margin-top: 20px;
}

.section {
  background: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
  backdrop-filter: blur(10px);
}

.section h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.data-display {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #2c3e50;
  font-weight: bold;
}

.interactive-area {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.action-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-button.reset {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}
</style>
