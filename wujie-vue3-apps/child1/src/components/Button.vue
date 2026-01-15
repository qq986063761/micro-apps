<template>
  <el-button class="child1-button" type="primary" @click="handleClick">
    {{ text || '没获取到 child1 中 store 数据' }}
  </el-button>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance } from 'vue'
import { useChild1Store } from '@/store'

const store = useChild1Store()
const text = computed(() => store.text)

onMounted(() => {
  console.log('child1 Button mounted')
})

const handleClick = () => {
  const instance = getCurrentInstance()
  if (instance && instance.appContext.config.globalProperties.$ajax) {
    instance.appContext.config.globalProperties.$ajax.post()
  }
}
</script>
