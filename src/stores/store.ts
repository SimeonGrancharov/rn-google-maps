import { configureStore } from '@reduxjs/toolkit'
import { pinsSlice } from './pins'

export const store = configureStore({
  reducer: {
    pins: pinsSlice.reducer,
  },
})
