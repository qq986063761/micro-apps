<script setup>
import { ref } from 'vue'
let onClickLogo = () => {
  window.$wujie.bus.$emit('click-logo')
}
</script>

<template>
  <div class="wujie-child-app" @click="onClickLogo">
    子应用
  </div>
</template>

<style lang="scss">
.wujie-child-app {
  height: 100vh;
  font-size: 50px;
}
</style>
