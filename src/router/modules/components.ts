/** When your routing table is too long, you can split it into small modules **/

const Layout = () => import('@/layout/index.vue')

import { AppRoute } from '@/router/routes'
import { ViewId } from '@/router/viewIds'
const componentsRouter = {
  path: AppRoute.COMPONENTS, // was '/components'
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Componentes',
    icon: 'component',
    viewId: ViewId.COMPONENTS_ROOT,
  },
  children: [
    {
      path: AppRoute.TINYMCE, // was 'tinymce'
      component: () => import('@/views/components-demo/tinymce.vue'),
      name: 'TinymceDemo',
      meta: { title: 'Editor de Texto Enriquecido', viewId: ViewId.TINYMCE_VIEW },
    },
    {
      path: AppRoute.AVATAR_UPLOAD, // was 'avatar-upload'
      component: () => import('@/views/components-demo/avatar-upload.vue'),
      name: 'AvatarUploadDemo',
      meta: { title: 'Subir Avatar', viewId: ViewId.AVATAR_UPLOAD_VIEW },
    },
    {
      path: AppRoute.DROPZONE, // was 'dropzone'
      component: () => import('@/views/components-demo/dropzone.vue'),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone', viewId: ViewId.DROPZONE_VIEW },
    },
    {
      path: AppRoute.STICKY, // was 'sticky'
      component: () => import('@/views/components-demo/sticky.vue'),
      name: 'StickyDemo',
      meta: { title: 'Sticky', viewId: ViewId.STICKY_VIEW },
    },
    {
      path: AppRoute.COUNT_TO, // was 'count-to'
      component: () => import('@/views/components-demo/count-to.vue'),
      name: 'CountToDemo',
      meta: { title: 'Contador', viewId: ViewId.COUNT_TO_VIEW },
    },
    {
      path: AppRoute.MIXIN, // was 'mixin'
      component: () => import('@/views/components-demo/mixin.vue'),
      name: 'ComponentMixinDemo',
      meta: { title: 'Mini Componente', viewId: ViewId.MIXIN_VIEW },
    },
    {
      path: AppRoute.BACK_TO_TOP, // was 'back-to-top'
      component: () => import('@/views/components-demo/back-to-top.vue'),
      name: 'BackToTopDemo',
      meta: { title: 'Volver Arriba', viewId: ViewId.BACK_TO_TOP_VIEW },
    },
    {
      path: AppRoute.DRAG_DIALOG, // was 'drag-dialog'
      component: () => import('@/views/components-demo/drag-dialog.vue'),
      name: 'DragDialogDemo',
      meta: { title: 'Diálogo Arrastrable', viewId: ViewId.DRAG_DIALOG_VIEW },
    },
    {
      path: AppRoute.DRAG_SELECT, // was 'drag-select'
      component: () => import('@/views/components-demo/drag-select.vue'),
      name: 'DragSelectDemo',
      meta: { title: 'Select Arrastrable', viewId: ViewId.DRAG_SELECT_VIEW },
    },
  ],
}

export default componentsRouter
