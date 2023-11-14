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
          fontSize: 15,
          fontWeight: '600',
          lineHeight: 17,
          color: 'black'
        }}
      >
        {props.label.toUpperCase()}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '300',
          lineHeight: 21,
          color: props.valueColor ?? 'black',
          marginTop: 5
        }}
      >
        {props.value}
      </Text>
    </View>
  )
}
