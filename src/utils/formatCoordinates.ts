export function formatCoordinates(
  type: 'longitude' | 'latitude',
  value: number
): string {
  let result: string = ''

  switch (type) {
    case 'latitude': {
      if (value < 0) {
        result += 'S '
      } else {
        result += 'N '
      }

      break
    }

    case 'longitude': {
      if (value < 0) {
        result += 'W '
      } else {
        result += 'E '
      }

      break
    }
  }

  const degs = Math.trunc(Math.abs(value))

  result += `${degs}º `

  const mins = (Math.abs(value) - degs) * 60

  result += `${Math.trunc(mins).toString().padStart(2, '0')}' `

  const secs = (mins - Math.trunc(mins)) * 60

  result += `${Math.trunc(secs).toString().padStart(2, '0')}"`

  return result
}
