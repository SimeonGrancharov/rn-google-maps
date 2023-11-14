import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PinT } from '../types/Pin'
import { RegionT } from '../types/Region'

type StateT = {
  pinsById: Record<PinT['_id'], PinT>
  visiblePins: PinT['_id'][]
}

const initialState: StateT = {
  pinsById: {},
  visiblePins: []
}

export const pinsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    setPins: (state, action: PayloadAction<PinT[]>) => {
      state.pinsById = action.payload.reduce(
        (pinsById, pin) => {
          if (!pinsById[pin._id]) {
            pinsById[pin._id] = pin
          }

          return pinsById
        },
        {} as Record<PinT['_id'], PinT>
      )
    },
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
        let pinFitsHorizontally: boolean = false

        // Then we are on the time change line with E -> W
        if (leftLng <= 180 && rightLng >= 180) {
          pinFitsHorizontally =
            pin.longitude > 0
              ? pin.longitude >= leftLng
              : pin.longitude <= 360 - rightLng
        } else if (leftLng <= -180 && rightLng >= -180) {
          pinFitsHorizontally =
            pin.longitude > 0
              ? pin.longitude >= 360 + leftLng
              : pin.longitude <= rightLng
        } else {
          pinFitsHorizontally =
            pin.longitude <= rightLng && pin.longitude >= leftLng
        }

        if (
          pinFitsHorizontally &&
          pin.latitude >= bottomLat &&
          pin.latitude <= topLat
        ) {
          visiblePins.push(pin._id)
        }
      }

      state.visiblePins = visiblePins
    }
  }
})
