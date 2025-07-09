<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Configuración del sistema</h3>

      <!-- <div class="drawer-item">
        <span>Theme Color</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div> -->

      <div class="drawer-item">
        <span>Activar Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Fijar Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Logo en la barra lateral</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Mostrar burbuja en submenú lateral</span>
        <el-switch v-model="secondMenuPopup" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
  // import ThemePicker from '@/components/ThemePicker';
  import { defineComponent } from 'vue'
  import settingsStore from '@/store/modules/settings'

  export default defineComponent({
    components: {
      // ThemePicker
    },
    data() {
      return {}
    },
    computed: {
      fixedHeader: {
        get() {
          return settingsStore().fixedHeader
        },
        set(val) {
          settingsStore().changeSetting({
            key: 'fixedHeader',
            value: val,
          })
        },
      },
      tagsView: {
        get() {
          return settingsStore().tagsView
        },
        set(val) {
          settingsStore().changeSetting({
            key: 'tagsView',
            value: val,
          })
        },
      },
      sidebarLogo: {
        get() {
          return settingsStore().sidebarLogo
        },
        set(val) {
          settingsStore().changeSetting({
            key: 'sidebarLogo',
            value: val,
          })
        },
      },
      secondMenuPopup: {
        get() {
          return settingsStore().secondMenuPopup
        },
        set(val) {
          settingsStore().changeSetting({
            key: 'secondMenuPopup',
            value: val,
          })
        },
      },
    },
    methods: {
      themeChange(val) {
        settingsStore().changeSetting({
          key: 'theme',
          value: val,
        })
      },
    },
  })
</script>

<style lang="scss" scoped>
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 22px;
    }

    .drawer-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      padding: 12px 0;
    }

    .drawer-switch {
      float: right;
    }
  }
</style>
