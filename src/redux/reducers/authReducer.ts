// reducers/authReducer.ts

import { AuthAction } from '../actions/authActions'

interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: null
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.token }
    case 'LOGOUT':
      return { ...state, token: null }
    default:
      return state
  }
}

export default authReducer
