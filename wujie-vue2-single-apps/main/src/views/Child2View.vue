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
        },
        // 通过 props 注入，子应用用 window.$wujie.props.$app 获取，避免跨域时 window.parent 不可用
        $app: window.$app
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
