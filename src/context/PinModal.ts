import { createContext } from 'react'
import { PinT } from '../types/Pin'

export type ContextT = {
  openPinModal: (id: PinT['_id']) => void
}

export const Context = createContext<ContextT>({
  openPinModal: () => {},
})
