<template>
  <div class="dashboard-container">
    <component :is="currentDashboard" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useAuthStore } from '@/store/modules/user'
  import { UserRole } from '@/constants/roles'
  import adminDashboard from './admin/index.vue'
  import editorDashboard from './editor/index.vue'

  const authStore = useAuthStore()

  const currentDashboard = computed(() => {
    // Si el usuario tiene el rol ADMIN, muestra el dashboard de admin
    if (authStore.roles.includes(UserRole.ADMIN)) {
      return adminDashboard
    }
    // Si no, muestra el dashboard de editor
    return editorDashboard
  })
</script>
