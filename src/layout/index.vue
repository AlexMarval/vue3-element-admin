<template>
  <div :class="[classObj, 'relative h-full w-full',
    {'fixed top-0 mobile openSidebar': device === 'mobile' && sidebar.opened}
  ]">
    <div v-if="device === 'mobile' && sidebar.opened" class="fixed inset-0 bg-black opacity-30 z-[999]" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div :class="[{'hasTagsView': needTagsView}, 'main-container']">
      <div :class="[
        {
          'fixed top-0 right-0 z-10 transition-all': fixedHeader,
          'w-[calc(100%-54px)]': hideSidebar,
          'w-full': device === 'mobile'
        }
      ]">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { AppMain, Navbar, Settings, TagsView } from './components';
import Sidebar from './components/Sidebar/index.vue';
import store from '@/store';

// Pinia state
const appStore = store.app();
const settingsStore = store.settings();
const { sidebar, device } = storeToRefs(appStore);
const { showSettings, tagsView: needTagsView, fixedHeader } = storeToRefs(settingsStore);

// Computed for classObj
const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}));

const hideSidebar = computed(() => !sidebar.value.opened);

const handleClickOutside = () => {
  appStore.closeSidebar({ withoutAnimation: false });
};
</script>
