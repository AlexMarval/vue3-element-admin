import { useAppStore } from '@/store/modules/app'
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    device() {
      return useAppStore().device
    },
  },
  mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS() {
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = e => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    },
  },
})
