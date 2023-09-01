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
    resetTasks: (state) => {
      state.value = JSON.parse(JSON.stringify([]))
    },
  },
})

export const { addTask, setTasks, resetTasks } = taskSlice.actions

export const selectTasks = (state: RootState) => state.taskSlice.value

export default taskSlice.reducer
