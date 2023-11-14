import { ConnectorT } from '../types/Pin'

export function getConnectorStatusColor(status: ConnectorT['status']): string {
  return status === 'available' ? '#9CCC65' : '#A5A6A5'
}
