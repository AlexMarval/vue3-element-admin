import { ref } from 'vue'
import { defineStore } from 'pinia'
import router, { resetRouter } from '@/router'

import { login as apiLogin, checkAuthToken as apiCheckAuthToken } from '@/views/login/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import tagsViewStore from './tagsView'

export const useAuthStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const userId = ref('')
  const name = ref('')
  const avatar = ref('')
  const introduction = ref('')
  const roles = ref<string[]>([])
  const viewIds = ref<string[]>([])

  // user login
  const login = async (userInfo: { username: string; password: string }) => {
    try {
      const { username, password } = userInfo

      const response = await apiLogin({ username: username.trim(), password })
      token.value = response

      setToken(response)
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  // get user info (check token)
  const getInfo = async () => {
    const user = await apiCheckAuthToken(token.value)

    if (!user) {
      throw new Error('Verificación fallida, por favor inicie sesión de nuevo.')
    }

    name.value = user.name
    avatar.value = user.avatar || new URL('@/assets/avatar-default.gif', import.meta.url).href
    introduction.value = ''
    roles.value = user.roles || []
    viewIds.value = user.viewIds || []

    return user
  }

  // user logout
  const logout = async () => {
    token.value = ''
    roles.value = []
    name.value = ''
    avatar.value = ''
    introduction.value = ''
    removeToken()
    resetRouter()
    tagsViewStore().delAllViews()
    await router.push({ path: '/login' })
    // Puedes agregar notificación aquí si lo deseas
  }

  // remove token
  const resetToken = () => {
    token.value = ''
    roles.value = []
    removeToken()
  }

  // dynamically modify permissions
  const changeRoles = async (role: string) => {
    // No cambiar el token al cambiar el rol
    roles.value = [role]
    resetRouter()
    tagsViewStore().delAllViews()
  }

  return {
    token,
    userId,
    name,
    avatar,
    introduction,
    roles,
    viewIds,
    login,
    getInfo,
    logout,
    resetToken,
    changeRoles,
  }
})
