import { asyncRoutes, constantRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { useAuthStore } from './user'

interface IPermissionState {
  routes: Array<RouteRecordRaw>
  addRoutes: Array<RouteRecordRaw>
}

// Role-based filtering removed; using viewId-based filtering only

export default defineStore({
  id: 'permission',
  state: (): IPermissionState => ({
    routes: [],
    addRoutes: [],
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    generateRoutes() {
      const authStore = useAuthStore()
      const viewIds = authStore.viewIds
      // recursive filter by viewId metadata
      const filterByView = (routes: RouteRecordRaw[]) =>
        routes.filter(route => {
          const vid = route.meta?.viewId as string | undefined
          if (vid) {
            return viewIds.includes(vid)
          }
          if (route.children) {
            const filteredChildren = filterByView(route.children)
            route.children = filteredChildren
            return filteredChildren.length > 0
          }
          return true
        })
      // filter both constant and async routes
      const filteredConst = filterByView(constantRoutes)
      const filteredAsync = filterByView(asyncRoutes)
      // set the routes: filtered constants + async
      this.addRoutes = filteredAsync
      this.routes = filteredConst.concat(filteredAsync)
      return filteredAsync
    },
  },
})
