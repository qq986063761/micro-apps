<template>
  <div id="app" class="app">
    <el-menu
      default-active="2"
      class="app-menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="onSelect"
    >
      <el-menu-item :index="item.value" :key="item.value" v-for="item in menus">
        <span class="el-icon-document"></span>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
    <div class="app-main"></div>
  </div>
</template>

<script>
import { registerMicroApps, start } from 'qiankun'

export default {
  data() {
    return {
      menus: [
        {
          label: '目标',
          value: 'okr',
          url: 'http://localhost:8081/app-okr'
        },
        {
          label: '任务',
          value: 'task',
          url: '/app-task'
        },
        {
          label: '总结',
          value: 'sum',
          url: '/app-sum'
        },
      ],
    }
  },
  methods: {
    onSelect(val, path) {
      console.log('onSelect', val, path)

      let item = this.menus.find(item => item.value === val)
      location.href = item.url
    }
  },
  mounted() {
    // 启动 qiankun
    registerMicroApps([
      {
        name: 'okrApp',
        entry: '//localhost:8081',
        container: '.app-main',
        activeRule: '/',
      },
      {
        name: 'taskApp',
        entry: '//localhost:8080',
        container: '.app-main',
        activeRule: '/app-task',
      },
      {
        name: 'sumApp',
        entry: '//localhost:4200',
        container: '.app-main',
        activeRule: '/app-sum',
      },
    ])
    start()
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
}

.app-menu {
  width: 160px;
  height: 100%;
}

.app-main {
  flex: 1;
  overflow: hidden;
  height: 100%;
}
</style>
