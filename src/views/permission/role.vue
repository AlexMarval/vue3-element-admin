<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">Nuevo Rol</el-button>

    <el-table :data="rolesList" style="width: 100%; margin-top: 30px" border>
      <el-table-column align="center" label="Role LDAP" width="220">
        <template v-slot="scope">
          <el-tag
            v-for="group in scope.row.ldapGroupSAMAccountNames"
            :key="group"
            type="success"
            size="small"
            style="margin: 2px"
          >
            {{ group }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Menus">
        <template v-slot="scope">
          <el-tag
            v-for="menu in scope.row.routes"
            :key="menu.path"
            type="info"
            size="small"
            class="menu-tag"
            style="margin: 2px"
          >
            {{ menu.title }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">Editar</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)"
            >Eliminar</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogType === 'edit' ? 'EDITAR ROL' : 'NUEVO ROL'">
      <div class="bg-white rounded-xl border border-gray-100 p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">LDAP</label>
            <el-select
              v-model="selectedLdapGroups"
              multiple
              filterable
              placeholder="Seleccionar grupos LDAP"
              class="w-full"
            >
              <el-option
                v-for="group in ldapGroups"
                :key="group.ldapGroupSAMAccountName"
                :label="group.ldapGroupSAMAccountName"
                :value="group.ldapGroupSAMAccountName"
              />
            </el-select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
            <el-input v-model="role.name" placeholder="Nombre del Rol" class="w-full" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
            <el-input
              v-model="role.defaultView"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="Descripción del Rol"
              class="w-full"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Menus</label>
            <el-tree
              ref="tree"
              :check-strictly="checkStrictly"
              :data="routesData"
              :props="treeProps"
              show-checkbox
              node-key="path"
              class="permission-tree"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="dialogVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="confirmRole">Confirmar</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import useRolePermission from './composable/useRolePermission'

  const {
    role,
    serviceRoutes,
    routes,
    rolesList,
    dialogVisible,
    dialogType,
    checkStrictly,
    treeProps,
    tree,
    routesData,
    handleAddRole,
    handleEdit,
    handleDelete,
    confirmRole,
    getRoutesFn,
    ldapGroups,
    selectedLdapGroups,
  } = useRolePermission()

  onMounted(() => {
    getRoutesFn()
    //getRolesFn()
  })
</script>

<style lang="scss" scoped>
  .dialog-footer {
    text-align: right;
    padding: 12px 0 0 0;
    background: #fff;
    position: sticky;
    bottom: 0;
    z-index: 2;
  }
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }

  /* Limitar el alto del diálogo y permitir scroll solo dentro del diálogo */
  /* Limitar el alto y scroll solo en el cuerpo del diálogo */
  ::v-deep(.el-dialog__body) {
    max-height: 60vh !important;
    overflow: auto !important;
  }
</style>
