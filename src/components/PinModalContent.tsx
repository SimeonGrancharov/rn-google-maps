import { Text, View } from 'react-native'
import { PinT } from '../types/Pin'
import { Separator } from './Separator'
import { getConnectorStatusColor } from '../utils/getStatusColor'
import { ItemWithLabel } from './ItemWithLabel'

type PropsT = {
  pin: PinT
}

export const PinModalContent = (props: PropsT) => {
  return (
    <View
      style={{
        paddingBottom: 20
      }}
    >
      <Text
        style={{
          fontSize: 19,
          fontWeight: '500',
          textAlign: 'center'
        }}
      >
        {props.pin.title}
      </Text>
      <Separator type="vertical" marginTop={15} marginBottom={15} />

      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <ItemWithLabel value={props.pin.latitude} label="latitude" />
        </View>

        <Separator type="horizontal" />
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <ItemWithLabel value={props.pin.longitude} label="longitude" />
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 17,
            marginTop: 15,
            fontWeight: '500',
            lineHeight: 23
          }}
        >
          Connectors
        </Text>
        <View
          style={{
            marginTop: 10
          }}
        >
          {props.pin.connectors.map((connector, idx) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginBottom: 5
              }}
            >
              <Separator
                type="horizontal"
                width={3}
                backgroundColor={getConnectorStatusColor(connector.status)}
                marginRight={5}
              />
              <ItemWithLabel
                key={idx}
                value={connector.status}
                label={connector.type}
                valueColor={getConnectorStatusColor(connector.status)}
                alignment="left"
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
