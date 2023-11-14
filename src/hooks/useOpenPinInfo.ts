import { useContext } from 'react'
import { PinT } from '../types/Pin'
import { Context } from '../context/PinModalContext'

export function useOpenPinInfo(): (id: PinT['_id']) => void {
  const pinModalContext = useContext(Context)

  return pinModalContext.openPinModal
}
