/** When your routing table is too long, you can split it into small modules **/

const Layout = () => import('@/layout/index.vue');

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Tablas',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index.vue'),
      name: 'DynamicTable',
      meta: { title: 'Tabla Dinámica' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table.vue'),
      name: 'DragTable',
      meta: { title: 'Tabla Arrastrable' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table.vue'),
      name: 'InlineEditTable',
      meta: { title: 'Edición en Línea' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table.vue'),
      name: 'ComplexTable',
      meta: { title: 'Tabla Compleja' }
    }
  ]
};
export default tableRouter;
