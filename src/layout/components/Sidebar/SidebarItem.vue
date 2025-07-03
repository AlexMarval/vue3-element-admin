<script setup lang="ts">
import { ref, computed } from 'vue';
import path from 'path-browserify';
import { isExternal } from '@/utils/validate';
import AppLink from './Link.vue';
import SidebarItem from './SidebarItem.vue';
// import FixiOSBug from './FixiOSBug';
// Update the path below if SvgIcon.vue is located elsewhere in your project
// import SvgIcon from '../../components/index';
import { storeToRefs } from 'pinia';
import useSettingsStore from '@/store/modules/settings';

interface RouteMeta {
  title?: string;
  icon?: string | object;
  hidden?: boolean;
  alwaysShow?: boolean;
}

interface RouteItem {
  path: string;
  meta?: RouteMeta;
  children?: RouteItem[];
  noShowingChildren?: boolean;
}

const props = defineProps<{
  item: RouteItem;
  isNest?: boolean;
  basePath?: string;
  isTopRoute?: boolean;
}>();

const isNest = computed(() => props.isNest ?? false);
const basePath = computed(() => props.basePath ?? '');

// FixiOSBug();

const onlyOneChild = ref<RouteItem | null>(null);

const settingsStore = useSettingsStore();
const { secondMenuPopup } = storeToRefs(settingsStore);

const isItemHidden = computed(() => {
  return props.item.meta?.hidden ?? false;
});

const getMetaIconPath = (item: RouteItem): string | object | undefined => {
  return item.meta?.icon;
};

const get2MetaIconPath = (child: RouteItem, parent: RouteItem): string | object | undefined => {
  return child.meta?.icon || parent.meta?.icon;
};

const hasOneShowingChild = (children: RouteItem[] = [], parent: RouteItem): boolean => {
  const showingChildren = children.filter((child) => {
    if (child.meta?.hidden) {
      return false;
    } else {
      onlyOneChild.value = child;
      return true;
    }
  });

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
};

const resolvePath = (routePath: string): string => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(basePath.value)) {
    return basePath.value;
  }
  return path.resolve(basePath.value, routePath);
};
</script>

<template>
  <div v-if="!isItemHidden" class="root-sidebar-item">
    <template
      v-if="hasOneShowingChild(props.item.children, props.item) && (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) && !props.item.meta?.alwaysShow"
    >
      <app-link class="link" :to="resolvePath(onlyOneChild!.path)">
        <el-menu-item
          v-if="onlyOneChild?.meta"
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          class="flex items-center px-4 py-2 transition-colors duration-150 hover:bg-gray-700"
        >
          <template v-if="get2MetaIconPath(onlyOneChild, props.item)">
            <span class="flex items-center gap-2">
              <template v-if="typeof get2MetaIconPath(onlyOneChild, props.item) === 'string'">
                <svg-icon class="w-5 h-5 flex-shrink-0 text-gray-300"
                  :icon-class="get2MetaIconPath(onlyOneChild, props.item) as string"
                />
              </template>
              <template v-else>
                <component
                  :is="get2MetaIconPath(onlyOneChild, props.item)"
                  class="w-5 h-5 flex-shrink-0 text-gray-300"
                />
              </template>
              <span class="text-[14px] font-medium text-gray-300">
                {{ onlyOneChild.meta.title }}
              </span>
            </span>
          </template>
          <template v-else>
            <span class="flex items-center gap-2">
              <span class="text-[14px] font-medium text-gray-300">
                {{ onlyOneChild.meta.title }}
              </span>
            </span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(props.item.path)" teleported>
      <template v-if="props.item.meta" #title>
        <svg-icon
          v-if="typeof getMetaIconPath(props.item) === 'string'"
          :icon-class="getMetaIconPath(props.item) as string"
          class="w-5 h-5 flex-shrink-0 text-[#bfcbd9]"
        />
        <component
          v-else-if="getMetaIconPath(props.item)"
          :is="getMetaIconPath(props.item)"
          class="w-5 h-5 flex-shrink-0 text-[#bfcbd9] "
        />
        <span
          v-if="!secondMenuPopup"
          class="text text-two text-[#bfcbd9]"
        >{{ props.item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="child in props.item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.link :deep(.el-menu-tooltip__trigger) {
  position: relative;
  padding: 0;
}

.left-menu-item,
.left-sub-menu :deep(.el-sub-menu__title) {
  display: block;
}

.el-svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.left-sub-menu :deep(.el-sub-menu__icon-arrow) {
  color: #bfcbd9 !important;
}
</style>
