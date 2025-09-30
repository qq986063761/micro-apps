<template>
  <div class="child-container">
    <h2>子应用1 容器</h2>
    <p>子应用1 将在这里加载...</p>
  </div>
</template>

<script>
export default {
  name: 'Child1'
}
</script>

<style scoped>
.child-container {
  padding: 20px;
  border: 2px dashed #409eff;
  border-radius: 8px;
  text-align: center;
  background-color: #f0f9ff;
}

.child-container h2 {
  color: #409eff;
  margin-bottom: 10px;
}
</style>
