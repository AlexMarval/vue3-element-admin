import api from '@/utils/api'

/**
 * Obtiene la lista de todos los grupos LDAP.
 */
export const getLdapGroups = async () => {
  const result = await api.get<{ data: { ldapGroupSAMAccountName: string }[] }>('/roles')
  return result
}
