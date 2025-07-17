import 'dotenv/config'
import axios from 'axios'
import { ViewId } from '../src/router/viewIds'

if (!process.env.VITE_APP_BASE_API) {
  console.error(process.env.VITE_API_KEY)
  console.error('Error: la variable de entorno VITE_APP_BASE_API no está definida')
  process.exit(1)
}

if (!process.env.VITE_API_KEY) {
  console.error('Error: la variable de entorno VITE_API_KEY no está definida')
  process.exit(1)
}

const API_URL = process.env.VITE_APP_BASE_API
const KEY = process.env.VITE_API_KEY

;(async () => {
  try {
    await axios.post(`${API_URL}/roles/sync-viewids`, Object.values(ViewId), {
      headers: {
        'Content-Type': 'application/json',
        ...(KEY ? { 'x-apikey': KEY } : {}),
      },
    })
    console.log('ViewIds sincronizados correctamente')
    process.exit(0)
  } catch (error: any) {
    console.error(`Error al sincronizar viewIds: ${error.message || error}`)
    process.exit(1)
  }
})()
