<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top: 30px">
      <div>
        <span v-permission="[UserRole.ADMIN]" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">admin</el-tag> can see this
        </span>
        <el-tag v-permission="[UserRole.ADMIN]" class="permission-sourceCode" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="[UserRole.EDITOR]" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-permission="[UserRole.EDITOR]" class="permission-sourceCode" type="info">
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span v-permission="[UserRole.ADMIN, UserRole.EDITOR]" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag
          v-permission="[UserRole.ADMIN, UserRole.EDITOR]"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>

    <div :key="'checkPermission' + key" style="margin-top: 60px">
      <aside>
        In some cases, using v-permission will have no effect. For example: Element-UI's Tab
        component or el-table-column and other scenes that dynamically render dom. You can only do
        this with v-if.
        <br />
        e.g.
      </aside>

      <el-tabs type="border-card" style="width: 550px">
        <el-tab-pane v-if="checkPermission([UserRole.ADMIN])" label="Admin">
          Admin can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission([UserRole.EDITOR])" label="Editor">
          Editor can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission([UserRole.ADMIN, UserRole.EDITOR])"
          label="Admin-OR-Editor"
        >
          Both admin or editor can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import checkPermission from '@/utils/permission' // Función de comprobación de permisos
  import SwitchRoles from './components/SwitchRoles'
  import { UserRole } from '@/constants/roles'

  export default defineComponent({
    name: 'DirectivePermission',
    components: { SwitchRoles },
    data() {
      return {
        key: 1, // Para poder reinicializar la directiva cada vez que se cambian los permisos
        UserRole,
      }
    },
    methods: {
      checkPermission,
      handleRolesChange() {
        this.key++
      },
    },
  })
</script>

<style lang="scss" scoped>
  .app-container {
    :deep(.permission-alert) {
      width: 320px;
      margin-top: 15px;
      background-color: #f0f9eb;
      color: #67c23a;
      padding: 8px 16px;
      border-radius: 4px;
      display: inline-block;
    }
    :deep(.permission-sourceCode) {
      margin-left: 15px;
    }
    :deep(.permission-tag) {
      background-color: #ecf5ff;
    }
  }
</style>
