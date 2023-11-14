import { createAsyncThunk } from '@reduxjs/toolkit'
import { PinT } from '../types/Pin'

export const fetchPins = createAsyncThunk('pins/fetch', async () => {
  const data = await fetch('http://localhost:3000/pins')

  return (await data.json()) as PinT[]
})
