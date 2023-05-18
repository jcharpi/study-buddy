import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface Task {
	taskName: string
	timeLimit: number
}

export interface TaskState {
	value: Task[]
}

const initialState: TaskState = {
	value: [
		{
			taskName: "test1",
			timeLimit: 20,
		},
		{
			taskName: "test2",
			timeLimit: 20,
		},
		{
			taskName: "test3",
			timeLimit: 20,
		},
	],
}

export const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<string>) => {
			state.value = [...state.value, {taskName: action.payload, timeLimit: 20}]
		},
	},
})

export const { addTask } = taskSlice.actions

export const selectTasks = (state: RootState) => state.taskSlice.value

export default taskSlice.reducer
