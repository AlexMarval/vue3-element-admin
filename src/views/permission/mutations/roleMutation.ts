import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { getRoles, getRoleById, addRole, updateRole, deleteRole } from '../api/role'
import type { Role } from '../interfaces'

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
    mutationFn: addRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}

// PUT: Actualizar rol
export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: { defaultView: string; viewIds: string[] } }) =>
      updateRole(id, dto),
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
