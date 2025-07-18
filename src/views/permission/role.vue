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
          <el-button type="primary" size="small" @click="handleEdit(scope)">Editar</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Eliminar</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="LDAP">
          <el-select
            v-model="selectedLdapGroups"
            multiple
            filterable
            placeholder="Seleccionar grupos LDAP"
            style="width: 100%"
          >
            <el-option
              v-for="group in ldapGroups"
              :key="group.ldapGroupSAMAccountName"
              :label="group.ldapGroupSAMAccountName"
              :value="group.ldapGroupSAMAccountName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Nombre">
          <el-input v-model="role.name" placeholder="Nombre del Rol" />
        </el-form-item>
        <el-form-item label="Descripción">
          <el-input
            v-model="role.defaultView"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Descripción del Rol"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="treeProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="confirmRole">Confirmar</el-button>
      </div>
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
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
