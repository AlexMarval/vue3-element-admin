import type { App } from 'vue'
import BaseInput from '@/components/Input/index.vue'
// Agrega aquí otros componentes base si lo deseas

export default function registerGlobalComponents(app: App) {
  app.component('base-input', BaseInput)
  // app.component('otro-componente', OtroComponente)
}
