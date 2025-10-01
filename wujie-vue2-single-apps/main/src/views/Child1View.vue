<template>
  <div class="child-view">
    <MicroApp
      name="child1"
      :url="child1Url"
      :props="child1Props"
    />
  </div>
</template>

<script>
import MicroApp from '@/components/MicroApp.vue'

export default {
  name: 'Child1View',
  components: {
    MicroApp
  },
  data() {
    return {
      child1Url: 'http://localhost:8081',
      child1Props: {
        data: {
          message: '来自主应用的数据'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.child-view {
  width: 100%;
  height: 100%;
}
</style>
