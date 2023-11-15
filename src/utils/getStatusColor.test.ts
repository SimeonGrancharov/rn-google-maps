import { getConnectorStatusColor } from './getStatusColor'

describe('getConnectorStatusColor', () => {
  test('returns green color for available status', () => {
    const result = getConnectorStatusColor('available')
    expect(result).toBe('#9CCC65')
  })

  test('returns gray color for any other status', () => {
    const result = getConnectorStatusColor('unavailable')
    expect(result).toBe('#A5A6A5')
  })
})
