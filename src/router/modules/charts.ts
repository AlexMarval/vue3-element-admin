/** When your routing table is too long, you can split it into small modules**/

const Layout = () => import('@/layout/index.vue');

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Gráficas',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'KeyboardChart',
      meta: { title: 'Gráfica de Teclado', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line.vue'),
      name: 'LineChart',
      meta: { title: 'Gráfica de Líneas', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart.vue'),
      name: 'MixChart',
      meta: { title: 'Gráfica Mixta', noCache: true }
    }
  ]
};

export default chartsRouter;
