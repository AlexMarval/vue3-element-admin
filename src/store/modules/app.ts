import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export interface IAppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: 'desktop' | 'mobile'
  size: 'large' | 'default' | 'small'
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): IAppState => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
    device: 'desktop',
    size: Cookies.get('size') || 'default',
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    closeSidebar({ withoutAnimation }) {
      Cookies.set('sidebarStatus', 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device) {
      this.device = device
    },
    setSize(size) {
      this.size = size
      Cookies.set('size', size)
    },
  },
})
