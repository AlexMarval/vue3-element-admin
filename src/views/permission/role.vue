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

    <div
      v-if="dialogVisible"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[80vh] my-8"
      >
        <div
          class="flex flex-col md:flex-row items-center px-8 py-3 border-b border-gray-100 gap-2"
        >
          <svg-icon icon-class="add_moderator" class-name="text-blue-500 mr-2 text-[32px]" />
          <div class="flex-1">
            <h1 class="text-xl font-bold text-gray-800 mb-0.5">
              {{ dialogType === 'edit' ? 'Editar Rol' : 'Nuevo Rol' }}
            </h1>
            <p class="text-gray-500 text-xs">
              Completa los datos para crear o editar un rol y asignar sus permisos.
            </p>
          </div>
          <button
            class="text-2xl text-gray-400 hover:text-gray-700 cursor-pointer"
            @click="dialogVisible = false"
          >
            ×
          </button>
        </div>
        <div class="px-8 py-6 flex-1 overflow-y-auto">
          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium text-gray-700 mb-1">Grupo LDAP</label>
                <el-select
                  v-model="selectedLdapGroups"
                  multiple
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="Seleccionar grupo LDAP"
                  class="w-full el-select-custom"
                  teleported
                  popper-class="el-popper-custom-z"
                >
                  <el-option
                    v-for="group in ldapGroups"
                    :key="group.ldapGroupSAMAccountName"
                    :label="group.ldapGroupSAMAccountName.toUpperCase()"
                    :value="group.ldapGroupSAMAccountName"
                  />
                </el-select>
                <p class="text-xs text-gray-400 mt-1">Selecciona grupos LDAP para el rol.</p>
              </div>
              <div class="flex flex-col gap-1">
                <label for="role-name" class="block text-sm font-semibold text-gray-700 mb-1"
                  >Nombre del Rol</label
                >
                <input
                  v-model="role.name"
                  id="role-name"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out"
                  placeholder="Nombre del Rol"
                  required
                />
                <p class="text-xs text-gray-400 mt-1">Ejemplo: Administrador, Editor, etc.</p>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <label for="role-desc" class="block text-sm font-semibold text-gray-700 mb-1"
                >Descripción</label
              >
              <textarea
                v-model="role.defaultView"
                id="role-desc"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-300 ease-in-out resize-none"
                placeholder="Descripción del Rol"
                rows="3"
              ></textarea>
              <p class="text-xs text-gray-400 mt-1">Breve descripción del rol y sus permisos.</p>
            </div>
            <div class="mt-2">
              <div class="flex gap-8 border-b border-gray-200 mb-2">
                <button
                  v-for="tab in ['Menús', 'Vistas', 'Permisos']"
                  :key="tab"
                  :class="[
                    'pb-2 text-base font-medium transition-colors',
                    tab === activeTab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 border-b-2 border-transparent',
                  ]"
                  @click="activeTab = tab"
                >
                  {{ tab }}
                </button>
              </div>
              <div>
                <div v-if="activeTab === 'Menús'">
                  <label class="font-semibold mb-2 block">Menús disponibles:</label>
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
                <div v-else-if="activeTab === 'Vistas'">
                  <div class="text-gray-400 text-sm py-4">
                    (Aquí puedes agregar contenido de vistas)
                  </div>
                </div>
                <div v-else-if="activeTab === 'Permisos'">
                  <div class="text-gray-400 text-sm py-4">
                    (Aquí puedes agregar contenido de permisos)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-8 py-6 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button
            type="button"
            @click="dialogVisible = false"
            class="flex items-center gap-2 bg-red-50 text-red-700 px-5 py-2 rounded-lg font-semibold text-base border border-red-200 hover:bg-red-100 transition cursor-pointer"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancelar
          </button>
          <button
            type="button"
            @click="confirmRole"
            class="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-base hover:bg-blue-700 transition cursor-pointer"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import useRolePermission from './composable/useRolePermission'

  const activeTab = ref('Menús')

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
  })
</script>

<style lang="scss" scoped></style>
