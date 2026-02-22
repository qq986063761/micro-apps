<template>
  <div class="child-view">
    <div
      v-show="currentApp === 'child1'"
      class="child-view-slot"
    >
      <MicroApp name="child1" />
    </div>
    <div
      v-show="currentApp === 'child2'"
      class="child-view-slot"
    >
      <MicroApp name="child2" />
    </div>
  </div>
</template>

<script>
import MicroApp from '@/components/MicroApp.vue'

export default {
  name: 'ChildView',
  components: {
    MicroApp
  },
  computed: {
    currentApp() {
      return this.$route.meta?.app || (this.$route.path.startsWith('/child1') ? 'child1' : 'child2')
    }
  }
}
</script>

<style lang="scss" scoped>
.child-view {
  width: 100%;
  height: 100%;
}

.child-view-slot {
  width: 100%;
  height: 100%;
}
</style>
