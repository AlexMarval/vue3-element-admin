<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import SwitchRoles from './components/SwitchRoles.vue'

  const router = useRouter()

  const handleRolesChange = (): void => {
    router.push({ path: '/permission/page?' + Date.now() })
  }
</script>
