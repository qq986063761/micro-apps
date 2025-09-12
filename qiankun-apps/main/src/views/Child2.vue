<template>
  <div class="child2">
    <h2>子应用2 - 商品管理</h2>
    <p>这个页面将加载子应用2的内容</p>
    <div class="loading" v-if="loading">
      <p>正在加载子应用2...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Child2',
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    // 模拟加载时间
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>

<style scoped>
.child2 {
  text-align: center;
  padding: 40px 20px;
}

.loading {
  color: #42b983;
  font-size: 18px;
}
</style>
