import { useAppStore } from '@/store/modules/app'
import { defineComponent } from 'vue'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default defineComponent({
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        useAppStore().closeSidebar({ withoutAnimation: false })
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      useAppStore().toggleDevice('mobile')
      useAppStore().closeSidebar({ withoutAnimation: true })
    }
  },
  methods: {
    // do not use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        useAppStore().toggleDevice(isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          useAppStore().closeSidebar({ withoutAnimation: true })
        }
      }
    },
  },
})
