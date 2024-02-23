<template>
  <div class="about">
    <h1>This is an about page</h1>

    <!-- <button @click="openOkrComp">调用okr的组件</button> -->
  </div>
</template>

<script>
export default {
  methods: {
    openOkrComp() {
      window.rootVm.$emit('action')
    }
  }
}
</script>
