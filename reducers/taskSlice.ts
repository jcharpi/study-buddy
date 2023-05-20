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
	status: Status
	progress: number
}

export interface TaskState {
	value: {
		tasks: Task[]
		taskName: string
		timeLimit: string
	}
}

const initialState: TaskState = {
	value: {
		tasks: [],
		taskName: "",
		timeLimit: "",
	},
}

export const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			state.value.tasks = [...state.value.tasks, action.payload]
		},
		setTasks: (state, action: PayloadAction<Task[]>) => {
			state.value.tasks = JSON.parse(JSON.stringify(action.payload))
		},
		setTaskName: (state, action: PayloadAction<string>) => {
			state.value.taskName = action.payload
		},
		setTimeLimit: (state, action: PayloadAction<string>) => {
			state.value.timeLimit = action.payload
		},
	},
})

export const { addTask, setTasks, setTaskName, setTimeLimit } =
	taskSlice.actions

export const selectTasks = (state: RootState) => state.taskSlice.value

export default taskSlice.reducer
