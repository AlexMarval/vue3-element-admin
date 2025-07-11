import type { UserLogin } from './user'

// Interfaces y tipos usados en la vista de login

export interface QueryType {
  [propname: string]: string
}

export enum LoginFieldType {
  Password = 'password',
  Empty = '',
}

export type LoginData = UserLogin

// Puedes agregar aquí más interfaces relacionadas a login, por ejemplo:
// export interface LoginForm {
//   username: string;
//   password: string;
// }
