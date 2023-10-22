// reducers/authReducer.ts

import { AuthAction } from '../actions/authActions'

export interface AuthState {
  token: string | null
  user: any
}

export interface SelectorState {
  auth: AuthState
}

const initialState: AuthState = {
  token: null,
  user: null
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.token, user: action.user }
    case 'LOGOUT':
      return { ...state, token: null, user: null }
    default:
      return state
  }
}

export default authReducer
