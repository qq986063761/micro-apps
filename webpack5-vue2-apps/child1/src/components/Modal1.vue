<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Modal',
  computed: {
    ...mapState(['child1State'])
  },
  methods: {
    show() {
      console.log('show child1 modal1', this, this.child1State, this.$ajax)
      this.$ajax.postChild1()
    }
  }
}
</script>

<style>

</style>