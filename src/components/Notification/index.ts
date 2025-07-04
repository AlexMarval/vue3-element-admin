import { useToast, POSITION } from 'vue-toastification'

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export interface NotifyOptions {
  message: string
  type?: NotificationType
  title?: string
  options?: Partial<{
    position: POSITION
    timeout: number
    closeOnClick: boolean
    pauseOnHover: boolean
    draggable: boolean
    showCloseButtonOnHover: boolean
    // Puedes agregar más opciones según la API de Toastification
  }>
}

// Extiende el tipo de opciones para Toastification para permitir clases personalizadas
interface ToastCustomOptions {
  toastClassName?: string
  bodyClassName?: string
}

export const useNotification = () => {
  const toast = useToast()

  const notify = ({ message, type = NotificationType.Info, title, options }: NotifyOptions) => {
    const customOptions: ToastCustomOptions & Record<string, any> = {
      position: POSITION.BOTTOM_RIGHT,
      timeout: 3500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      showCloseButtonOnHover: false,
      ...options,
      ...(title ? { title } : {}),
    }
    // Personalización para warning
    if (type === NotificationType.Warning) {
      customOptions.toastClassName = 'bg-yellow-100 text-yellow-800'
      customOptions.bodyClassName = 'text-yellow-800'
    }

    toast[type](message, customOptions)
  }

  const success = (message: string, title?: string, options?: NotifyOptions['options']) => {
    notify({ message, type: NotificationType.Success, title, options })
  }

  const error = (message: string, title?: string, options?: NotifyOptions['options']) => {
    notify({ message, type: NotificationType.Error, title, options })
  }

  const warning = (message: string, title?: string, options?: NotifyOptions['options']) => {
    notify({ message, type: NotificationType.Warning, title, options })
  }

  const info = (message: string, title?: string, options?: NotifyOptions['options']) => {
    notify({ message, type: NotificationType.Info, title, options })
  }

  return { notify, success, error, warning, info }
}
