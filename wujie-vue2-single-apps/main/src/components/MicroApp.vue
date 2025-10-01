<template>
  <div class="micro-app-container">
    <WujieVue
      v-if="url"
      :width="'100%'"
      :height="'100%'"
      :name="name"
      :url="url"
      :sync="true"
      :fetch="fetch"
      :props="props"
      :beforeLoad="beforeLoad"
      :beforeMount="beforeMount"
      :afterMount="afterMount"
      :beforeUnmount="beforeUnmount"
      :afterUnmount="afterUnmount"
    />
  </div>
</template>

<script>
import WujieVue from 'wujie-vue2'

export default {
  name: 'MicroApp',
  components: {
    WujieVue
  },
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    fetch(url, options) {
      return window.fetch(url, options)
    },
    beforeLoad() {
      console.log(`${this.name} 开始加载`)
    },
    beforeMount() {
      console.log(`${this.name} 开始挂载`)
    },
    afterMount() {
      console.log(`${this.name} 挂载完成`)
    },
    beforeUnmount() {
      console.log(`${this.name} 开始卸载`)
    },
    afterUnmount() {
      console.log(`${this.name} 卸载完成`)
    }
  }
}
</script>

<style lang="scss" scoped>
.micro-app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
