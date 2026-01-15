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
      :loading="loadingEl"
    />
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'

export default {
  name: 'MicroApp',
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
  setup(props) {
    const loadingEl = ref(document.createElement('span'))
    
    // 获取子应用的iframe元素
    const getIframe = () => {
      // 方法1: 通过iframe的name属性获取（推荐方式）
      const iframe = document.querySelector(`iframe[name="${props.name}"]`)
      
      // 获取iframe的contentWindow
      if (iframe) {
        window.$mApp[props.name].window = iframe.contentWindow
      } else {
        // 如果iframe还没有创建，延迟重试
        setTimeout(() => {
          getIframe()
        }, 100)
      }
    }
    
    const fetch = (url, options) => {
      return window.fetch(url, options)
    }
    
    onMounted(() => {
      // 延迟获取iframe，因为wujie可能还没有完全创建
      nextTick(() => {
        getIframe()
      })
    })
    
    return {
      loadingEl,
      fetch
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
