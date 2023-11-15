import { getIconNameFromConnectorType } from './getIconNameFromConnectorType'

describe('getIconNameFromConnectorType', () => {
  test('returns correct icon name for Type 3', () => {
    const result = getIconNameFromConnectorType('Type 3')
    expect(result).toBe('type2')
  })

  test('returns correct icon name for Type 2', () => {
    const result = getIconNameFromConnectorType('Type 2')
    expect(result).toBe('type2')
  })

  test('returns correct icon name for J1772', () => {
    const result = getIconNameFromConnectorType('J1772')
    expect(result).toBe('j1772')
  })

  test('returns correct icon name for CCS 2', () => {
    const result = getIconNameFromConnectorType('CCS 2')
    expect(result).toBe('ccs2')
  })
})
