import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface TimerState {
	value: number
}

const initialState: TimerState = {
	value: 0
}

export const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		setSecondsElapsed: (state, action: PayloadAction<number>) => {
			state.value = state.value + action.payload
		},
	},
})

export const { setSecondsElapsed } =
	timerSlice.actions

export const selectTimer = (state: RootState) => state.timerSlice.value

export default timerSlice.reducer
