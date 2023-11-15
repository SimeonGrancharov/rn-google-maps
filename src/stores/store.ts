import { configureStore } from '@reduxjs/toolkit'
import { pinsSlice } from '../reducers/pins'

const rootReducer = {
  pins: pinsSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})

export type RootStateT = ReturnType<typeof store.getState>
