import service from './request'
import type { AxiosRequestConfig } from 'axios'

interface Api {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) => Promise<T>
  put: <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) => Promise<T>
  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>
}

const api: Api = {
  get: (url, config) => service.get(url, config),
  post: (url, data, config) => service.post(url, data, config),
  put: (url, data, config) => service.put(url, data, config),
  delete: (url, config) => service.delete(url, config),
}

export default api
