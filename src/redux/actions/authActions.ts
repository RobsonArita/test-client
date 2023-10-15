export const login = (token: string) => {
  return {
    type: 'LOGIN' as const,
    token
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT' as const
  }
}

export type AuthAction = ReturnType<typeof login | typeof logout>
