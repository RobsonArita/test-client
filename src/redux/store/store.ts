import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../reducers/authReducer'

const rootReducer = combineReducers({
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export default store
