import { configureStore } from '@reduxjs/toolkit'
import userreducer from './userslice'
export const store = configureStore({
  reducer: {
    user: userreducer
  },
})