import { useCallback } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'

type PropsT = {
  onZoomPress: (direction: 'in' | 'out') => void
}

export const ZoomInOutButtons = (props: PropsT) => {
  const onZoomInPress = useCallback(() => {
    props.onZoomPress('in')
  }, [props.onZoomPress])

  const onZoomOutPress = useCallback(() => {
    props.onZoomPress('out')
  }, [props.onZoomPress])

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'blue' }]}
        onPress={onZoomInPress}
      >
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        onPress={onZoomOutPress}
      >
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 50,
    left: 50,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
  },
})
