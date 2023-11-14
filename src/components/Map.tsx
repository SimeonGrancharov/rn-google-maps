import MapView, { Marker } from 'react-native-maps'
import { useSelectVisiblePins } from '../hooks/useSelectVisiblePins'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useCallback, useEffect, useRef } from 'react'
import { pinsSlice } from '../reducers/pins'
import { RegionT } from '../types/Region'
import { useReduxStore } from '../hooks/useReduxStore'
import { TouchableOpacity, View, Text } from 'react-native'

type PropsT = {}

const initialRegion: RegionT = {
  latitude: -14.462632,
  longitude: 35.292339,
  latitudeDelta: 0.222,
  longitudeDelta: 0.0421,
}

export const Map = () => {
  const pins = useSelectVisiblePins()
  const dispatch = useAppDispatch()
  const pinsById = useReduxStore((state) => state.pins.pinsById)
  const mapRef = useRef<MapView | null>(null)

  const changeVisiblePins = useCallback((region: RegionT) => {
    dispatch(pinsSlice.actions.changeVisiblePins(region))
  }, [])

  useEffect(() => {
    changeVisiblePins(initialRegion)
  }, [pinsById])

  return (
    <>
      <MapView
        provider="google"
        style={{
          width: '100%',
          height: '100%',
        }}
        initialRegion={initialRegion}
        zoomEnabled
        zoomControlEnabled
        onRegionChange={changeVisiblePins}
        ref={(r) => (mapRef.current = r)}
      >
        {pins.map((pin) => (
          <Marker
            pinColor="red"
            key={pin._id}
            coordinate={{
              longitude: pin.longitude,
              latitude: pin.latitude,
            }}
          />
        ))}
      </MapView>
    </>
  )
}
