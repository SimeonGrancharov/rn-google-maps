import MapView, { Camera, Marker } from 'react-native-maps'
import { useSelectVisiblePins } from '../hooks/useSelectVisiblePins'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useCallback, useEffect, useRef } from 'react'
import { pinsSlice } from '../reducers/pins'
import { RegionT } from '../types/Region'
import { useReduxStore } from '../hooks/useReduxStore'
import { ZoomInOutButtons } from './ZoomInOutButtons'
import { useOpenPinInfo } from '../hooks/useOpenPinInfo'

const initialRegion: RegionT = {
  latitude: -14.462632,
  longitude: 35.292339,
  latitudeDelta: 0.222,
  longitudeDelta: 0.0421
}

export const Map = () => {
  const openPinInfo = useOpenPinInfo()
  const pins = useSelectVisiblePins()
  const dispatch = useAppDispatch()
  const pinsById = useReduxStore((state) => state.pins.pinsById)
  const mapRef = useRef<MapView | null>(null)

  useEffect(() => {
    changeVisiblePins(initialRegion)
  }, [pinsById])

  const changeVisiblePins = useCallback((region: RegionT) => {
    dispatch(pinsSlice.actions.changeVisiblePins(region))
  }, [])

  const zoomInOut = useCallback((direction: 'in' | 'out') => {
    mapRef.current?.getCamera().then((cam: Camera) => {
      if (cam.zoom) {
        cam.zoom += 2 * (direction === 'in' ? 1 : -1)
      }

      mapRef.current?.animateCamera(cam)
    })
  }, [])

  return (
    <>
      <MapView
        provider="google"
        style={{
          width: '100%',
          height: '100%'
        }}
        initialRegion={initialRegion}
        zoomEnabled
        zoomControlEnabled
        onRegionChange={changeVisiblePins}
        pitchEnabled={false}
        ref={(r) => (mapRef.current = r)}
      >
        {pins.map((pin) => (
          <Marker
            pinColor="red"
            key={pin._id}
            coordinate={{
              longitude: pin.longitude,
              latitude: pin.latitude
            }}
            onPress={() => {
              openPinInfo(pin._id)
            }}
          />
        ))}
      </MapView>
      <ZoomInOutButtons onZoomPress={zoomInOut} />
    </>
  )
}
