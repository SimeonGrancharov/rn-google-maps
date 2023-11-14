import { useDispatch } from 'react-redux'
import { store } from '../stores/store'

type AppDispatch = typeof store.dispatch

export function useAppDispatch() {
  return useDispatch<AppDispatch>()
}
