import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export enum Status {
	INCOMPLETE = "Incomplete",
	IN_PROGRESS = "In Progress",
	COMPLETE = "Complete",
}

export interface Task {
	taskName: string
	timeLimit: number
  timeElapsed: number
	status: Status
	progress: number
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
		setTasks: (state, action: PayloadAction<Task[]>) => {
			state.value = JSON.parse(JSON.stringify(action.payload))
		},
	},
})

export const { addTask, setTasks } =
	taskSlice.actions

export const selectTasks = (state: RootState) => state.taskSlice.value

export default taskSlice.reducer
