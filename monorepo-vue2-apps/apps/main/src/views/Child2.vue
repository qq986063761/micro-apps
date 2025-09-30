<template>
  <div class="child-container">
    <h2>子应用2 容器</h2>
    <p>子应用2 将在这里加载...</p>
  </div>
</template>

<script>
export default {
  name: 'Child2'
}
</script>

<style scoped>
.child-container {
  padding: 20px;
  border: 2px dashed #67c23a;
  border-radius: 8px;
  text-align: center;
  background-color: #f0f9ff;
}

.child-container h2 {
  color: #67c23a;
  margin-bottom: 10px;
}
</style>
