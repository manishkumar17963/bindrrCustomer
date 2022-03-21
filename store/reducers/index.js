import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import authReducer from './auth'

const makeStore = () =>
  configureStore({
    reducer: { auth: authReducer },
    devTools: process.env.NODE_ENV !== 'production',
  })

export default createWrapper(makeStore)
