import request from '@/utils/request'
import type { UserLogin, UserInfo } from '../interfaces/user'

export function login(data: UserLogin) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data,
  })
}

export function getInfo(token: string) {
  return request<UserInfo>({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token },
  })
}

export function logout(token: string) {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post',
    params: { token },
  })
}
