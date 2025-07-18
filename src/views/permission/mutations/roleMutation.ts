import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { getRoles, getRoleById, addRole, updateRole, deleteRole } from '../api/role'
import { getLdapGroups } from '../api/ldapGroup'
import type { CreateRoleDto, UpdateRoleDto } from '../api/role'
// GET: Grupos LDAP
export const useLdapGroupsQuery = () =>
  useQuery({
    queryKey: ['ldapGroups'],
    queryFn: getLdapGroups,
  })

// GET: Lista de roles
export const useRolesQuery = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })

// GET: Un solo rol por id
export const useRoleQuery = (id: number) =>
  useQuery({
    queryKey: ['role', id],
    queryFn: () => getRoleById(id),
    enabled: !!id,
  })

// POST: Crear rol
export const useAddRoleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateRoleDto) => addRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}

// PUT: Actualizar rol
export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateRoleDto }) => updateRole(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}

// DELETE: Eliminar rol
export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}
