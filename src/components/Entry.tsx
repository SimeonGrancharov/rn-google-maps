import { StatusBar } from 'expo-status-bar'
import { Map } from './Map'
import { View } from 'react-native'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useReduxStore } from '../hooks/useReduxStore'
import { pinsSlice } from '../reducers/pins'
import { fetchPins } from '../services/pins'

export const EntryApp = () => {
  const dispatch = useAppDispatch()
  const pinsById = useReduxStore((state) => state.pins.pinsById)

  const fetchInitialPins = async () => {
    if (Object.values(pinsById).length > 0) {
      return
    }

    try {
      const pins = await fetchPins()

      dispatch(pinsSlice.actions.setPins(pins))
    } catch (err) {
      console.log('Errored while fetching pins', err)
    }
  }

  useEffect(() => {
    fetchInitialPins()
  }, [])

  return (
    <View>
      <Map />
      <StatusBar style="auto" />
    </View>
  )
}
