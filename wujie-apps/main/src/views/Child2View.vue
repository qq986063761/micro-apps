<template>
  <div class="child2-view">
    <h2>Child2 微前端应用</h2>
    <WujieVue
      ref="wujie"
      width="100%"
      height="500px"
      name="child2"
      url="http://localhost:8082"
      :sync="false"
    />
  </div>
</template>

<script>
export default {
  name: 'Child2View',
  mounted() {
    console.log('child2', this.$refs)
  }
}
</script>

<style scoped>
.child2-view {
  padding: 20px;
}
</style>
