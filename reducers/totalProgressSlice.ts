import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface TotalProgressState {
  value: number
}

const initialState: TotalProgressState = {
  value: 0,
}

export const totalProgressSlice = createSlice({
  name: "totalProgress",
  initialState,
  reducers: {
    setTotalProgress: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
    resetTotalProgress: (state) => {
      state.value = 0
    },
  },
})

export const { setTotalProgress, resetTotalProgress } =
  totalProgressSlice.actions

export const selectTotalProgress = (state: RootState) =>
  state.totalProgressSlice.value

export default totalProgressSlice.reducer
