import MapView, { Camera, Marker } from 'react-native-maps'
import { useSelectVisiblePins } from '../hooks/useSelectVisiblePins'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { pinsSlice } from '../reducers/pins'
import { RegionT } from '../types/Region'
import { useReduxStore } from '../hooks/useReduxStore'
import { ZoomInOutButtons } from './ZoomInOutButtons'
import { throttle } from 'lodash'
import { useOpenPinInfo } from '../hooks/useOpenPinInfo'

type PropsT = {
  region: RegionT
}

export const Map = (props: PropsT) => {
  const mapRef = useRef<MapView | null>(null)
  const openPinInfo = useOpenPinInfo()
  const pins = useSelectVisiblePins()
  const dispatch = useAppDispatch()
  const pinsById = useReduxStore((state) => state.pins.pinsById)

  useEffect(() => {
    changeVisiblePins(props.region)
  }, [pinsById, props.region])

  const changeVisiblePins = useCallback(
    throttle((region: RegionT) => {
      dispatch(pinsSlice.actions.changeVisiblePins(region))
    }, 200),
    []
  )

  const zoomInOut = useCallback((direction: 'in' | 'out') => {
    mapRef.current?.getCamera().then((cam: Camera) => {
      if (cam.zoom) {
        cam.zoom += Math.log10(cam.zoom) * (direction === 'in' ? 1 : -1)
      }

      mapRef.current?.animateCamera(cam)
    })
  }, [])

  return (
    <>
      <MapView
        provider="google"
        style={styles.mapContainer}
        region={props.region}
        zoomEnabled={false}
        zoomControlEnabled={false}
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

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%'
  }
})
