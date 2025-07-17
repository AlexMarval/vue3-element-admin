import 'dotenv/config'
import axios from 'axios'
import { UserRole } from '../src/constants/roles'
import { ViewId } from '../src/router/viewIds'

if (!process.env.VITE_APP_BASE_API) {
  console.error('Error: la variable VITE_APP_BASE_API no está definida')
  process.exit(1)
}

if (!process.env.VITE_API_KEY) {
  console.error('Error: la variable VITE_API_KEY no está definida')
  process.exit(1)
}

const API_URL = process.env.VITE_APP_BASE_API
const KEY = process.env.VITE_API_KEY

// Mapa de roles a sus viewIds permitidos (seed inicial)
const roleViewMap: Partial<Record<UserRole, ViewId[]>> = {
  [UserRole.SUPER_ADMIN]: Object.values(ViewId) as ViewId[],
  [UserRole.ADMIN]: Object.values(ViewId) as ViewId[],
  [UserRole.EDITOR]: (Object.values(ViewId) as ViewId[]).filter(
    v =>
      ![
        ViewId.DATABASE,
        ViewId.PERMISSION_ROOT,
        ViewId.PERMISSION_PAGE,
        ViewId.PERMISSION_DIRECTIVE,
        ViewId.PERMISSION_ROLE,
      ].includes(v)
  ),
  [UserRole.VIEWER]: [ViewId.DASHBOARD],
}

;(async () => {
  try {
    await axios.post(`${API_URL}/roles/sync-permissions`, roleViewMap, {
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': KEY,
      },
    })
    console.log('Role permissions sincronizados correctamente')
    process.exit(0)
  } catch (error: any) {
    console.error(`Error al sincronizar role permissions: ${error.message || error}`)
    process.exit(1)
  }
})()
