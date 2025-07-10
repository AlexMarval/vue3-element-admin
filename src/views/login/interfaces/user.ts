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

export interface AuthUser {
  name: string
  mail: string
  dn: string
  roles: string[]
  jwt: string
  avatar?: string
}
