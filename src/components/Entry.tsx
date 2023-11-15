import { StatusBar } from 'expo-status-bar'
import { Map } from './Map'
import { SafeAreaView, View } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useReduxStore } from '../hooks/useReduxStore'
import { pinsSlice } from '../reducers/pins'
import { fetchPins } from '../services/pins'
import * as Location from 'expo-location'
import { RegionT } from '../types/Region'
import { SearchHeader } from './SearchHeader'

export const EntryApp = () => {
  const [location, setLocation] = useState<
    { longitude: number; latitude: number } | undefined
  >(undefined)

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

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return
    }

    const location = await Location.getCurrentPositionAsync({})

    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    fetchInitialPins()
  }, [])

  const region = useMemo<RegionT>(() => {
    if (location !== undefined) {
      return {
        longitude: location.longitude,
        latitude: location.latitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      }
    }

    return {
      latitude: -14.462632,
      longitude: 35.292339,
      latitudeDelta: 0.222,
      longitudeDelta: 0.0421
    }
  }, [location])

  return (
    <View>
      <SearchHeader onSearchResultPress={setLocation} />
      <Map region={region} />
      <StatusBar style="auto" />
    </View>
  )
}
