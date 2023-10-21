export const login = (token: string, user: any) => {
  return {
    type: 'LOGIN' as const,
    token,
    user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT' as const
  }
}

export type AuthAction = ReturnType<typeof login | typeof logout>
