import MapView from 'react-native-maps'

type PropsT = {}

export const Map = () => {
  return (
    <MapView
      provider="google"
      style={{
        width: '100%',
        height: '100%',
      }}
      initialRegion={{
        latitude: 41.38333,
        longitude: 22.68361,
        latitudeDelta: 0.222,
        longitudeDelta: 0.0421,
      }}
    ></MapView>
  )
}
