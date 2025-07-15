import { useQuery } from '@tanstack/vue-query'
import { getParamsConnect } from '../api/databaseApi'
import type { Setting } from '../interfaces/settings.interface'

export const useDatabaseParamsQuery = () => {
  return useQuery<Setting[]>({
    queryKey: ['database-params'],
    queryFn: getParamsConnect,
    staleTime: 1000 * 60, // 1 minuto
  })
}
