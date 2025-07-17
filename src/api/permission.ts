import api from '@/utils/api'
import { ViewId } from '@/router/viewIds'

/** Sincroniza todos los viewId declarados en el enum contra el backend */
export const syncAllViewIds = () => api.post('/sync-viewids', Object.values(ViewId))
