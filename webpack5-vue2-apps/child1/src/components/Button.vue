<template>
  <button class="child1-button" style="color: red;">
    Child1 Button
    {{ child1State || '没找到store' }}
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Button',
  computed: {
    ...mapState(['child1State'])
  },
  mounted() {
    console.log('child1 Button mounted', this)
  }
}
</script>

<style>

</style>