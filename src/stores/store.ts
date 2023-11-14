import { configureStore } from '@reduxjs/toolkit'
import { pinsSlice } from '../reducers/pins'

const rootReducer = {
  pins: pinsSlice.reducer,
}

export const store = configureStore({
  reducer: rootReducer,
})

export type RootStateT = ReturnType<typeof store.getState>
