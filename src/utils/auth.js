const TokenKey = 'jwt'

export const getToken = () => {
  const data = localStorage.getItem(TokenKey)
  if (!data) return ''
  try {
    return JSON.parse(data).jwt || ''
  } catch {
    return ''
  }
}

export const setToken = token => {
  localStorage.setItem(TokenKey, JSON.stringify({ jwt: token }))
}

export const removeToken = () => {
  localStorage.removeItem(TokenKey)
}
