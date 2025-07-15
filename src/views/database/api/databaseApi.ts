import api from '@/utils/api'
import { SettingGroupEnum, type Setting } from '../interfaces/settings.interface'
import type { CheckDbConn, DBConn } from '../interfaces/databaseConnection.interface'

export const createParamsDbConnection = async (body: { settings: Setting[] }) => {
  console.log('Creating database connection parameters:', body)
  const result = await api.post<{ message: string; status: number }>('/settings/upsert-many', body)
  return result
}

export const checkBackendConnParams = async () => {
  const result = await api.get<DBConn>(`/settings/${SettingGroupEnum.SQL_SERVER}/build`)
  return !!result
}

export const checkBackendConn = async () => {
  const result = await api.get<{ message: string; status: number }>(`/settings/connection/test`)
  return result.status === 200
}

export const testConnectionDB = async () => {
  const result = await api.get<{ status: number }>('/database/connection/test')
  return result.status === 200
}

export const getParamsConnect = async () => {
  const result = await api.get<Setting[]>('/database/connection')
  return Array.isArray(result) ? result : []
}
