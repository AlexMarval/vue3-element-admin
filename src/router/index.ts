// import { markRaw } from 'vue';
import { createRouter, createWebHistory } from 'vue-router' // createWebHashHistory, createWebHistory
import type { Router, RouteRecordRaw, RouteComponent } from 'vue-router'
import { AppRoute } from './routes'
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
    meta: { hidden: true },
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
    meta: { hidden: true },
  },
  {
    path: AppRoute.AUTH_REDIRECT,
    component: () => import('@/views/login/auth-redirect.vue'),
    meta: { hidden: true },
  },
  {
    path: AppRoute.ERROR_404,
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true },
  },
  {
    path: AppRoute.ERROR_401,
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true },
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
        meta: { title: 'Página Principal', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: AppRoute.DOCUMENTATION,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index.vue'),
        name: 'Documentation',
        meta: { title: 'Documentación', icon: 'documentation', affix: true },
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
        meta: { title: 'Guía', icon: 'guide', noCache: true },
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
        meta: { title: 'Perfil', icon: 'user', noCache: true },
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
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Permiso de Página',
          roles: [UserRole.ADMIN], // or you can only set roles in sub nav
        },
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Permiso por Directiva',
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Permiso por Rol',
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
        meta: { title: 'Iconos', icon: 'icon', noCache: true },
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
    meta: {
      title: 'Ejemplo Integral',
      icon: 'example',
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create.vue'),
        name: 'CreateArticle',
        meta: { title: 'Crear Artículo', icon: 'edit' },
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
        },
      },
      {
        path: 'list',
        component: () => import('@/views/example/list.vue'),
        name: 'ArticleList',
        meta: { title: 'Lista de Artículos', icon: 'list' },
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
        meta: { title: 'Pestañas', icon: 'tab' },
      },
    ],
  },

  {
    path: AppRoute.ERROR,
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Páginas de Error',
      icon: '404',
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        name: 'Page401',
        meta: { title: '401', noCache: true },
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
        meta: { title: '404', noCache: true },
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
        meta: { title: 'Registro de Errores', icon: 'bug' },
      },
    ],
  },

  {
    path: AppRoute.EXCEL,
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel',
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel.vue'),
        name: 'ExportExcel',
        meta: { title: 'Exportar Excel' },
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel.vue'),
        name: 'SelectExcel',
        meta: { title: 'Exportar Seleccionados' },
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header.vue'),
        name: 'MergeHeader',
        meta: { title: 'Exportar Encabezado Múltiple' },
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel.vue'),
        name: 'UploadExcel',
        meta: { title: 'Subir Excel' },
      },
    ],
  },

  {
    path: AppRoute.ZIP,
    component: Layout,
    redirect: '/zip/download',
    name: 'Zip',
    meta: { alwaysShow: true, title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index.vue'),
        name: 'ExportZip',
        meta: { title: 'Exportar Zip' },
      },
    ],
  },

  {
    path: AppRoute.PDF,
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index.vue'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' },
      },
    ],
  },
  {
    path: AppRoute.PDF_DOWNLOAD,
    component: () => import('@/views/pdf/download.vue'),
    meta: { hidden: true },
  },

  {
    path: AppRoute.THEME,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index.vue'),
        name: 'Theme',
        meta: { title: 'Tema', icon: 'theme' },
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
        meta: { title: 'Portapapeles', icon: 'clipboard' },
      },
    ],
  },

  {
    path: AppRoute.EXTERNAL_LINK,
    component: Layout,
    children: [
      {
        path: 'https://element-plus.midfar.com',
        meta: { title: 'Enlace Externo', icon: 'link' },
        redirect: '',
      },
    ],
  },

  {
    path: AppRoute.MYDEMO,
    component: Layout,
    name: 'MyDemo',
    meta: {
      title: 'Mi Ejemplo',
      icon: 'component',
    },
    children: [
      {
        path: 'element-demo',
        component: () => import('@/views/mydemo/ElementDemo.vue'),
        name: 'ElementDemo',
        meta: { title: 'Ejemplo Element', icon: 'skill' },
      },
      {
        path: 'store-demo',
        component: () => import('@/views/mydemo/StoreDemo.vue'),
        name: 'StoreDemo',
        meta: { title: 'Ejemplo Store', icon: 'lock' },
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
