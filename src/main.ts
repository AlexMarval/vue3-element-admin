import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import { setupStore } from './store'

import './style.css'
import '@/styles/index.scss'
import SvgIcon from './icons' // icon
import './permission' // permission control
import vPermission from './directive/permission/index' // permission control
import { checkEnableLogs } from './utils/error-log' // error log
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import registerGlobalComponents from '@/plugins/global-components'

async function bootstrap() {
  const app = createApp(App)
  app.use(createPinia())


  app.use(router)
  app.use(VueQueryPlugin)

  registerGlobalComponents(app)
  app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    showCloseButtonOnHover: false,
  })
  app.component('svg-icon', SvgIcon)
  app.directive('permission', vPermission)
  checkEnableLogs(app)

  app.mount('#app')
}

bootstrap()
