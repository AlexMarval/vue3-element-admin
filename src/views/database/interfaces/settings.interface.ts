export enum SettingNameEnum {
  SERVER = 'server',
  PORT = 'port',
  INSTANCE = 'instance',
  DATABASE = 'database',
  USER = 'user',
  PASSWORD = 'password',
}

export enum SettingGroupEnum {
  SQL_SERVER = 'sql_server',
  GENERAL = 'general',
}

export enum SettingConfigEnum {}

export interface Setting {
  group: SettingGroupEnum
  name: SettingNameEnum
  value: string
  type: string
  description: string
}
