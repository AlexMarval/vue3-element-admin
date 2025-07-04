<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>

        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>

  <div
    v-if="fullTitle"
    class="text-xs text-gray-400 mt-1 ml-2 select-text truncate"
    style="max-width: 100%"
  >
    {{ fullTitle }}
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { compile } from 'path-to-regexp'

  interface BreadcrumbMeta {
    title: string
    breadcrumb?: boolean
  }

  interface BreadcrumbItem {
    path: string
    meta: BreadcrumbMeta
    redirect?: string
    name?: string | number | symbol | undefined
  }

  const route = useRoute()
  const router = useRouter()
  const levelList = ref<BreadcrumbItem[]>([])

  const isBreadcrumbItem = (item: unknown): item is BreadcrumbItem => {
    if (typeof item !== 'object' || item === null) return false
    const maybe = item as { meta?: unknown }
    if (!maybe.meta || typeof maybe.meta !== 'object' || maybe.meta === null) return false

    return 'title' in maybe.meta && typeof (maybe.meta as { title: unknown }).title === 'string'
  }

  const isDashboard = (route: BreadcrumbItem | undefined): boolean => {
    if (!route || !route.name) return false
    return String(route.name).trim().toLowerCase() === 'dashboard'
  }

  // Agregar el breadcrumb raíz manualmente si falta
  const getBreadcrumb = (): void => {
    const matched: BreadcrumbItem[] = route.matched.filter(isBreadcrumbItem).map(item => ({
      path: item.path,
      meta: {
        title: (item.meta as unknown as BreadcrumbMeta).title,
        breadcrumb: (item.meta as unknown as BreadcrumbMeta).breadcrumb,
      },
      redirect: (item as { redirect?: string }).redirect,
      name: item.name,
    }))
    let list = matched.filter(item => item.meta.breadcrumb !== false)
    // Si el primer breadcrumb no es dashboard, lo agregamos manualmente
    if (list.length && !isDashboard(list[0])) {
      list = [
        { path: '/dashboard', meta: { title: 'Panel de control' }, name: 'dashboard' },
        ...list,
      ]
    }
    levelList.value = list
  }

  const pathCompile = (path: string): string => {
    const params = route.params
    const toPath = compile(path)
    return toPath(params)
  }

  const handleLink = (item: BreadcrumbItem): void => {
    const { redirect, path } = item
    if (redirect) {
      router.push(redirect)
      return
    }
    router.push(pathCompile(path))
  }

  watch(
    () => route.fullPath,
    () => {
      if (route.path.startsWith('/redirect/')) return
      getBreadcrumb()
    }
  )

  onMounted(() => {
    getBreadcrumb()
  })

  const fullTitle = computed(() => levelList.value.map(item => item.meta.title).join(' / '))
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }

    .el-breadcrumb__item {
      :deep(.el-breadcrumb__inner a) {
        font-weight: 400 !important;
      }
    }
  }
</style>
