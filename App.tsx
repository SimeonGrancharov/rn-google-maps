import { StatusBar } from 'expo-status-bar'
import { Map } from './src/components/Map'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { store } from './src/stores/store'
import { useAppDispatch } from './src/hooks/useAppDispatch'
import { useFonts } from 'expo-font'
import { PinBottomSheetProvider } from './src/components/PinBottomSheetProvider'
import { useReduxStore } from './src/hooks/useReduxStore'
import { pinsSlice } from './src/reducers/pins'
import { fetchPins } from './src/services/pins'

const EntryApp = () => {
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
    <View style={styles.container}>
      <Map />
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {
  useFonts({
    fontello: require('./assets/fonts/fontello.ttf')
  })

  return (
    <Provider store={store}>
      <PinBottomSheetProvider>
        <EntryApp />
      </PinBottomSheetProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
