<template>
  <div id="app">
    <Child1Button />

    <section style="margin:20px;padding:12px;border:1px dashed #ccc;">
      <h3>Remote from child2</h3>
      <Child2About />
    </section>

    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  components: { 
    Child2About: () => import('child2/AboutView')
  },
  methods: {
    
  },
  async mounted() {
    // 等待插件加载完成后再使用
    setTimeout(() => {
      // 使用全局注册的 modal
      if (this.$modal) {
        this.$modal.show()
      }
    }, 1000)

    console.log('main app mounted', this.$ajax)
    this.$ajax.postRoot()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
