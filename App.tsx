import { StatusBar } from 'expo-status-bar'
import { Map } from './src/components/Map'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { fetchPins } from './src/thunks/fetchPins'
import { store } from './src/stores/store'
import { useAppDispatch } from './src/hooks/useAppDispatch'

const EntryApp = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPins())
  }, [])

  return (
    <View style={styles.container}>
      <Map />
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <EntryApp />
    </Provider>
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
