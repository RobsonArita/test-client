import { IUser } from "../interfaces/user";

enum TranslatedUserLevel {
  proprietario = 'Proprietário',
  locatario = 'Locatário',
  admin = 'Administrador'
}

export function translateUserLevel (userLevel: IUser['level']) {
  return TranslatedUserLevel[userLevel]
}