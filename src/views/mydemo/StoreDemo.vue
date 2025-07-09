<template>
  <div class="app-container">
    <div>Demo de Store</div>
    <div>1. Usar mapStores y luego llamar this.xxxStore.yyy</div>
    <div>2. Usar mapState y luego llamar this.xxx</div>
    <div>3. Llamar la función const xxxStore = store.xxx() y luego usar la variable xxxStore</div>
    <div>&nbsp;</div>
    <div>========</div>
    <div>
      A continuación se muestran los valores de las variables. Consulta el código fuente para más
      detalles.
    </div>
    <div>userStore.name={{ userStore.name }}</div>
    <div>appStore.device={{ device }}</div>
    <div><el-button @click="handleToggleDevice">Alternar dispositivo</el-button></div>
  </div>
</template>

<script>
  import { mapStores, mapState, mapActions } from 'pinia'
  import { defineComponent } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import userStore from '@/store/modules/user'

  export default defineComponent({
    name: 'StoreDemo',
    computed: {
      ...mapStores(useAppStore, userStore),
      ...mapState(useAppStore, ['device']),
    },
    mounted() {
      console.log('StoreDemo mounted appStore.device=', this.appStore.device)
      console.log('StoreDemo mounted device=', this.device)
      console.log('StoreDemo mounted token=', this.userStore.token)
      const appStoreInstance = useAppStore()
      console.log('StoreDemo mounted useAppStore.device=', appStoreInstance.device)
      console.log('StoreDemo END')
    },
    methods: {
      ...mapActions(useAppStore, ['toggleDevice']),
      handleToggleDevice() {
        this.toggleDevice(+new Date())
      },
    },
  })
</script>

<style lang="scss" scoped>
  .app-container {
    div {
      padding: 5px 0;
    }
  }
</style>
