import { Text, View, StyleSheet } from 'react-native'
import { PinT } from '../types/Pin'
import { Separator } from './Separator'
import { getConnectorStatusColor } from '../utils/getStatusColor'
import { ItemWithLabel } from './ItemWithLabel'
import { getIconNameFromConnectorType } from '../utils/getIconNameFromConnectorType'
import { Icon } from './Icon'
import { formatCoordinates } from '../utils/formatCoordinates'

type PropsT = {
  pin: PinT
}

export const PinModalContent = (props: PropsT) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{props.pin.title}</Text>
      <Separator type="vertical" marginTop={15} marginBottom={15} />

      <View style={styles.row}>
        <View style={styles.coordinateContainer}>
          <ItemWithLabel
            value={formatCoordinates('latitude', props.pin.latitude)}
            label="latitude"
          />
        </View>

        <Separator type="horizontal" />
        <View style={styles.coordinateContainer}>
          <ItemWithLabel
            value={formatCoordinates('longitude', props.pin.longitude)}
            label="longitude"
          />
        </View>
      </View>

      <View>
        <Text style={styles.titleSmall}>Connectors</Text>
        <View style={styles.connectorsContainer}>
          {props.pin.connectors.map((connector, idx) => (
            <View key={idx} style={styles.connectorContainer}>
              <Icon
                size={32}
                name={getIconNameFromConnectorType(connector.type)}
                color="#363636"
                style={styles.icon}
              />
              <View style={styles.connectorInfo}>
                <ItemWithLabel
                  key={idx}
                  value={connector.status}
                  label={connector.type}
                  valueColor={getConnectorStatusColor(connector.status)}
                  alignment="left"
                />
                <Separator type="vertical" marginTop={10} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 20
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  coordinateContainer: {
    flex: 1,
    alignItems: 'center'
  },
  titleSmall: {
    fontSize: 17,
    marginTop: 15,
    fontWeight: '500',
    lineHeight: 23
  },
  connectorsContainer: {
    marginTop: 10
  },
  connectorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  connectorInfo: { flex: 1 },
  icon: {
    marginRight: 20
  }
})
