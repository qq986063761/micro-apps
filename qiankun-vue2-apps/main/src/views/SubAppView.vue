<template>
  <!-- 子应用由乾坤挂载到 App.vue 的 #subapp-container，本组件仅作路由占位 -->
  <div class="subapp-view" />
</template>

<script>
export default {
  name: 'SubAppView'
}
</script>

<style lang="scss" scoped>
.subapp-view {
  width: 100%;
  height: 100%;
}
</style>
