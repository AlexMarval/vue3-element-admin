import api from '@/utils/api'
import type { Role } from '../interfaces'
export type { Role } from '../interfaces'

export interface CreateRoleDto {
  name: string
  defaultView: string
  viewIds: string[]
  ldapGroupSAMAccountNames: string[]
}
export interface UpdateRoleDto {
  defaultView: string
  viewIds: string[]
  ldapGroupSAMAccountNames: string[]
}

export interface CreateRoleDto {
  name: string
  defaultView: string
  viewIds: string[]
  ldapGroupSAMAccountNames: string[]
}

export interface UpdateRoleDto {
  defaultView: string
  viewIds: string[]
  ldapGroupSAMAccountNames: string[]
}

/**
 * Crea un nuevo rol.
 * @param data - La información del nuevo rol.
 */
export const addRole = async (data: CreateRoleDto) => {
  const result = await api.post<{ data: { id: number; ldapGroupSAMAccountNames: string[] } }>(
    `/roles/management/roles`,
    data
  )
  return result
}

/**
 * Obtiene la lista de todos los roles con sus rutas/accesos.
 */
export const getRoles = async () => {
  const result = await api.get<{ data: Role[] }>('/roles/management/roles')
  return result
}

/**
 * Obtiene un rol por id.
 * @param id - La clave del rol a consultar.
 */
export const getRoleById = async (id: number) => {
  const result = await api.get<{ data: Role }>(`/roles/management/roles/${id}`)
  return result
}

/**
 * Actualiza un rol existente.
 * @param id - La clave del rol a actualizar.
 * @param dto - La nueva información del rol.
 */
export const updateRole = async (id: number, dto: UpdateRoleDto) => {
  const result = await api.put<{ data: Role }>(`/roles/management/roles/${id}`, dto)
  return result
}

/**
 * Elimina un rol.
 * @param id - La clave del rol a eliminar.
 */
export const deleteRole = async (id: number) => {
  const result = await api.delete<{ data: any }>(`/roles/management/roles/${id}/delete`)
  return result
}
