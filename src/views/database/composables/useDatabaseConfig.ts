import { ref } from 'vue'
import {
  useSaveDatabaseConfigMutation,
  useTestDatabaseConnectionMutation,
} from '../mutations/useDatabaseMutations'
import type { Setting } from '../interfaces/settings.interface'
import { SettingGroupEnum, SettingNameEnum } from '../interfaces/settings.interface'
import { useDatabaseParamsQuery } from '../mutations/useDatabaseParamsQuery'

export const useDatabaseConfig = () => {
  const { data: paramsData, isLoading } = useDatabaseParamsQuery()
  const form = ref({
    host: '',
    user: '',
    password: '',
    port: 3306,
    instance: '',
    database: '',
  })

  // Cargar datos si existen al montar
  if (paramsData && Array.isArray(paramsData.value) && paramsData.value.length > 0) {
    paramsData.value.forEach(setting => {
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

  const checked = ref(false)
  const error = ref('')

  const saveMutation = useSaveDatabaseConfigMutation()

  const handleSave = async () => {
    checked.value = false
    error.value = ''

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
      alert('Configuración guardada correctamente.')
    } catch (e) {
      error.value = 'Error al guardar la configuración.'
    }
  }

  const testMutation = useTestDatabaseConnectionMutation()

  const handleCheck = async () => {
    checked.value = false
    error.value = ''

    try {
      const ok = await testMutation.mutateAsync()
      checked.value = ok

      if (!ok) error.value = 'No se pudo conectar a la base de datos.'
    } catch (e) {
      error.value = 'Error al probar la conexión.'
    }
  }

  return {
    form,
    checked,
    error,
    handleSave,
    handleCheck,
  }
}
