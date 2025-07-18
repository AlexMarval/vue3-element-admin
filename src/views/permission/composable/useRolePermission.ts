import {
  ref,
  reactive,
  computed,
  onMounted,
  nextTick,
  watch,
  type Ref,
  type ComputedRef,
} from 'vue'
import path from 'path-browserify'
import { deepClone } from '@/utils'
import {
  useRolesQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useLdapGroupsQuery,
} from '../mutations/roleMutation'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router'
import { ElMessageBox, ElMessage, ElNotification, type ElTree } from 'element-plus'
import type { SidebarRoute, Role, UseRolePermission } from '../interfaces'

const defaultRole: Role = {
  id: 0,
  name: '',
  defaultView: '',
  viewIds: [],
}

const useRolePermission = (): UseRolePermission => {
  // Estado principal
  const role = reactive<Role>({ ...defaultRole })
  const rolesList = ref<Role[]>([])
  const serviceRoutes = ref<RouteRecordRaw[]>([])
  const routes = ref<SidebarRoute[]>([])

  // Estado UI
  const dialogVisible = ref(false)
  const dialogType = ref<'new' | 'edit'>('new')
  const checkStrictly = ref(false)
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null)

  // LDAP
  const { data: ldapGroupsData, refetch: refetchLdapGroups } = useLdapGroupsQuery()
  const ldapGroups = ref<{ ldapGroupSAMAccountName: string }[]>([])
  const selectedLdapGroups = ref<string[]>([])

  // Configuración de árbol
  const treeProps = reactive({
    children: 'children',
    label: 'title',
  })

  // Consultas y mutaciones
  const { data: rolesQueryData, refetch: refetchRoles } = useRolesQuery()
  const addRoleMutation = useAddRoleMutation()
  const updateRoleMutation = useUpdateRoleMutation()
  const deleteRoleMutation = useDeleteRoleMutation()

  // Transformar datos LDAP
  watch(
    () => ldapGroupsData.value,
    newVal => {
      if (!newVal) {
        ldapGroups.value = []
        return
      }
      if (Array.isArray(newVal)) {
        ldapGroups.value =
          typeof newVal[0] === 'string'
            ? newVal.map(sam => ({ ldapGroupSAMAccountName: sam }))
            : newVal
      } else if (newVal.data) {
        ldapGroups.value = newVal.data
      }
    },
    { immediate: true }
  )

  // Sincronizar lista de roles
  watch(
    () => rolesQueryData.value,
    newVal => {
      rolesList.value = Array.isArray(newVal) ? newVal : newVal?.data ?? []
    },
    { immediate: true }
  )

  // Rutas procesadas
  const sidebarRoutes = computed<SidebarRoute[]>(() => routes.value)

  // Funciones de utilidad
  const resolvePath = (basePath: string, routePath: string): string => {
    if (/^https?:\/\//.test(routePath)) return routePath
    return basePath ? path.resolve(basePath, routePath) : path.resolve('/', routePath)
  }

  const getSingleVisibleChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
    const visibleChildren = children.filter(c => !c.meta?.hidden)

    if (visibleChildren.length === 1) {
      return {
        ...visibleChildren[0],
        path: resolvePath(parent.path, visibleChildren[0].path),
      }
    }

    if (visibleChildren.length === 0) {
      return { ...parent, path: '', noShowingChildren: true }
    }

    return null
  }

  const generateSidebarRoutes = (items: RouteRecordRaw[], basePath = '/'): SidebarRoute[] => {
    return items.reduce<SidebarRoute[]>((acc, item) => {
      if (item.meta?.hidden) return acc

      const singleChild = item.children ? getSingleVisibleChild(item.children, item) : null

      const actualItem = singleChild && !item.meta?.alwaysShow ? singleChild : item

      const routePath = resolvePath(basePath, actualItem.path)
      const routeData: SidebarRoute = {
        path: routePath,
        title: typeof actualItem.meta?.title === 'string' ? actualItem.meta?.title : undefined,
        meta: {
          ...(actualItem.meta as object),
          viewId: typeof actualItem.meta?.viewId === 'string' ? actualItem.meta?.viewId : '',
          title: typeof actualItem.meta?.title === 'string' ? actualItem.meta?.title : undefined,
        },
      }

      if (actualItem.children) {
        routeData.children = generateSidebarRoutes(actualItem.children, routePath)
      }

      return [...acc, routeData]
    }, [])
  }

  const flattenRoutes = (items: SidebarRoute[]): SidebarRoute[] => {
    return items.flatMap(item => [item, ...(item.children ? flattenRoutes(item.children) : [])])
  }

  // Inicialización de rutas
  const initializeRoutes = () => {
    const allRoutes = [...constantRoutes, ...asyncRoutes] as RouteRecordRaw[]
    serviceRoutes.value = allRoutes
    routes.value = generateSidebarRoutes(allRoutes)
  }

  // Handlers de roles
  const resetRoleForm = () => {
    Object.assign(role, defaultRole)
    treeRef.value?.setCheckedNodes([])
    selectedLdapGroups.value = []
  }

  const showRoleDialog = (type: 'new' | 'edit') => {
    dialogType.value = type
    dialogVisible.value = true
    refetchLdapGroups()
  }

  const handleAddRole = () => {
    resetRoleForm()
    showRoleDialog('new')
  }

  const handleEdit = (rowData: Role) => {
    Object.assign(role, {
      id: rowData.id,
      name: rowData.name,
      defaultView: rowData.defaultView,
      viewIds: Array.isArray(rowData.viewIds) ? [...rowData.viewIds] : [],
      ldapGroupSAMAccountNames: Array.isArray(rowData.ldapGroupSAMAccountNames)
        ? [...rowData.ldapGroupSAMAccountNames]
        : [],
    })
    selectedLdapGroups.value = rowData.ldapGroupSAMAccountNames || []
    showRoleDialog('edit')

    // Esperar a que el diálogo y el árbol estén renderizados
    setTimeout(() => {
      checkStrictly.value = true
      const allNodes = flattenRoutes(routes.value)
      const checkedPaths = allNodes
        .filter(node => role.viewIds.includes(node.meta?.viewId))
        .map(node => node.path)
      // LOG para depuración
      console.log('DEBUG checkedPaths:', checkedPaths)
      console.log('DEBUG role.viewIds:', role.viewIds)
      console.log('DEBUG allNodes:', allNodes.map(n => ({ path: n.path, viewId: n.meta?.viewId })))
      if (treeRef.value) {
        treeRef.value.setCheckedKeys(checkedPaths, false)
      }
      checkStrictly.value = false
    }, 150)
  }

  const handleDelete = async (roleId: number) => {
    try {
      await ElMessageBox.confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
      await deleteRoleMutation.mutateAsync(roleId)
      refetchRoles()
      ElMessage.success('Delete succeeded!')
    } catch {}
  }

  const saveRole = async () => {
    const checkedKeys = (treeRef.value?.getCheckedKeys() as string[]) || []
    const allRoutes = flattenRoutes(routes.value)

    role.viewIds = allRoutes
      .filter(node => checkedKeys.includes(node.path))
      .map(node => node.meta?.viewId)
      .filter(Boolean) as string[]

    const payload = {
      defaultView: role.defaultView || '',
      viewIds: role.viewIds,
      ldapGroupSAMAccountNames: selectedLdapGroups.value,
    }

    if (dialogType.value === 'edit') {
      await updateRoleMutation.mutateAsync({ id: role.id, dto: payload })
      const index = rolesList.value.findIndex(r => r.id === role.id)
      if (index !== -1) rolesList.value[index] = { ...role }
    } else {
      const { data } = await addRoleMutation.mutateAsync({
        ...payload,
        name: role.name,
      })
      role.id = data.id
      rolesList.value.push({ ...role })
    }

    dialogVisible.value = false
    ElNotification.success({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: `
        <div>Role ID: ${role.id}</div>
        <div>Role Name: ${role.name}</div>
        <div>Default View: ${role.defaultView}</div>
      `,
    })
  }

  onMounted(initializeRoutes)

  return {
    role,
    serviceRoutes,
    routes,
    rolesList,
    dialogVisible,
    dialogType,
    checkStrictly,
    treeProps,
    tree: treeRef,
    treeRef,
    routesData: sidebarRoutes,
    sidebarRoutes,
    ldapGroups,
    selectedLdapGroups,
    handleAddRole,
    handleEdit,
    handleDelete: (scope: any) => handleDelete(scope.row.id),
    confirmRole: saveRole,
    getRoutesFn: initializeRoutes,
  }
}

export default useRolePermission
