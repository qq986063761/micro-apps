<template>
  <div class="about">
    <h1>child2 about page</h1>
    <button @click="openChild1Modal">打开 child1 弹窗</button>
  </div>
</template>

<script>
export default {
  methods: {
    async openChild1Modal() {
      const Child1Modal = await import('child1/modal')
      Child1Modal.default.show()
    }
  }
}
</script>
