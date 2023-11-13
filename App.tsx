import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={{
          width: 400,
          height: 400,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
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
