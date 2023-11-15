import { Provider } from 'react-redux'
import { store } from './src/stores/store'
import { useFonts } from 'expo-font'
import { PinBottomSheetProvider } from './src/components/PinBottomSheetProvider'
import { EntryApp } from './src/components/Entry'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  useFonts({
    fontello: require('./assets/fonts/fontello.ttf')
  })

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PinBottomSheetProvider>
          <EntryApp />
        </PinBottomSheetProvider>
      </Provider>
    </SafeAreaProvider>
  )
}
