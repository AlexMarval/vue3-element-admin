<template>
  <div>
    <div style="margin-bottom: 15px">Your roles: {{ roles }}</div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button :label="UserRole.EDITOR" :value="UserRole.EDITOR" />
      <el-radio-button :label="UserRole.ADMIN" :value="UserRole.ADMIN" />
    </el-radio-group>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import { useAuthStore } from '@/store/modules/user'
  import { UserRole } from '@/constants/roles'

  export default defineComponent({
    data() {
      return {
        UserRole,
      }
    },
    computed: {
      roles() {
        const userStore = useAuthStore()
        return userStore.roles
      },
      switchRoles: {
        get() {
          return this.roles[0]
        },
        set(val) {
          const userStore = useAuthStore()
          userStore.changeRoles(val).then(() => {
            this.$emit('change')
          })
        },
      },
    },
  })
</script>
