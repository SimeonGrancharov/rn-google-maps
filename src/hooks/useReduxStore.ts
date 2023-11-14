import { useSelector } from 'react-redux'
import { RootStateT } from '../stores/store'

export function useReduxStore<T>(selector: (state: RootStateT) => T): T {
  return useSelector(selector)
}
