import { AppRoute } from '@/router/routes'
import { ViewId } from '@/router/viewIds'

const Layout = () => import('@/layout/index.vue')

const tableRouter = {
  path: AppRoute.TABLE, // was '/table'
  component: Layout,
  redirect: AppRoute.COMPLEX_TABLE, // was '/table/complex-table'
  name: 'Table',
  meta: {
    title: 'Tablas',
    icon: 'table',
    viewId: ViewId.TABLE_ROOT,
  },
  children: [
    {
      path: AppRoute.DYNAMIC_TABLE, // was 'dynamic-table'
      component: () => import('@/views/table/dynamic-table/index.vue'),
      name: 'DynamicTable',
      meta: { title: 'Tabla Dinámica', viewId: ViewId.DYNAMIC_TABLE_VIEW },
    },
    {
      path: AppRoute.DRAG_TABLE, // was 'drag-table'
      component: () => import('@/views/table/drag-table.vue'),
      name: 'DragTable',
      meta: { title: 'Tabla Arrastrable', viewId: ViewId.DRAG_TABLE_VIEW },
    },
    {
      path: AppRoute.INLINE_EDIT_TABLE, // was 'inline-edit-table'
      component: () => import('@/views/table/inline-edit-table.vue'),
      name: 'InlineEditTable',
      meta: { title: 'Edición en Línea', viewId: ViewId.INLINE_EDIT_TABLE_VIEW },
    },
    {
      path: AppRoute.COMPLEX_TABLE, // was 'complex-table'
      component: () => import('@/views/table/complex-table.vue'),
      name: 'ComplexTable',
      meta: { title: 'Tabla Compleja', viewId: ViewId.COMPLEX_TABLE_VIEW },
    },
  ],
}
export default tableRouter
