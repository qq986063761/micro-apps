<script setup>
import { ref, computed } from 'vue'
let active = ref('1')
let menus = ref([
  {
    label: '子应用',
    value: '1',
    name: 'child',
    url: 'http://localhost:5174/'
  },
  {
    label: '子应用1',
    value: '2',
    name: 'child1',
    url: 'http://localhost:5175/'
  }
])

let name = computed(() => {
  return menus.value.find(item => item.value === active.value).name
})
let url = computed(() => {
  return menus.value.find(item => item.value === active.value).url
})

let beforeLoad = (event) => {
  console.log('beforeLoad', event)
}
let beforeMount = (event) => {
  console.log('beforeMount', event)
}
let afterMount = (event) => {
  console.log('afterMount', event)
}
let beforeUnmount = (event) => {
  console.log('beforeUnmount', event)
}
let afterUnmount = (event) => {
  console.log('afterUnmount', event)
}

let onClickLogo = () => {
  console.log('click logo in child')
}
</script>

<template>
  <div class="wujie-main-app">
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      :default-active="active"
      text-color="#fff"
      @select="active = $event"
    >
      <el-menu-item :index="item.value" v-for="item in menus" :key="item.value">
        <el-icon><Menu /></el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
    <!-- :fetch="fetch" -->
    <WujieVue
      class="wujie-container"
      height="100%"
      sync
      :name="name"
      :url="url"
      :props="{
        key: 'value'
      }"
      :beforeLoad="beforeLoad"
      :beforeMount="beforeMount"
      :afterMount="afterMount"
      :beforeUnmount="beforeUnmount"
      :afterUnmount="afterUnmount"
      @click-logo="onClickLogo"
    ></WujieVue>
  </div>
</template>

<style lang="scss">
.wujie-main-app {
  display: flex;
  height: 100vh;

  .wujie-container {
    flex: 1;
    overflow: hidden;
  }
}
</style>
