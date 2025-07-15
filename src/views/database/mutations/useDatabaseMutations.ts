import { useMutation } from '@tanstack/vue-query'
import { createParamsDbConnection, testConnectionDB } from '../api/databaseApi'
import type { Setting } from '../interfaces/settings.interface'

export const useSaveDatabaseConfigMutation = () => {
  return useMutation({
    mutationFn: (body: { settings: Setting[] }) => createParamsDbConnection(body),
  })
}

export const useTestDatabaseConnectionMutation = () => {
  return useMutation({
    mutationFn: () => testConnectionDB(),
  })
}
