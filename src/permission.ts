// Librerías de terceros
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// Módulos del proyecto
import router from './router'
import { AppRoute, loginRedirectPath } from './router/routes'
import { useAuthStore } from './store/modules/user'
import permissionStore from './store/modules/permission'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = [AppRoute.LOGIN, AppRoute.AUTH_REDIRECT] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()
  const user = useAuthStore()
  const permission = permissionStore()

  const handleLogout = async (message: string) => {
    await user.resetToken()

    ElMessage.error(message)
    NProgress.done()

    next(loginRedirectPath(to.path))
  }

  if (hasToken) {
    if (to.path === AppRoute.LOGIN) {
      NProgress.done()
      return next({ path: AppRoute.HOME })
    }

    const hasRoles = user.roles && user.roles.length > 0
    if (hasRoles) return next()

    try {
      const infoRes = await user.getInfo()
      const roles = infoRes.roles || []

      if (!roles.length)
        return handleLogout('No tienes permisos asignados. Contacta al administrador.')

      const accessRoutes = await permission.generateRoutes(roles)
      accessRoutes.forEach(router.addRoute)

      return next({ ...to, replace: true })
    } catch (error: any) {
      return handleLogout(error.message || 'Error de autenticación')
    }
  } else {
    if (whiteList.includes(to.path as AppRoute)) return next()

    NProgress.done()
    next(loginRedirectPath(to.path))
  }
})

router.afterEach(NProgress.done)
