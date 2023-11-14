import { createSlice } from '@reduxjs/toolkit'
import { PinT } from '../types/Pin'
import { fetchPins } from '../thunks/fetchPins'

type StateT = {
  dataState: 'success' | 'loading' | 'error' | undefined
  pinsById: Record<PinT['_id'], PinT>
  visiblePins: PinT['_id'][]
}

const initialState: StateT = {
  dataState: undefined,
  pinsById: {},
  visiblePins: [],
}

export const pinsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPins.fulfilled, (state, action) => {
      if (!action.payload) {
        return
      }

      state.pinsById = action.payload.reduce(
        (pinsById, pin) => {
          if (!pinsById[pin._id]) {
            pinsById[pin._id] = pin
          }

          return pinsById
        },
        {} as Record<PinT['_id'], PinT>
      )

      state.dataState = 'success'
    }),
      builder.addCase(fetchPins.rejected, (state) => {
        state.dataState = 'error'
      })
  },
})
