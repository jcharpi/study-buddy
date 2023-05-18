import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface Task {
	taskName: string
	timeLimit: number
}

export interface TaskState {
	value: Task[]
}

const initialState: TaskState = {
	value: [],
}

export const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			state.value = [...state.value, action.payload]
		},
	},
})

export const { addTask } = taskSlice.actions

export const selectTasks = (state: RootState) => state.taskSlice.value

export default taskSlice.reducer
