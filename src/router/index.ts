// import { markRaw } from 'vue';
import { createRouter, createWebHistory } from 'vue-router' // createWebHashHistory, createWebHistory
import type { Router, RouteRecordRaw, RouteComponent } from 'vue-router'
import { AppRoute } from './routes'
import { ViewId } from './viewIds' // Import ViewId enum if needed
import { UserRole } from '@/constants/roles'

/* Layout */
const Layout = (): RouteComponent => import('@/layout/index.vue')

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import nestedRouter from './modules/nested'
import tableRouter from './modules/table'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 *
 * Nota: ¡La configuración de los atributos hidden y alwaysShow se ha movido a meta!
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: AppRoute.REDIRECT,
    component: Layout,
    meta: { hidden: true, viewId: ViewId.REDIRECT },
    children: [
      {
        path: AppRoute.REDIRECT_PATH,
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: AppRoute.LOGIN,
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true, viewId: ViewId.LOGIN },
  },
  {
    path: AppRoute.AUTH_REDIRECT,
    component: () => import('@/views/login/auth-redirect.vue'),
    meta: { hidden: true, viewId: ViewId.AUTH_REDIRECT },
  },
  {
    path: AppRoute.ERROR_404,
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true, viewId: ViewId.ERROR_404 },
  },
  {
    path: AppRoute.ERROR_401,
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true, viewId: ViewId.ERROR_401 },
  },
  {
    path: AppRoute.HOME,
    component: Layout,
    redirect: AppRoute.DASHBOARD,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'Página Principal',
          icon: 'dashboard',
          affix: true,
          viewId: ViewId.DASHBOARD,
        },
      },
    ],
  },
  {
    path: AppRoute.DATABASE,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/database/index.vue'),
        name: 'Database',
        meta: {
          title: 'Base de Datos',
          icon: 'database',
          roles: [UserRole.ADMIN],
          viewId: ViewId.DATABASE,
        },
      },
    ],
  },
  {
    path: AppRoute.GUIDE,
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index.vue'),
        name: 'Guide',
        meta: { title: 'Guía', icon: 'guide', noCache: true, viewId: ViewId.GUIDE },
      },
    ],
  },
  {
    path: AppRoute.PROFILE,
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index.vue'),
        name: 'Profile',
        meta: { title: 'Perfil', icon: 'user', noCache: true, viewId: ViewId.PROFILE },
      },
    ],
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 *
 * Nota: ¡La configuración de los atributos hidden y alwaysShow se ha movido a meta!
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: AppRoute.PERMISSION,
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      alwaysShow: true, // will always show the root menu
      title: 'Permisos',
      icon: 'lock',
      roles: [UserRole.ADMIN, UserRole.EDITOR], // you can set roles in root nav
      viewId: ViewId.PERMISSION_ROOT,
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Permiso de Página',
          viewId: ViewId.PERMISSION_PAGE,
          roles: [UserRole.ADMIN], // or you can only set roles in sub nav
        },
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Permiso por Directiva',
          viewId: ViewId.PERMISSION_DIRECTIVE,
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Permiso por Rol',
          viewId: ViewId.PERMISSION_ROLE,
          roles: [UserRole.ADMIN],
        },
      },
    ],
  },

  {
    path: AppRoute.ICON,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index.vue'),
        name: 'Icons',
        meta: { title: 'Iconos', icon: 'icon', noCache: true, viewId: ViewId.ICONS },
      },
    ],
  },

  // /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: AppRoute.EXAMPLE,
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: { title: 'Ejemplo Integral', icon: 'example', viewId: ViewId.EXAMPLE_ROOT },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create.vue'),
        name: 'CreateArticle',
        meta: { title: 'Crear Artículo', icon: 'edit', viewId: ViewId.EXAMPLE_CREATE_ARTICLE },
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit.vue'),
        name: 'EditArticle',
        meta: {
          hidden: true,
          title: 'Editar Artículo',
          noCache: true,
          activeMenu: '/example/list',
          viewId: ViewId.EXAMPLE_EDIT_ARTICLE,
        },
      },
      {
        path: 'list',
        component: () => import('@/views/example/list.vue'),
        name: 'ArticleList',
        meta: { title: 'Lista de Artículos', icon: 'list', viewId: ViewId.EXAMPLE_LIST_ARTICLE },
      },
    ],
  },

  {
    path: AppRoute.TAB,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index.vue'),
        name: 'Tab',
        meta: { title: 'Pestañas', icon: 'tab', viewId: ViewId.TAB },
      },
    ],
  },

  {
    path: AppRoute.ERROR,
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: { title: 'Páginas de Error', icon: '404', viewId: ViewId.ERRORPAGES_ROOT },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        name: 'Page401',
        meta: { title: '401', noCache: true, viewId: ViewId.ERRORPAGES_401 },
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
        meta: { title: '404', noCache: true, viewId: ViewId.ERRORPAGES_404 },
      },
    ],
  },

  {
    path: AppRoute.ERROR_LOG,
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index.vue'),
        name: 'ErrorLog',
        meta: { title: 'Registro de Errores', icon: 'bug', viewId: ViewId.ERRORLOG },
      },
    ],
  },

  {
    path: AppRoute.EXCEL,
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: { title: 'Excel', icon: 'excel', viewId: ViewId.EXCEL_ROOT },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel.vue'),
        name: 'ExportExcel',
        meta: { title: 'Exportar Excel', viewId: ViewId.EXCEL_EXPORT_EXCEL },
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel.vue'),
        name: 'SelectExcel',
        meta: { title: 'Exportar Seleccionados', viewId: ViewId.EXCEL_EXPORT_SELECTED },
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header.vue'),
        name: 'MergeHeader',
        meta: { title: 'Exportar Encabezado Múltiple', viewId: ViewId.EXCEL_EXPORT_MERGE_HEADER },
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel.vue'),
        name: 'UploadExcel',
        meta: { title: 'Subir Excel', viewId: ViewId.EXCEL_UPLOAD_EXCEL },
      },
    ],
  },

  {
    path: AppRoute.ZIP,
    component: Layout,
    redirect: '/zip/download',
    name: 'Zip',
    meta: { alwaysShow: true, title: 'Zip', icon: 'zip', viewId: ViewId.ZIP_ROOT },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index.vue'),
        name: 'ExportZip',
        meta: { title: 'Exportar Zip', viewId: ViewId.ZIP_DOWNLOAD },
      },
    ],
  },

  {
    path: AppRoute.PDF,
    component: Layout,
    redirect: '/pdf/index',
    meta: { viewId: ViewId.PDF_ROOT },
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index.vue'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf', viewId: ViewId.PDF_VIEW },
      },
    ],
  },
  {
    path: AppRoute.PDF_DOWNLOAD,
    component: () => import('@/views/pdf/download.vue'),
    meta: { hidden: true, viewId: ViewId.PDF_DOWNLOAD },
  },

  {
    path: AppRoute.THEME,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index.vue'),
        name: 'Theme',
        meta: { title: 'Tema', icon: 'theme', viewId: ViewId.THEME },
      },
    ],
  },

  {
    path: AppRoute.CLIPBOARD,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index.vue'),
        name: 'ClipboardDemo',
        meta: { title: 'Portapapeles', icon: 'clipboard', viewId: ViewId.CLIPBOARD },
      },
    ],
  },

  {
    path: AppRoute.EXTERNAL_LINK,
    component: Layout,
    children: [
      {
        path: 'https://element-plus.midfar.com',
        meta: { title: 'Enlace Externo', icon: 'link', viewId: ViewId.EXTERNAL_LINK },
        redirect: '',
      },
    ],
  },

  {
    path: AppRoute.MYDEMO,
    component: Layout,
    name: 'MyDemo',
    meta: { title: 'Mi Ejemplo', icon: 'component', viewId: ViewId.MYDEMO_ROOT },
    children: [
      {
        path: 'element-demo',
        component: () => import('@/views/mydemo/ElementDemo.vue'),
        name: 'ElementDemo',
        meta: { title: 'Ejemplo Element', icon: 'skill', viewId: ViewId.MYDEMO_ELEMENT_DEMO },
      },
      {
        path: 'store-demo',
        component: () => import('@/views/mydemo/StoreDemo.vue'),
        name: 'StoreDemo',
        meta: { title: 'Ejemplo Store', icon: 'lock', viewId: ViewId.MYDEMO_STORE_DEMO },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: AppRoute.ERROR_404, meta: { hidden: true } },
]

console.log('BASE_URL=', import.meta.env)

const createTheRouter = (): Router =>
  createRouter({
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    // Nota: para configurar el modo HTML5, es necesario modificar la configuración de nginx, ver documentación:
    // https://router.vuejs.org/guide/essentials/history-mode.html
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes,
  })

interface RouterPro extends Router {
  matcher: unknown
}

const router = createTheRouter() as RouterPro

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  // router.clearRoutes(); RangeError: Maximum call stack size exceeded
  const newRouter = createTheRouter() as RouterPro
  router.matcher = newRouter.matcher // reset router
}

export default router
