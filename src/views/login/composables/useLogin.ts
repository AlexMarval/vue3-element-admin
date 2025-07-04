import { ref, reactive, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import store from '@/store'
import { validUsername } from '@/utils/validate'
import { useNotification } from '@/components/Notification'

import type { QueryType } from '../interfaces/index'
import { LoginFieldType } from '../interfaces/index'

export function useLogin() {
  const route = useRoute()
  const router = useRouter()
  const { success, error, warning, info } = useNotification()

  const loginForm = reactive({
    username: 'admin',
    password: '111111',
  })

  const passwordType = ref<LoginFieldType>(LoginFieldType.Password)
  const capsTooltip = ref(false)
  const loading = ref(false)
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
      warning('Please enter the correct user name', 'Warning')
      return
    }

    if (!loginForm.password || loginForm.password.length < 6) {
      warning('The password can not be less than 6 digits', 'Warning')
      return
    }

    loading.value = true

    store
      .user()
      .login(loginForm)
      .then(() => {
        success('Login successful!', 'Success')
        router.push({ path: redirect.value || '/', query: otherQuery.value })
        loading.value = false
      })
      .catch(() => {
        error('Login failed. Please try again.', 'Error')
        loading.value = false
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
