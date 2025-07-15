export interface CheckDbConn {
  baseURL: string
  apiKey: string
}

export interface DBConn {
  host: string
  user: string
  password: string
  port: number
  database?: string
}
