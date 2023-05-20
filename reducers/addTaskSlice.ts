import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { Status, Task } from "../reducers/taskSlice"

export interface AddTaskState {
	value: Task
}

const initialState: AddTaskState = {
	value: {
		taskName: "",
		timeLimit: 0,
		timeElapsed: 0,
		status: Status.INCOMPLETE,
		progress: 0,
	},
}

export const addTaskSlice = createSlice({
	name: "addTask",
	initialState,
	reducers: {
		setTaskName: (state, action: PayloadAction<string>) => {
			state.value.taskName = action.payload
		},
		setTimeLimit: (state, action: PayloadAction<string>) => {
			state.value.timeLimit = parseInt(action.payload)
		},
		setTimeElapsed: (state, action: PayloadAction<number>) => {
			state.value.timeElapsed = action.payload
		},
	},
})

export const { setTaskName, setTimeLimit, setTimeElapsed } =
	addTaskSlice.actions

export const selectAddTask = (state: RootState) => state.addTaskSlice.value

export default addTaskSlice.reducer
