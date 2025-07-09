/** When your routing table is too long, you can split it into small modules **/

const Layout = () => import('@/layout/index.vue')

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Componentes',
    icon: 'component',
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: { title: 'Editor de Texto Enriquecido' },
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatar-upload.vue'),
      name: 'AvatarUploadDemo',
      meta: { title: 'Subir Avatar' },
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone.vue'),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone' },
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky.vue'),
      name: 'StickyDemo',
      meta: { title: 'Sticky' },
    },
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/count-to.vue'),
      name: 'CountToDemo',
      meta: { title: 'Contador' },
    },
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin.vue'),
      name: 'ComponentMixinDemo',
      meta: { title: 'Mini Componente' },
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/back-to-top.vue'),
      name: 'BackToTopDemo',
      meta: { title: 'Volver Arriba' },
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/drag-dialog.vue'),
      name: 'DragDialogDemo',
      meta: { title: 'Diálogo Arrastrable' },
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/drag-select.vue'),
      name: 'DragSelectDemo',
      meta: { title: 'Select Arrastrable' },
    },
  ],
}

export default componentsRouter
