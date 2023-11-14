import { PinT } from '../types/Pin'
import { useReduxStore } from './useReduxStore'

export function useSelectVisiblePins(): PinT[] {
  const visiblePins = useReduxStore((state) => state.pins.visiblePins)
  const pinsById = useReduxStore((state) => state.pins.pinsById)

  const pins: PinT[] = visiblePins.map((pinId) => pinsById[pinId])

  return pins
}
