<template>
<!-- 
  :sync="true" 子应用内路由变化后，刷新不会回到子应用初始页面
 -->
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
      :loading="loadingEl"
    />
  </div>
</template>

<script>
export default {
  name: 'MicroApp',
  data() {
    return {
      loadingEl: document.createElement('span')
    }
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
    // 获取子应用的iframe元素
    getIframe() {
      // 方法1: 通过iframe的name属性获取（推荐方式）
      const iframe = document.querySelector(`iframe[name="${this.name}"]`)
      
      // 获取iframe的contentWindow
      if (iframe) {
        window.$microApp[this.name].window = iframe.contentWindow
      } else {
        // 如果iframe还没有创建，延迟重试
        setTimeout(() => {
          this.getIframe()
        }, 100)
      }
    },
    fetch(url, options) {
      return window.fetch(url, options)
    }
  },
  mounted() {
    // 延迟获取iframe，因为wujie可能还没有完全创建
    this.$nextTick(() => {
      this.getIframe()
    })
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
