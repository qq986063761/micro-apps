<template>
  <div class="task-app" id="app">
    <nav>
      <router-link to="/task/home">任务-Home</router-link> |
      <router-link to="/task/about">任务-About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
.task-app {
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
