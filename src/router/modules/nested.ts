/** When your routing table is too long, you can split it into small modules **/

import { AppRoute } from '@/router/routes'
import { ViewId } from '@/router/viewIds'
const Layout = () => import('@/layout/index.vue')

const nestedRouter = {
  path: AppRoute.NESTED, // was '/nested'
  component: Layout,
  redirect: AppRoute.NESTED_MENU1_1, // was '/nested/menu1/menu1-1'
  name: 'Nested',
  meta: {
    title: 'Menú Anidado',
    icon: 'nested',
    viewId: ViewId.NESTED_ROOT,
  },
  children: [
    {
      path: AppRoute.NESTED_MENU1, // was 'menu1'
      component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menú 1', viewId: ViewId.MENU1_VIEW },
      redirect: AppRoute.NESTED_MENU1_1,
      children: [
        {
          path: AppRoute.NESTED_MENU1_1, // was 'menu1-1'
          component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
          name: 'Menu1-1',
          meta: { title: 'Menú 1-1', viewId: ViewId.MENU1_1_VIEW },
        },
        {
          path: AppRoute.NESTED_MENU1_2, // was 'menu1-2'
          component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
          name: 'Menu1-2',
          redirect: AppRoute.NESTED_MENU1_2_1,
          meta: { title: 'Menú 1-2', viewId: ViewId.MENU1_2_VIEW },
          children: [
            {
              path: AppRoute.NESTED_MENU1_2_1, // was 'menu1-2-1'
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              name: 'Menu1-2-1',
              meta: { title: 'Menú 1-2-1', viewId: ViewId.MENU1_2_1_VIEW },
            },
            {
              path: AppRoute.NESTED_MENU1_2_2, // was 'menu1-2-2'
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              name: 'Menu1-2-2',
              meta: { title: 'Menú 1-2-2', viewId: ViewId.MENU1_2_2_VIEW },
            },
          ],
        },
        {
          path: AppRoute.NESTED_MENU1_3, // was 'menu1-3'
          component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
          name: 'Menu1-3',
          meta: { title: 'Menú 1-3', viewId: ViewId.MENU1_3_VIEW },
        },
      ],
    },
    {
      path: AppRoute.NESTED_MENU2, // was 'menu2'
      name: 'Menu2',
      component: () => import('@/views/nested/menu2/index.vue'),
      meta: { title: 'Menú 2', viewId: ViewId.MENU2_VIEW },
    },
  ],
}

export default nestedRouter
