export enum UserLevels {
  locatario = 'locatario',
  proprietario = 'proprietario'
}

export interface IUser {
  email: string
  level: UserLevels
  name?: string
  cellphone?: string
}