export interface UserLogin {
  username?: string
  password?: string
}

export interface UserInfo {
  name: string
  avatar: string
  roles: string[]
  introduction?: string
}
