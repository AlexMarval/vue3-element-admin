import { ref, watch } from 'vue'
import { useNotification } from '@/components/Notification'

import {
  useSaveDatabaseConfigMutation,
  useTestDatabaseConnectionMutation,
} from '../mutations/useDatabaseMutations'
import type { Setting } from '../interfaces/settings.interface'
import { SettingGroupEnum, SettingNameEnum } from '../interfaces/settings.interface'
import { useDatabaseParamsQuery } from '../mutations/useDatabaseParamsQuery'

export const useDatabaseConfig = () => {
  const { data: paramsData, isLoading } = useDatabaseParamsQuery()
  const { success, error: notifyError, warning } = useNotification()

  const form = ref({
    host: '',
    user: '',
    password: '',
    port: 1433,
    instance: '',
    database: '',
  })

  // Sincronizar settings cargados con el formulario cuando paramsData cambie
  watch(paramsData, (data) => {
    if (data && Array.isArray(data) && data.length > 0) {
      data.forEach(setting => {
        switch (setting.name) {
          case SettingNameEnum.SERVER:
            form.value.host = setting.value
            break
          case SettingNameEnum.INSTANCE:
            form.value.instance = setting.value
            break
          case SettingNameEnum.DATABASE:
            form.value.database = setting.value
            break
          case SettingNameEnum.USER:
            form.value.user = setting.value
            break
          case SettingNameEnum.PASSWORD:
            form.value.password = setting.value
            break
          case SettingNameEnum.PORT:
            form.value.port = Number(setting.value)
            break
        }
      })
    }
  }, { immediate: true })

  const checked = ref(false)
  const error = ref('')
  // Indicador de error visual en campo contraseña
  const passwordError = ref(false)

  const saveMutation = useSaveDatabaseConfigMutation()

  const handleSave = async () => {
    checked.value = false
    error.value = ''
    if (!form.value.password || form.value.password.trim() === '') {
      passwordError.value = true
      notifyError('La contraseña no puede estar vacía.')
      return
    }
    const settings: Setting[] = [
      {
        group: SettingGroupEnum.SQL_SERVER,
        name: SettingNameEnum.SERVER,
        value: form.value.host,
        type: 'string',
        description: 'Host del servidor SQL',
      },
      {
        group: SettingGroupEnum.SQL_SERVER,
        name: SettingNameEnum.INSTANCE,
        value: form.value.instance,
        type: 'string',
        description: 'Instancia del servidor SQL',
      },
      {
        group: SettingGroupEnum.SQL_SERVER,
        name: SettingNameEnum.DATABASE,
        value: form.value.database,
        type: 'string',
        description: 'Nombre de la base de datos',
      },
      {
        group: SettingGroupEnum.SQL_SERVER,
        name: SettingNameEnum.USER,
        value: form.value.user,
        type: 'string',
        description: 'Usuario de la base de datos',
      },
      {
        group: SettingGroupEnum.SQL_SERVER,
        name: SettingNameEnum.PASSWORD,
        value: form.value.password,
        type: 'string',
        description: 'Contraseña de la base de datos',
      },
      {
        group: SettingGroupEnum.SQL_SERVER,
        name: SettingNameEnum.PORT,
        value: String(form.value.port),
        type: 'number',
        description: 'Puerto de conexión',
      },
    ]
    try {
      await saveMutation.mutateAsync({ settings })
      success('Configuración guardada correctamente.')
    } catch (e) {
      notifyError('Error al guardar la configuración.')
    }
  }

  const testMutation = useTestDatabaseConnectionMutation()

  const handleCheck = async () => {
    checked.value = false
    error.value = ''
    if (!form.value.password || form.value.password.trim() === '') {
      passwordError.value = true
      notifyError('La contraseña no puede estar vacía.')
      return
    }
    try {
      const ok = await testMutation.mutateAsync()
      checked.value = ok
      if (ok) {
        success('¡Conexión exitosa!')
      } else {
        notifyError('No se pudo conectar a la base de datos.')
      }
    } catch (e) {
      notifyError('Error al probar la conexión.')
    }
  }

  return {
    form,
    checked,
    error,
    handleSave,
    handleCheck,
    passwordError,
  }
}
