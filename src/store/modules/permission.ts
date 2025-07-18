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
      this.addRoutes = routes as RouteRecordRaw[]
      this.routes = (constantRoutes as unknown as RouteRecordRaw[]).concat(
        routes as RouteRecordRaw[]
      )
    },
    generateRoutes() {
      const authStore = useAuthStore()
      const viewIds = authStore.viewIds
      // recursive filter by viewId metadata
      const filterByView = (routes: RouteRecordRaw[]) =>
        routes.filter(route => {
          const vid = route.meta?.viewId as string | undefined
          const allowed = vid ? viewIds.includes(vid) : false

          if (route.children && route.children.length > 0) {
            const filteredChildren = filterByView(route.children)
            route.children = filteredChildren
            // Si el padre está permitido o tiene hijos permitidos, se incluye
            return allowed || filteredChildren.length > 0
          }
          // Si no tiene hijos, se incluye solo si el padre está permitido
          return allowed
        })
      // filter both constant and async routes
      const filteredConst = filterByView(constantRoutes as RouteRecordRaw[])
      const filteredAsync = filterByView(asyncRoutes as RouteRecordRaw[])
      // set the routes: filtered constants + async
      this.addRoutes = filteredAsync
      this.routes = filteredConst.concat(filteredAsync)

      return filteredAsync
    },
  },
})
