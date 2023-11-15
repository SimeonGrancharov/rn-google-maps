import { formatCoordinates } from './formatCoordinates'

describe('formatCoordinates', () => {
  test('formats latitude correctly for positive value', () => {
    const result = formatCoordinates('latitude', 40.12345)
    expect(result).toBe('N 40º 07\' 24"')
  })

  test('formats latitude correctly for negative value', () => {
    const result = formatCoordinates('latitude', -40.12345)
    expect(result).toBe('S 40º 07\' 24"')
  })

  test('formats longitude correctly for positive value', () => {
    const result = formatCoordinates('longitude', 80.54321)
    expect(result).toBe('E 80º 32\' 35"')
  })

  test('formats longitude correctly for negative value', () => {
    const result = formatCoordinates('longitude', -80.54321)
    expect(result).toBe('W 80º 32\' 35"')
  })
})
