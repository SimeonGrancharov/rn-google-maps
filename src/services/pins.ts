import { PinSchema, PinT } from '../types/Pin'

export async function fetchPins(): Promise<PinT[]> {
  const response = await fetch('http://localhost:3000/pins', {
    headers: {
      'Content-type': 'application/json'
    }
  })

  const data = await response.json()

  return PinSchema.array().parse(data)
}
