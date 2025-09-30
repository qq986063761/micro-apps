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
    Child1Button: () => import('child1/Button'),
    Child2About: () => import('child2/AboutView')
  },
  methods: {
    
  },
  async mounted() {
    // 动态获取组件
    //  const Child1Button = await import('child1/Button')
    //  console.log('Child1Button', Child1Button.default)

    // 动态获取modal
    const Child1Modal = await import('child1/modal')
    // console.log('Child1Modal', Child1Modal.default)
    Child1Modal.default.show()

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
