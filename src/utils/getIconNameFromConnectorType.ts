import { ConnectorT } from '../types/Pin'

export function getIconNameFromConnectorType(
  type: ConnectorT['type']
): 'ccs2' | 'j1772' | 'type2' {
  switch (type) {
    case 'Type 3':
    case 'Type 2': {
      return 'type2'
    }

    case 'J1772': {
      return 'j1772'
    }

    case 'CCS 2': {
      return 'ccs2'
    }
  }
}
