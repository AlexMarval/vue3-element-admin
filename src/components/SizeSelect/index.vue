<template>
  <div class="flex justify-center items-center">
    <div :class="['relative inline-flex items-center', { 'ml-2 w-[210px]': show }]">
        <el-dropdown trigger="click" @command="handleSetSize">
          <div>
            <svg-icon class-name="size-icon" icon-class="size" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value"
                :command="item.value">
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  data() {
    return {
      sizeOptions: [
        { label: 'Por defecto', value: 'default' },
        { label: 'Grande', value: 'large' },
        { label: 'Pequeño', value: 'small' }
      ]
    };
  },
  computed: {
    size() {
      return store.app().size;
    }
  },
  methods: {
    handleSetSize(size) {
      store.app().setSize(size);
      this.refreshView();
      ElMessage({
        message: 'Switch Size Success',
        type: 'success'
      });
    },
    refreshView() {
      // In order to make the cached page re-rendered
      store.tagsView().delAllCachedViews();

      const { fullPath } = this.$route;

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        });
      });
    }
  }

});
</script>
