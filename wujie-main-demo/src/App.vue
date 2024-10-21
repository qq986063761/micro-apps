<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <el-menu
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
  >
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span></span>
    </el-menu-item>
  </el-menu>
  <RouterView />
</template>

<style scoped>

</style>
