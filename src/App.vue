<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import es from 'element-plus/dist/locale/es.mjs'
  import { useAppStore } from '@/store/modules/app'

  const appStore = useAppStore()
  const size = appStore.size
  const locale = ref(es)
  const zIndex = ref(3000)
</script>

<style lang="scss">
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
