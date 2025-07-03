<template>
  <div :class="[classObj, 'relative h-full w-full',
    {'fixed top-0 mobile openSidebar': device === 'mobile' && sidebar.opened}
  ]">
    <div v-if="device === 'mobile' && sidebar.opened" class="fixed inset-0 bg-black opacity-30 z-[999]" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
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

<script>
import RightPanel from '@/components/RightPanel';
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { mapState } from 'pinia';
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutIndex',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState(store.app, ['sidebar', 'device']),
    ...mapState(store.settings, {
      showSettings: 'showSettings',
      needTagsView: 'tagsView',
      fixedHeader: 'fixedHeader'
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    }
  },
  methods: {
    handleClickOutside() {
      store.app().closeSidebar({ withoutAnimation: false });
    }
  }
});
</script>
