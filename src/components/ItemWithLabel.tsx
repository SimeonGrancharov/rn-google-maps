import { View, Text } from 'react-native'

type PropsT = {
  value: string | number
  label: string
  valueColor?: string
  alignment?: 'left'
}

export const ItemWithLabel = (props: PropsT) => {
  return (
    <View
      style={{
        alignItems: props.alignment === 'left' ? 'flex-start' : 'center'
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          lineHeight: 17,
          color: 'black'
        }}
      >
        {props.label.toUpperCase()}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '300',
          lineHeight: 21,
          color: props.valueColor ?? 'black'
        }}
      >
        {props.value}
      </Text>
    </View>
  )
}
