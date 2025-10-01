<template>
  <div class="child-view">
    <MicroApp
      name="child2"
      :url="child2Url"
      :props="child2Props"
    />
  </div>
</template>

<script>
import MicroApp from '@/components/MicroApp.vue'

export default {
  name: 'Child2View',
  components: {
    MicroApp
  },
  data() {
    return {
      child2Url: 'http://localhost:8082',
      child2Props: {
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
