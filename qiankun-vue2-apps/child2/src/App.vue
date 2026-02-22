<template>
  <div id="app">
    <nav class="child2-nav">
      <!-- to 用子路径即可，router 的 base 会拼成完整 hash -->
      <router-link to="/child2/home">Home</router-link> |
      <router-link to="/child2/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log('child2 App mounted', window.__POWERED_BY_QIANKUN__ ? 'qiankun' : 'standalone', window.location.href)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  overflow: auto;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.child2-nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
