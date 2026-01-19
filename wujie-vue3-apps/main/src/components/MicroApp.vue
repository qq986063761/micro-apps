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
      :props="appProps"
      :loading="loadingEl"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { appComm } from '@/plugins'

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
    
    // 使用无界的 props API 传递数据和方法
    const appProps = computed(() => {
      const baseProps = appComm.getProps(props.name)
      return {
        ...baseProps,
        ...props.props // 合并外部传入的 props
      }
    })
    
    const fetch = (url, options) => {
      return window.fetch(url, options)
    }
    
    return {
      loadingEl,
      fetch,
      appProps
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
