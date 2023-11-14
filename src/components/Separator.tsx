import { StyleSheet, View } from 'react-native'

export const Separator = (props: {
  type: 'horizontal' | 'vertical'
  width?: number
  marginTop?: number
  marginBottom?: number
  marginRight?: number
  backgroundColor?: string
}) => {
  return (
    <View
      style={{
        height: props.type === 'vertical' ? StyleSheet.hairlineWidth : '100%',
        width:
          props.width ??
          (props.type === 'vertical' ? '100%' : StyleSheet.hairlineWidth),
        backgroundColor: props.backgroundColor ?? '#d9d7d7',
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginRight: props.marginRight
      }}
    />
  )
}
