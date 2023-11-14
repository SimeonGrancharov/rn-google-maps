import { ReactNode, useMemo, useState } from 'react'
import { PinT } from '../types/Pin'
import { Context, ContextT } from '../context/PinModalContext'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useReduxStore } from '../hooks/useReduxStore'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated'

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

  const contextValue = useMemo<ContextT>(
    () => ({
      openPinModal: (id: PinT['_id']) => {
        setOpenedModalId(id)
      }
    }),
    []
  )

  return (
    <Context.Provider value={contextValue}>
      {props.children}

      {pin ? (
        <>
          <AnimatedPressable
            entering={FadeIn}
            exiting={FadeOut}
            onPress={() => setOpenedModalId(undefined)}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}
          />
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              padding: 50
            }}
          >
            <Text>{pin._id}</Text>
          </Animated.View>
        </>
      ) : null}
    </Context.Provider>
  )
}
