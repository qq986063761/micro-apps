<template>
<!-- 
  :sync="true" 子应用内路由变化后，刷新不会回到子应用初始页面
 -->
  <div class="micro-app-container">
    <!-- alive: 保活模式，配合主应用 keep-alive 使用，切走时不调用子应用 __WUJIE_UNMOUNT，避免二次进入白屏 -->
    <WujieVue
      :width="'100%'"
      :height="'100%'"
      :name="name"
      :url="url"
      :alive="true"
      :sync="true"
      :fetch="fetch"
      :props="props"
      :loading="loadingEl"
      :afterMount="onChildAfterMount"
    />
  </div>
</template>

<script>
// 创建 Element UI 风格的 loading 元素（与 el-loading-mask 结构一致，样式由已引入的 element-ui 提供）
function createElementUILoadingEl() {
  const mask = document.createElement('div')
  mask.className = 'el-loading-mask'
  mask.innerHTML = `
    <div class="el-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
      <p class="el-loading-text">加载中...</p>
    </div>
  `
  return mask
}

// 按 name 映射子应用的 url 和 props，子应用用 window.$wujie.props.$app 获取，避免跨域时 window.parent 不可用
const APP_CONFIG = {
  child1: {
    url: 'http://localhost:8081',
    props: {
      data: { message: 'child1 初始化数据' }
    }
  },
  child2: {
    url: 'http://localhost:8082',
    props: {
      data: { message: 'child2 初始化数据' }
    }
  }
}

export default {
  name: 'MicroApp',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loadingEl: createElementUILoadingEl()
    }
  },
  computed: {
    url() {
      const config = APP_CONFIG[this.name]
      return config ? config.url : ''
    },
    props() {
      const config = APP_CONFIG[this.name]
      const base = config?.props ? { ...config.props } : {}
      return { ...base, $app: window.$app }
    }
  },
  methods: {
    fetch(url, options) {
      // 需要改参数就可以拦截请求
      return window.fetch(url, options)
    },
    /**
     * 无界子应用挂载完成后调用（子应用需做生命周期改造时才会触发，见无界文档）。
     * 在此统一设置 slot.window / slot.ready，符合无界生命周期，无需在 mounted 中轮询 iframe。
     */
    onChildAfterMount(appWindow) {
      console.log('MicroApp onChildAfterMount', this.name, appWindow)
      const slot = window.$app?.apps?.[this.name]
      if (slot) {
        slot.window = appWindow
        slot.ready = true
      }
    }
  },
  activated() {
    console.log('MicroApp activated', this.name)
    // this.loadingEl.style.display = 'block'
  },
  deactivated() {
    console.log('MicroApp deactivated', this.name)
    // this.loadingEl.style.display = 'none'
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
