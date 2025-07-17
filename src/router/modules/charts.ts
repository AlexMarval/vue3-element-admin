/** When your routing table is too long, you can split it into small modules**/
import { ViewId } from '@/router/viewIds'
import { AppRoute } from '@/router/routes'

const Layout = () => import('@/layout/index.vue')

const chartsRouter = {
  path: AppRoute.CHARTS, // was '/charts'
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Gráficas',
    icon: 'chart',
    viewId: ViewId.CHARTS_ROOT,
  },
  children: [
    {
      path: AppRoute.KEYBOARD_CHART, // was 'keyboard'
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'KeyboardChart',
      meta: { title: 'Gráfica de Teclado', noCache: true, viewId: ViewId.KEYBOARD_CHART_VIEW },
    },
    {
      path: AppRoute.LINE_CHART, // was 'line'
      component: () => import('@/views/charts/line.vue'),
      name: 'LineChart',
      meta: { title: 'Gráfica de Líneas', noCache: true, viewId: ViewId.LINE_CHART_VIEW },
    },
    {
      path: AppRoute.MIX_CHART, // was 'mix-chart'
      component: () => import('@/views/charts/mix-chart.vue'),
      name: 'MixChart',
      meta: { title: 'Gráfica Mixta', noCache: true, viewId: ViewId.MIX_CHART_VIEW },
    },
  ],
}

export default chartsRouter
