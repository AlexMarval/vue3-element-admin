// src/router/routes.ts
// Centraliza las rutas de la app para evitar magic strings

export enum AppRoute {
  LOGIN = '/login',
  AUTH_REDIRECT = '/auth-redirect',
  HOME = '/',
  REDIRECT = '/redirect',
  REDIRECT_PATH = '/redirect/:path(.*)',
  ERROR_404 = '/404',
  ERROR_401 = '/401',
  DASHBOARD = '/dashboard',
  DOCUMENTATION = '/documentation',
  GUIDE = '/guide',
  PROFILE = '/profile',
  PERMISSION = '/permission',
  ICON = '/icon',
  COMPONENTS = '/components',
  CHARTS = '/charts',
  NESTED = '/nested',
  TABLE = '/table',
  EXAMPLE = '/example',
  TAB = '/tab',
  ERROR = '/error',
  ERROR_LOG = '/error-log',
  EXCEL = '/excel',
  ZIP = '/zip',
  PDF = '/pdf',
  PDF_DOWNLOAD = '/pdf/download',
  THEME = '/theme',
  CLIPBOARD = '/clipboard',
  EXTERNAL_LINK = '/external-link',
  MYDEMO = '/mydemo',
}

export const loginRedirectPath = (redirect: string) => `${AppRoute.LOGIN}?redirect=${redirect}`
