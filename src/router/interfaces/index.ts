import type { RouteRecordRaw } from 'vue-router'

// Extiende RouteRecordRaw para exigir meta y viewId
interface MetaWithViewId {
  viewId: string
  [key: string]: unknown
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: MetaWithViewId & Omit<NonNullable<RouteRecordRaw['meta']>, 'viewId'>
}
