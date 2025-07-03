<template>
  <div class="flex justify-center items-center">
    <div :class="['relative inline-flex items-center', { 'ml-2 w-[210px]': show }]">
      <svg-icon
        class="w-5 h-5 text-gray-500 cursor-pointer"
        icon-class="search"
        @click.stop="click"
      />
      <el-select
        ref="headerSearchSelect"
        v-model="search"
        :remote-method="querySearch"
        filterable
        default-first-option
        remote
        placeholder="Search"
        @change="change"
        class="transition-all duration-200 overflow-hidden bg-transparent border-b border-gray-300 focus:ring-0 focus:border-gray-400"
        :style="{ width: show ? '210px' : '0px' }"
      >
        <el-option
          v-for="optItem in options"
          :key="optItem.item.path"
          :value="optItem.item"
          :label="optItem.item.title.join(' > ')"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import Fuse from 'fuse.js';
import path from 'path-browserify';
import store from '@/store';

interface RouteMeta {
  hidden?: boolean;
  title?: string;
}

interface AppRoute {
  path: string;
  meta?: RouteMeta;
  redirect?: string;
  children?: AppRoute[];
}

interface RouteItem {
  path: string;
  title: string[];
}

interface FuseResultItem {
  item: RouteItem;
  refIndex: number;
}

const search = ref('');
const options = ref<FuseResultItem[]>([]);
const searchPool = ref<RouteItem[]>([]);
const show = ref(false);
const fuse = ref<Fuse<RouteItem> | null>(null);
const headerSearchSelect = ref<InstanceType<typeof HTMLElement> | null>(null);

const routes = computed(() => store.permission().routes as AppRoute[]);

watch(routes, (newRoutes) => {
  searchPool.value = generateRoutes(newRoutes);
});

watch(searchPool, (list) => {
  initFuse(list);
});

watch(show, (value) => {
  if (value) {
    document.body.addEventListener('click', close);
  } else {
    document.body.removeEventListener('click', close);
  }
});

onMounted(() => {
  searchPool.value = generateRoutes(routes.value);
});

const click = (): void => {
  show.value = !show.value;
  if (show.value) {
    headerSearchSelect.value?.focus();
  }
};

const close = (): void => {
  headerSearchSelect.value?.blur();
  options.value = [];
  show.value = false;
};

const change = (val: RouteItem): void => {
  window.location.href = val.path;
  search.value = '';
  options.value = [];
  nextTick(() => {
    show.value = false;
  });
};

const initFuse = (list: RouteItem[]): void => {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'path', weight: 0.3 }
    ]
  });
};

const generateRoutes = (
  routes: AppRoute[],
  basePath: string = '/',
  prefixTitle: string[] = []
): RouteItem[] => {
  let res: RouteItem[] = [];

  for (const router of routes) {
    if (router.meta?.hidden) continue;

    const data: RouteItem = {
      path: path.resolve(basePath, router.path),
      title: [...prefixTitle]
    };

    if (router.meta?.title) {
      data.title.push(router.meta.title);
      if (router.redirect !== 'noRedirect') {
        res.push(data);
      }
    }

    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.title);
      if (tempRoutes.length) {
        res = res.concat(tempRoutes);
      }
    }
  }

  return res;
};

const querySearch = (query: string): void => {
  if (query !== '') {
    options.value = fuse.value?.search(query) ?? [];
  } else {
    options.value = [];
  }
};
</script>

<style scoped>
/* Elimina todo lo que no sea tailwind */
</style>
