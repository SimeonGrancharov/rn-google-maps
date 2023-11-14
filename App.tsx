import { Provider } from 'react-redux'
import { store } from './src/stores/store'
import { useFonts } from 'expo-font'
import { PinBottomSheetProvider } from './src/components/PinBottomSheetProvider'
import { EntryApp } from './src/components/Entry'

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
