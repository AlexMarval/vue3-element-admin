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
  defaultView?: string
  viewIds: string[]
}

export interface UseRolePermission {
  role: Role
  serviceRoutes: Ref<RouteRecordRaw[]>
  routes: Ref<SidebarRoute[]>
  rolesList: Ref<Role[]>
  dialogVisible: Ref<boolean>
  dialogType: Ref<'new' | 'edit'>
  checkStrictly: Ref<boolean>
  defaultProps: { children: string; label: string }
  tree: Ref<InstanceType<typeof ElTree> | null>
  routesData: ComputedRef<SidebarRoute[]>
  handleAddRole(): void
  handleEdit(scope: any): void
  handleDelete(scope: any): void
  confirmRole(): Promise<void>
  getRoutesFn(): void
  //getRolesFn(): Promise<void>
}
