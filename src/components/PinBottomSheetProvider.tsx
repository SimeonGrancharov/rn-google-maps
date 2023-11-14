import { ReactNode, useEffect, useMemo, useState } from 'react'
import { PinT } from '../types/Pin'
import { Context, ContextT } from '../context/PinModalContext'
import { Pressable, StyleSheet } from 'react-native'
import { useReduxStore } from '../hooks/useReduxStore'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated'
import { PinModalContent } from './PinModalContent'

type PropsT = {
  children: ReactNode
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const PinBottomSheetProvider = (props: PropsT) => {
  const [openedModalId, setOpenedModalId] = useState<PinT['_id'] | undefined>(
    undefined
  )

  const pin = useReduxStore((state) =>
    openedModalId ? state.pins.pinsById[openedModalId] : undefined
  )
  useEffect(() => {
    console.log('unmount')
  }, [])

  const contextValue = useMemo<ContextT>(
    () => ({
      openPinModal: (id: PinT['_id']) => {
        setOpenedModalId(id)
      }
    }),
    []
  )

  return (
    <>
      <Context.Provider value={contextValue}>{props.children}</Context.Provider>

      {pin && (
        <>
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            onPress={() => setOpenedModalId(undefined)}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}
          />
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown.duration(2000)}
            style={styles.bottomSheet}
          >
            <PinModalContent pin={pin} />
          </Animated.View>
        </>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20
  }
})
