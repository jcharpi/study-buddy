import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface NavigationState {
	value: {
		initialRouteName: string
	}
}

const initialState: NavigationState = {
	value: {
		initialRouteName: "",
	},
}

export const navigationSlice = createSlice({
	name: "navigation",
	initialState,
	reducers: {
		setInitialRouteName: (state, action: PayloadAction<string>) => {
			state.value.initialRouteName = action.payload
		},
	},
})

export const { setInitialRouteName } = navigationSlice.actions

export const selectNavigation = (state: RootState) =>
	state.navigationSlice.value

export default navigationSlice.reducer
