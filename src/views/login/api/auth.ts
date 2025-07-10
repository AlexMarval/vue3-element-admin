import api from '@/utils/api'
import type { AuthUser, UserLogin } from '../interfaces/user'

export const login = async (data: UserLogin) => {
  const result = await api.post<{ jwt: string }>('/auth', data)
  return result.jwt
}

export const checkAuthToken = async (token: string) => {
  const result = await api.get<AuthUser>('/auth/check-auth-token', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return result
}
