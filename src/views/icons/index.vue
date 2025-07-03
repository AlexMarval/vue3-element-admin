<template>
  <div class="mt-2 mx-5 overflow-hidden">
    <aside>
      <a href="https://vue3-element-admin-site.midfar.com/guide/advanced/icon.html" target="_blank">Add and use
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="w-full p-2">
          <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2 gap-y-2">
            <div v-for="item of svgIcons" :key="item">
              <el-tooltip placement="top">
                <template #content>
                  {{ generateIconCode(item) }}
                </template>
                <div class="flex flex-col items-center justify-center w-[100px] h-[100px] mx-auto my-2 cursor-pointer text-[#24292e] text-[30px]"
                  @click="handleClipboard(generateIconCode(item), $event)">
                  <svg-icon :icon-class="item" class-name="disabled" />
                  <span class="block text-[16px] mt-2 text-center">{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 p-4">
          <div
            v-for="item of elementIcons"
            :key="item"
            @click="handleClipboard(generateElementIconCode(item), $event)"
            class="flex flex-col items-center justify-center w-[100px] h-[100px] cursor-pointer rounded hover:bg-gray-100 transition"
          >
            <component :is="item" class="w-10 h-10 text-gray-800 disabled" />
            <span class="block text-[16px] mt-2 text-center">{{ item }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import clipboard from '@/utils/clipboard';
import svgIcons from './svg-icons';
import ElementPlusIconsVue from './element-icons';

const elementIcons = Object.keys(ElementPlusIconsVue);

const generateIconCode = (symbol: string) => {
  return `<svg-icon icon-class="${symbol}" />`;
};

const generateElementIconCode = (symbol: string) => {
  return `<el-icon><${symbol} /></el-icon>`;
};

const handleClipboard = (text: string, event: Event) => {
  clipboard(text, event);
};
</script>

<style scoped>
/* Migrado a Tailwind: todos los estilos de layout, grid, tamaño, color y espaciado están en el template. */
</style>
