<script setup lang="ts">
  import { ref, computed } from 'vue'
  import path from 'path-browserify'
  import { isExternal } from '@/utils/validate'
  import AppLink from './Link.vue'
  import SidebarItem from './SidebarItem.vue'
  // import FixiOSBug from './FixiOSBug';
  // Update the path below if SvgIcon.vue is located elsewhere in your project
  // import SvgIcon from '../../components/index';
  import { storeToRefs } from 'pinia'
  import useSettingsStore from '@/store/modules/settings'

  interface RouteMeta {
    title?: string
    icon?: string | object
    hidden?: boolean
    alwaysShow?: boolean
  }

  interface RouteItem {
    path: string
    meta?: RouteMeta
    children?: RouteItem[]
    noShowingChildren?: boolean
  }

  const props = defineProps<{
    item: RouteItem
    isNest?: boolean
    basePath?: string
    isTopRoute?: boolean
  }>()

  const isNest = computed(() => props.isNest ?? false)
  const basePath = computed(() => props.basePath ?? '')

  // FixiOSBug();

  const onlyOneChild = ref<RouteItem | null>(null)

  const settingsStore = useSettingsStore()
  const { secondMenuPopup } = storeToRefs(settingsStore)

  const isItemHidden = computed(() => {
    return props.item.meta?.hidden ?? false
  })

  const getMetaIconPath = (item: RouteItem): string | object | undefined => {
    return item.meta?.icon
  }

  const get2MetaIconPath = (child: RouteItem, parent: RouteItem): string | object | undefined => {
    return child.meta?.icon || parent.meta?.icon
  }

  const hasOneShowingChild = (children: RouteItem[] = [], parent: RouteItem): boolean => {
    const showingChildren = children.filter(child => {
      if (child.meta?.hidden) {
        return false
      } else {
        onlyOneChild.value = child
        return true
      }
    })

    if (showingChildren.length === 1) {
      return true
    }

    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
      return true
    }

    return false
  }

  const resolvePath = (routePath: string): string => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(basePath.value)) {
      return basePath.value
    }
    return path.resolve(basePath.value, routePath)
  }

  const subMenu = ref(null)
  const isSubMenuOpen = ref(false)

  const toggleSubMenu = () => {
    isSubMenuOpen.value = !isSubMenuOpen.value
  }

  const onEnter = (el: Element) => {
    const element = el as HTMLElement
    element.style.maxHeight = '0'
    element.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      element.style.maxHeight = `${element.scrollHeight}px`
    })
  }

  const onLeave = (el: Element) => {
    const element = el as HTMLElement
    element.style.maxHeight = `${element.scrollHeight}px`
    requestAnimationFrame(() => {
      element.style.maxHeight = '0'
    })
  }
</script>

<template>
  <div v-if="!isItemHidden" class="menu-item-container">
    <!-- Leaf menu item -->
    <template
      v-if="
        hasOneShowingChild(props.item.children, props.item) &&
        (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
        !props.item.meta?.alwaysShow
      "
    >
      <app-link
        v-if="onlyOneChild?.meta"
        :to="resolvePath(onlyOneChild!.path)"
        class="menu-item-link"
      >
        <div
          class="menu-item"
          :class="{
            'is-active': $route.path === resolvePath(onlyOneChild.path),
            'submenu-title-noDropdown': !isNest,
          }"
        >
          <span class="item-content">
            <template v-if="get2MetaIconPath(onlyOneChild, props.item)">
              <svg-icon
                v-if="typeof get2MetaIconPath(onlyOneChild, props.item) === 'string'"
                class="menu-icon"
                :icon-class="get2MetaIconPath(onlyOneChild, props.item) as string"
              />
              <component
                v-else
                :is="get2MetaIconPath(onlyOneChild, props.item)"
                class="menu-icon"
              />
            </template>
            <span class="menu-title">{{ onlyOneChild.meta.title }}</span>
          </span>
        </div>
      </app-link>
    </template>

    <!-- Sub-menu -->
    <div v-else class="sub-menu-container">
      <div
        ref="subMenu"
        class="sub-menu-title"
        :class="{ 'is-active': $route.path.startsWith(resolvePath(props.item.path)) }"
        @click="toggleSubMenu"
      >
        <span class="item-content">
          <template v-if="props.item.meta">
            <svg-icon
              v-if="typeof getMetaIconPath(props.item) === 'string'"
              class="menu-icon"
              :icon-class="getMetaIconPath(props.item) as string"
            />
            <component
              v-else-if="getMetaIconPath(props.item)"
              :is="getMetaIconPath(props.item)"
              class="menu-icon"
            />
          </template>
          <span v-if="props.item.meta && !secondMenuPopup" class="menu-title">{{
            props.item.meta.title
          }}</span>
        </span>
        <svg
          class="arrow-icon"
          :class="{ 'is-open': isSubMenuOpen }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <transition name="submenu" @enter="onEnter" @leave="onLeave">
        <div v-if="isSubMenuOpen" class="sub-menu-items">
          <sidebar-item
            v-for="child in props.item.children"
            :key="child.path"
            :is-nest="true"
            :item="child"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .menu-item-container {
    width: 100%;
  }

  .menu-item-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .menu-item,
  .sub-menu-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: #bfcbd9;

    &:hover {
      background-color: #263445;
    }

    &.is-active {
      color: #409eff;
      background-color: #263445;
    }
  }

  .item-content {
    display: flex;
    align-items: center;
  }

  .menu-icon {
    width: 1rem; /* 16px */
    height: 1rem; /* 16px */
    margin-right: 12px;
    flex-shrink: 0;
  }

  .menu-title {
    font-size: 14px;
    white-space: nowrap;
  }

  .arrow-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  .sub-menu-items {
    background-color: #1f2d3d;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
  }

  .nest-menu .menu-item,
  .nest-menu .sub-menu-title {
    padding-left: 35px;
  }
</style>
