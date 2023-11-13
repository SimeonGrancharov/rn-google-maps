import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

export default function App() {
  return (
    <View style={styles.container}>
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
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
