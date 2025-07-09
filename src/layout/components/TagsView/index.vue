<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="{ path: tag.path }"
        custom
        v-slot="{ navigate, isActive, isExactActive }"
        ref="tag"
      >
        <span
          :class="[
            'tags-view-item',
            isActive && 'router-link-active',
            isExactActive && 'router-link-exact-active',
          ]"
          @click="navigate"
          @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          {{ tag.meta?.title || tag.name }}
          <icon-close
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import path from 'path-browserify'
  import tagsViewStore from '@/store/modules/tagsView'
  import permissionStore from '@/store/modules/permission'
  import ScrollPane from './ScrollPane.vue'
  import { Close as IconClose } from '@element-plus/icons-vue'

  const route = useRoute()
  const router = useRouter()

  const visible = ref(false)
  const top = ref(0)
  const left = ref(0)
  const selectedTag = ref<any>({})
  const affixTags = ref<any[]>([])
  const scrollPane = ref()

  const visitedViews = computed(() => tagsViewStore().visitedViews)
  const routes = computed(() => permissionStore().routes)

  function isCurrentRoute(r: any) {
    return r.path === route.path
  }
  function isAffix(tag: any) {
    return tag.meta && tag.meta.affix
  }
  function filterAffixTags(routes: any[], basePath = '/') {
    let tags: any[] = []
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }
  function initTags() {
    affixTags.value = filterAffixTags(routes.value)
    for (const tag of affixTags.value) {
      if (tag.name) {
        tagsViewStore().addVisitedView(tag)
      }
    }
  }
  function addTags() {
    const { name } = route
    if (name) {
      tagsViewStore().addView(route)
    }
    return false
  }
  function moveToCurrentTag() {
    const tags = (scrollPane.value?.$refs?.tag || []) as any[]
    nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === route.path) {
          scrollPane.value.moveToTarget(tag)
          if (tag.to.fullPath !== route.fullPath) {
            tagsViewStore().updateVisitedView(route)
          }
          break
        }
      }
    })
  }
  function refreshSelectedTag(view: any) {
    tagsViewStore().delCachedView(view)
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath,
      })
    })
  }
  function closeSelectedTag(view: any) {
    tagsViewStore().delView(view)
    const views = visitedViews.value
    if (isCurrentRoute(view)) {
      toLastView(views, view)
    }
  }
  function closeOthersTags() {
    router.push(selectedTag.value)
    tagsViewStore().delOthersViews(selectedTag.value)
    moveToCurrentTag()
  }
  function closeAllTags(view: any) {
    tagsViewStore().delAllViews()
    const views = visitedViews.value
    if (affixTags.value.some(tag => tag.path === view.path)) {
      return
    }
    toLastView(views, view)
  }
  function toLastView(views: any[], view: any) {
    const latestView = views.slice(-1)[0]
    if (latestView) {
      router.push(latestView.fullPath)
    } else {
      if (view.name === 'Dashboard') {
        router.replace({ path: '/redirect' + view.fullPath })
      } else {
        router.push('/')
      }
    }
  }
  function openMenu(tag: any, e: MouseEvent) {
    const menuMinWidth = 105
    const offsetLeft = (e.currentTarget as HTMLElement).getBoundingClientRect().left
    const offsetWidth = (e.currentTarget as HTMLElement).offsetWidth
    const maxLeft = offsetWidth - menuMinWidth
    const leftPos = e.clientX - offsetLeft + 15
    left.value = leftPos > maxLeft ? maxLeft : leftPos
    top.value = e.clientY
    visible.value = true
    selectedTag.value = tag
  }
  function closeMenu() {
    visible.value = false
  }
  function handleScroll() {
    closeMenu()
  }

  watch(
    () => route.fullPath,
    () => {
      addTags()
      moveToCurrentTag()
    }
  )
  watch(visible, value => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  })
  onMounted(() => {
    initTags()
    addTags()
  })
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view-wrapper {
      .tags-view-item {
        user-select: none;
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.router-link-exact-active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;

          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .link {
        padding: 0 2px;
      }
      .el-icon-close {
        width: 16px;
        height: 16px;
        padding: 4px;
        margin-bottom: -4px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
