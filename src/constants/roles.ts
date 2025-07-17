export enum UserRole {
  // Roles genéricos de autorización
  SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ADMIN = 'ROLE_ADMIN',
  EDITOR = 'ROLE_EDITOR',
  VIEWER = 'ROLE_VIEWER',

  // Roles de negocio o departamentales
  FINANZAS = 'FINANZAS',
  RRHH = 'RRHH',
  VENTAS = 'VENTAS',

  // Roles especiales
  REPORTS = 'REPORTS',
  SUPPORT = 'SUPPORT',

  // Otros roles específicos
  TECNOLOGIA = 'TECNOLOGIA',
  ADFREENAS = 'ADFREENAS',
  SOPORTE = 'Soporte',
  ADMIN_LOCALES = 'admin locales',
  DOMAIN_ADMINS = 'Domain Admins',
}
