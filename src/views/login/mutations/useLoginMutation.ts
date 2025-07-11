// src/views/login/mutations/useLoginMutation.ts
import { useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '@/store/modules/user'
import type { LoginData } from '../interfaces'

export const useLoginMutation = () => {
  const userStore = useAuthStore()

  return useMutation({
    mutationFn: (loginData: LoginData) => {
      // La validación en useLogin asegura que estos valores no son undefined
      return userStore.login(loginData as { username: string; password: string })
    },
  })
}
