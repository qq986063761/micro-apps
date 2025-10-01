<template>
  <div id="app">
    <SideMenu @app-change="handleAppChange" />
    <div class="main-content">
      <MicroApp
        v-if="currentApp"
        :name="currentApp.name"
        :url="currentApp.url"
        :props="currentApp.props"
      />
      <router-view v-else />
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'
import MicroApp from './components/MicroApp.vue'

export default {
  name: 'App',
  components: {
    SideMenu,
    MicroApp
  },
  data() {
    return {
      currentApp: null,
      microApps: {
        child1: {
          name: 'child1',
          url: 'http://localhost:8081',
          props: {
            data: {
              message: '来自主应用的数据 - Child1'
            }
          }
        },
        child2: {
          name: 'child2',
          url: 'http://localhost:8082',
          props: {
            data: {
              message: '来自主应用的数据 - Child2'
            }
          }
        }
      }
    }
  },
  methods: {
    handleAppChange(appKey) {
      if (this.microApps[appKey]) {
        this.currentApp = this.microApps[appKey]
      } else {
        this.currentApp = null
        this.$router.push({ name: appKey })
      }
      console.log('main handleAppChange', appKey, this.currentApp)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  height: 100vh;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.hello {
  color: red;
}

</style>
