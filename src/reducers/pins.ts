import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PinT } from '../types/Pin'
import { fetchPins } from '../thunks/fetchPins'
import { RegionT } from '../types/Region'

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
  reducers: {
    changeVisiblePins: (state, action: PayloadAction<RegionT>) => {
      const visiblePins: PinT['_id'][] = []

      const bottomLat =
        action.payload.latitude - action.payload.latitudeDelta / 2
      const topLat = action.payload.latitude + action.payload.latitudeDelta / 2
      const leftLng =
        action.payload.longitude - action.payload.longitudeDelta / 2
      const rightLng =
        action.payload.longitude + action.payload.longitudeDelta / 2

      for (const pin of Object.values(state.pinsById)) {
        if (
          pin.longitude <= rightLng &&
          pin.longitude >= leftLng &&
          pin.latitude >= bottomLat &&
          pin.latitude <= topLat
        ) {
          visiblePins.push(pin._id)
        }
      }

      state.visiblePins = visiblePins

      console.log('set visible pins', visiblePins)
    },
  },
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
