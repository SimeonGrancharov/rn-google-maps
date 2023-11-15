import { useCallback } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderHeight } from '../constants/header'

type PropsT = {
  onZoomPress: (direction: 'in' | 'out') => void
}

export const ZoomInOutButtons = (props: PropsT) => {
  const insets = useSafeAreaInsets()
  const onZoomInPress = useCallback(() => {
    props.onZoomPress('in')
  }, [props.onZoomPress])

  const onZoomOutPress = useCallback(() => {
    props.onZoomPress('out')
  }, [props.onZoomPress])

  return (
    <View
      style={[
        styles.mainContainer,
        {
          bottom: insets.top + insets.bottom + HeaderHeight,
          marginBottom: 10
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, { marginRight: 10 }]}
        onPress={onZoomInPress}
      >
        <Text>➕</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button]}
        onPress={onZoomOutPress}
      >
        <Text>➖</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    right: 35,
    flexDirection: 'row'
  },
  button: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#595857'
  }
})
