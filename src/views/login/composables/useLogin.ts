import { ref, reactive, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/store/modules/user'
import { validUsername } from '@/utils/validate'
import { useNotification } from '@/components/Notification'
import { useLoginMutation } from '../mutations/useLoginMutation'

import type { QueryType } from '../interfaces/index'
import { LoginFieldType } from '../interfaces/index'

export function useLogin() {
  const route = useRoute()
  const router = useRouter()
  const { success, error: notifyError, warning } = useNotification()
  const { mutate: login, isPending: loading } = useLoginMutation()

  const loginForm = reactive({
    username: 'alexander.marval',
    password: 'Alagm5113',
  })

  const passwordType = ref<LoginFieldType>(LoginFieldType.Password)
  const capsTooltip = ref(false)
  const showDialog = ref(false)

  const redirect = ref<string | undefined>(undefined)
  const otherQuery = ref<Record<string, string>>({})

  const checkCapslock = (e: KeyboardEvent) => {
    const { key } = e
    capsTooltip.value = !!(key && key.length === 1 && key >= 'A' && key <= 'Z')
  }

  const showPwd = () => {
    passwordType.value =
      passwordType.value === LoginFieldType.Password
        ? LoginFieldType.Empty
        : LoginFieldType.Password
    nextTick(() => {})
  }

  const handleLogin = () => {
    if (!loginForm.username || !validUsername(loginForm.username)) {
      warning('Por favor ingresa un usuario válido', 'Advertencia')
      return
    }

    if (!loginForm.password || loginForm.password.length < 6) {
      warning('La contraseña no puede tener menos de 6 caracteres', 'Advertencia')
      return
    }

    login(loginForm, {
      onSuccess: () => {
        success('¡Inicio de sesión exitoso!', 'Éxito')
        router.push({ path: redirect.value || '/', query: otherQuery.value })
      },
      onError: () => {
        notifyError('Error al iniciar sesión. Intenta de nuevo.', 'Error')
      },
    })
  }

  const getOtherQuery = (query: QueryType) => {
    return Object.keys(query).reduce((acc: QueryType, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }

      return acc
    }, {} as QueryType)
  }

  watch(
    () => route.query,
    query => {
      if (query) {
        redirect.value = query.redirect as string
        otherQuery.value = getOtherQuery(query as QueryType)
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    // Opcional: focus inicial
  })

  return {
    loginForm,
    passwordType,
    capsTooltip,
    loading,
    showDialog,
    redirect,
    otherQuery,
    checkCapslock,
    showPwd,
    handleLogin,
  }
}
