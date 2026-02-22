<template>
  <div
    :id="containerId"
    class="micro-app-container"
    v-loading="loading"
  />
</template>

<script>
import { mapState } from 'vuex'
import { injectThemeToDocument } from '@/assets/theme'
import { ensureAppsRegistered } from '@/micro-apps'

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
      loading: true
    }
  },
  computed: {
    ...mapState(['theme']),
    containerId() {
      return `subapp-${this.name}`
    }
  },
  watch: {
    theme: {
      handler() {
        injectThemeToDocument(document)
      },
      immediate: false
    }
  },
  mounted() {
    // 首次进入任意子应用路由时再注册并启动 qiankun，保证当前对应的 container 已存在
    ensureAppsRegistered()
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false
      }, 300)
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
