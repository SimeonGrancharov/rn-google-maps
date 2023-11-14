import { ConnectorT, PinT } from '../types/Pin'

export function getConnectorStatusColor(status: ConnectorT['status']): string {
  return status === 'available' ? 'green' : 'red'
}
