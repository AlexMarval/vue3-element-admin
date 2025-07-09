<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="left-menu"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-top-route="true"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import Logo from './Logo.vue'
  import SidebarItem from './SidebarItem.vue'
  import { useAppStore } from '@/store/modules/app'
  import permissionStore from '@/store/modules/permission'
  import settingsStore from '@/store/modules/settings'

  const variables = ref({
    menuBg: '#304156',
    menuText: '#fff',
    menuActiveText: '#409EFF',
  })

  const sidebar = computed(() => useAppStore().sidebar)
  const permission_routes = computed(() => permissionStore().routes)
  const secondMenuPopup = computed(() => settingsStore().secondMenuPopup)
  const showLogo = computed(() => settingsStore().sidebarLogo)
  const isCollapse = computed(() => (secondMenuPopup.value ? true : !sidebar.value.opened))
  const route = useRoute()
  const activeMenu = computed(() => {
    const { meta, path } = route
    if (meta.activeMenu) {
      return String(meta.activeMenu)
    }
    return String(path)
  })
</script>
