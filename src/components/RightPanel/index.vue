<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{ top: buttonTop + 'px', 'background-color': theme }"
        @click="handleClick"
      >
        <el-icon>
          <Close v-if="show" class="svg-icon disabled" />
          <Setting v-else class="svg-icon disabled" />
        </el-icon>
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import { addClass, removeClass } from '@/utils'
  import { defineComponent } from 'vue'
  import settingsStore from '@/store/modules/settings'
  import { Close, Setting } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'RightPanel',
    components: {
      Close,
      Setting,
    },
    props: {
      clickNotClose: {
        default: false,
        type: Boolean,
      },
      buttonTop: {
        default: 250,
        type: Number,
      },
    },
    data() {
      return {
        show: false,
      }
    },
    computed: {
      theme() {
        return settingsStore().theme
      },
    },
    watch: {
      show(value) {
        if (value && !this.clickNotClose) {
          this.addEventClick()
        }
        if (value) {
          addClass(document.body, 'showRightPanel')
        } else {
          removeClass(document.body, 'showRightPanel')
        }
      },
    },
    mounted() {
      this.insertToBody()
    },
    beforeUnmount() {
      const elx = this.$refs.rightPanel
      elx.remove()
    },
    methods: {
      handleClick() {
        this.show = !this.show
      },
      addEventClick() {
        window.addEventListener('click', this.closeSidebar)
      },
      closeSidebar(evt) {
        const parent = evt.target.closest('.rightPanel')
        if (!parent) {
          this.show = false
          window.removeEventListener('click', this.closeSidebar)
        }
      },
      insertToBody() {
        const elx = this.$refs.rightPanel
        const body = document.querySelector('body')
        body.insertBefore(elx, body.firstChild)
      },
    },
  })
</script>

<style>
  .showRightPanel {
    overflow: hidden;
    position: relative;
    width: calc(100% - 15px);
  }
</style>

<style lang="scss" scoped>
  .rightPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  .rightPanel {
    width: 100%;
    max-width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
  }

  .show {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

    .rightPanel-background {
      z-index: 20000;
      opacity: 1;
      width: 100%;
      height: 100%;
    }

    .rightPanel {
      transform: translate(0);
    }
  }

  .handle-button {
    width: 48px;
    height: 48px;
    position: absolute;
    left: -48px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    line-height: 48px;

    i {
      font-size: 24px;
      line-height: 48px;
      height: 48px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
