import type { ElTree } from 'element-plus'
import type { Ref, ComputedRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
  viewId: string
  title?: string
  hidden?: boolean
  alwaysShow?: boolean
  icon?: string
  noCache?: boolean
  affix?: boolean
  roles?: string[]
}

// Interfaces for Permission Role view
export interface SidebarRoute {
  path: string
  title?: string
  children?: SidebarRoute[]
  meta: RouteMeta
}

export interface Role {
  id: number
  name: string
  defaultView: string
  viewIds: string[]
  ldapGroupSAMAccountNames?: string[]
}

export interface UseRolePermission {
  sidebarRoutes: ComputedRef<SidebarRoute[]>
  role: Role
  serviceRoutes: Ref<RouteRecordRaw[]>
  routes: Ref<SidebarRoute[]>
  rolesList: Ref<Role[]>
  dialogVisible: Ref<boolean>
  dialogType: Ref<'new' | 'edit'>
  checkStrictly: Ref<boolean>
  treeProps: { children: string; label: string }
  tree: Ref<InstanceType<typeof ElTree> | null>
  treeRef: any
  routesData: ComputedRef<SidebarRoute[]>
  handleAddRole(): void
  handleEdit(scope: any): void
  handleDelete(scope: any): void
  confirmRole(): Promise<void>
  getRoutesFn(): void
  ldapGroups: Ref<{ ldapGroupSAMAccountName: string }[]>
  selectedLdapGroups: Ref<string[]>
}
