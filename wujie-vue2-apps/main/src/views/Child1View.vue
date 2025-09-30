<template>
  <div class="child1-view">
    <h2>Child1 微前端应用</h2>
    <WujieVue
      ref="wujie"
      width="100%"
      height="500px"
      name="child1"
      url="http://localhost:8081"
      :sync="false"
    />
  </div>
</template>

<script>
export default {
  name: 'Child1View',
  mounted() {
    console.log('child1', this.$refs)
  }
}
</script>

<style scoped>
.child1-view {
  padding: 20px;
}
</style>
