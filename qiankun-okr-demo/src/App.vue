<template>
  <div class="okr-app" id="app">
    <nav>
      <router-link to="/">目标-Home</router-link> |
      <router-link to="/about">目标-About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
.okr-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

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
}
</style>
