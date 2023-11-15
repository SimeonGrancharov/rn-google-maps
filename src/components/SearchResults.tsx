import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderHeight } from '../constants/header'
import { PinT } from '../types/Pin'
import { Separator } from './Separator'

type PropsT = {
  shown: boolean
  results: PinT[]
  onResultPress: (location: { longitude: number; latitude: number }) => void
}

export const SearchResults = ({ shown, results, onResultPress }: PropsT) => {
  const insets = useSafeAreaInsets()

  return shown ? (
    <ScrollView
      style={[
        styles.scrollViewContainer,
        {
          top: insets.top + HeaderHeight
        }
      ]}
      keyboardShouldPersistTaps="always"
    >
      {results.map((pin) => (
        <TouchableOpacity
          activeOpacity={0.5}
          key={pin._id}
          onPress={() => {
            Keyboard.dismiss()

            onResultPress({
              longitude: pin.longitude,
              latitude: pin.latitude
            })
          }}
        >
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>{pin.title}</Text>
          </View>
          <Separator type="vertical" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : null
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    position: 'absolute',
    maxHeight: 150,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 52,
    paddingHorizontal: 15,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 19
  },
  resultContainer: {
    paddingVertical: 15
  }
})
