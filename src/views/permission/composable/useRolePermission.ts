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
} from '../mutations/roleMutation'
import { constantRoutes, asyncRoutes } from '@/router'
import { ElMessageBox, ElMessage, ElNotification, ElTree } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'
import type { SidebarRoute, Role, UseRolePermission } from '../interfaces'

const useRolePermission = (): UseRolePermission => {
  const defaultRole: Role = { id: 0, name: '', defaultView: '', viewIds: [] }
  const role = reactive<Role>({ ...defaultRole })
  const serviceRoutes = ref<RouteRecordRaw[]>([])
  const routes = ref<SidebarRoute[]>([])
  const rolesList = ref<Role[]>([])
  const dialogVisible = ref(false)
  const dialogType = ref<'new' | 'edit'>('new')
  const checkStrictly = ref(false)
  const defaultProps = reactive({ children: 'children', label: 'title' })
  const tree = ref<InstanceType<typeof ElTree> | null>(null)

  const routesData = computed<SidebarRoute[]>(() => routes.value)

  const resolvePath = (basePath: string, routePath: string): string => {
    if (routePath.startsWith('http://') || routePath.startsWith('https://')) {
      return routePath
    }

    if (basePath === '') {
      return path.resolve('/', routePath)
    }

    return path.resolve(basePath, routePath)
  }

  const onlyOneShowingChild = (children: any[] = [], parent: any): any => {
    const showing = children.filter(c => !c.meta?.hidden)

    if (showing.length === 1) {
      const o = { ...showing[0] }
      o.path = resolvePath(parent.path, o.path)

      return o
    }

    if (showing.length === 0) {
      return { ...parent, path: '', noShowingChildren: true }
    }

    return false
  }

  const generateRoutesFn = (items: any[], basePath = '/'): SidebarRoute[] => {
    const res: SidebarRoute[] = []

    for (let item of items) {
      if (item.meta?.hidden) continue

      const onlyOne = item.children && onlyOneShowingChild(item.children, item)

      if (item.children && onlyOne && !item.meta?.alwaysShow) {
        item = onlyOne
      }

      const data: SidebarRoute = {
        path: resolvePath(basePath, item.path),
        title: item.meta?.title,
        meta: item.meta ?? { viewId: '', title: item.meta?.title },
      }

      if (item.children) {
        data.children = generateRoutesFn(item.children, data.path)
      }

      res.push(data)
    }

    return res
  }

  const generateArr = (items: SidebarRoute[]): SidebarRoute[] => {
    let arr: SidebarRoute[] = []

    items.forEach(i => {
      arr.push(i)
      if (i.children) arr = arr.concat(generateArr(i.children))
    })

    return arr
  }

  const generateTree = (
    items: any[],
    basePath = '/',
    checkedKeys: Array<string | number>
  ): SidebarRoute[] => {
    const res: SidebarRoute[] = []

    for (const item of items) {
      const routePath = resolvePath(basePath, item.path)
      const children = item.children ? generateTree(item.children, routePath, checkedKeys) : []

      if (checkedKeys.includes(routePath) || children.length) {
        res.push({ ...item, children })
      }
    }

    return res
  }

  /**
   * Carga el árbol de rutas desde Vue Router
   */
  const getRoutesFn = (): void => {
    // Combinar configuración de rutas constante y dinámicas para preservar estructura anidada
    const allRoutesConfig = [...constantRoutes, ...asyncRoutes]

    serviceRoutes.value = allRoutesConfig as RouteRecordRaw[]
    routes.value = generateRoutesFn(allRoutesConfig)
  }

  // Query para obtener la lista de roles
  const { data: rolesQueryData, refetch: refetchRoles } = useRolesQuery()
  // Sincronizar rolesList con los datos reactivos de Vue Query
  watch(
    () => rolesQueryData?.value,
    newVal => {
      rolesList.value = Array.isArray(newVal) ? newVal : newVal?.data ?? []
    },
    { immediate: true }
  )

  const addRoleMutation = useAddRoleMutation()
  const updateRoleMutation = useUpdateRoleMutation()
  const deleteRoleMutation = useDeleteRoleMutation()

  const handleAddRole = (): void => {
    Object.assign(role, defaultRole)
    tree.value?.setCheckedNodes([])
    dialogType.value = 'new'
    dialogVisible.value = true
  }

  const handleEdit = (scope: any): void => {
    dialogType.value = 'edit'
    dialogVisible.value = true
    checkStrictly.value = true

    Object.assign(role, deepClone(scope.row))

    nextTick(() => {
      // Obtener todos los nodos del árbol para encontrar las rutas por viewId
      const allNodes = generateArr(routes.value)
      const paths = allNodes
        .filter(node => role.viewIds.includes(node.meta?.viewId))
        .map(node => node.path)
      tree.value?.setCheckedKeys(paths, false)
      checkStrictly.value = false
    })
  }

  const handleDelete = (scope: any): void => {
    ElMessageBox.confirm('Confirm to remove the role?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
      .then(async () => {
        await deleteRoleMutation.mutateAsync(scope.row.id)
        refetchRoles()
        ElMessage({ type: 'success', message: 'Delete succeeded!' })
      })
      .catch(() => {})
  }

  const confirmRole = async (): Promise<void> => {
    const checkedKeys = tree.value?.getCheckedKeys() as string[]
    // Mapear las rutas seleccionadas a sus viewIds
    const allNodes = generateArr(routes.value)
    role.viewIds = allNodes
      .filter(node => checkedKeys.includes(node.path))
      .map(node => node.meta?.viewId)
      .filter(Boolean) as string[]

    if (dialogType.value === 'edit') {
      const updatePayload = {
        defaultView: role.defaultView ?? '',
        viewIds: role.viewIds,
      }
      await updateRoleMutation.mutateAsync({ id: role.id, dto: updatePayload })
      refetchRoles()
      const idx = rolesList.value.findIndex(r => r.id === role.id)
      if (idx !== -1) rolesList.value.splice(idx, 1, { ...role })
    } else {
      const { data } = await addRoleMutation.mutateAsync(role)
      role.id = data.id // Asumimos que la API devuelve el nuevo ID
      refetchRoles()
      rolesList.value.push({ ...role })
    }

    dialogVisible.value = false

    ElNotification({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: `<div>Role ID: ${role.id}</div><div>Role Name: ${role.name}</div><div>Default View: ${role.defaultView}</div>`,
      type: 'success',
    })
  }

  return {
    role,
    serviceRoutes,
    routes,
    rolesList,
    dialogVisible,
    dialogType,
    checkStrictly,
    defaultProps,
    tree,
    routesData,
    handleAddRole,
    handleEdit,
    handleDelete,
    confirmRole,
    getRoutesFn,
    // getRolesFn eliminado, ya no es necesario
  }
}

export default useRolePermission
