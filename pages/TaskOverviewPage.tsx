// REACT
import { Dimensions, View } from "react-native"
import { Text } from "react-native-paper"

// REDUX
import { Status, Task, selectTasks, setTasks } from "../reducers/taskSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"

// STYLES
import styles from "../styles"
import { useCallback, useEffect } from "react"
import {
	selectTotalProgress,
	setTotalProgress,
} from "../reducers/totalProgressSlice"

// COMPONENTS
import { TaskScrollview } from "./../components/TaskScrollview"

export default function TaskOverviewPage({ navigation }: any) {
	const SCREEN_HEIGHT_PERCENT_BREAKDOWN = Dimensions.get("screen").height / 100

	const dispatch = useAppDispatch()
	const totalProgress = useAppSelector(selectTotalProgress)
	const tasks = useAppSelector(selectTasks)
	const statusTypes = Object.values(Status)

	const sortTasks = useCallback((tasks: Task[]) => {
    const updatedTasks = tasks.map((task) => {
      const taskProgress = getTaskProgress(task)
      if (taskProgress > 0 && taskProgress < 100) {
        return {
          ...task,
          status: Status.IN_PROGRESS,
        }
      } else if (getTaskProgress(task) > 99) {
        return {
          ...task,
          status: Status.COMPLETE,
        }
      }
      return task
    })
    if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
      dispatch(setTasks(updatedTasks))
    }
  }, [getTaskProgress])

	function getTaskProgress(task: Task) {
		const timeElapsed = task.timeElapsed
		const timeLimit = task.timeLimit
		return Math.round((timeElapsed / timeLimit) * 100)
	}

	function getTotalProgress(tasks: Task[]) {
		const totalPossible = tasks.length * 100
		const current = tasks.reduce((sum, task) => sum + getTaskProgress(task), 0)
		return Math.round((current / totalPossible) * 100)
	}

	useEffect(() => {
		dispatch(setTotalProgress(getTotalProgress(tasks)))
	}, [tasks])

	useEffect(() => {
		sortTasks(tasks)
	}, [tasks])

	return (
		<View style={styles.container}>
			<View style={styles.overviewContainer}>
				<Text variant="headlineLarge" style={styles.title}>
					Tasks
				</Text>
				<Text variant="headlineLarge" style={styles.title}>
					{`${totalProgress}%`}
				</Text>
			</View>

			{statusTypes.map((status) => {
				return (
					<View key={`${status}_header`}>
						<Text variant="titleLarge" style={styles.label}>
							{status}
						</Text>
						<TaskScrollview
							status={status}
							tasks={tasks}
							getTaskProgress={getTaskProgress}
							navigation={navigation}
						/>
					</View>
				)
			})}
			<View
				style={[
					styles.totalProgressOverlay,
					{ height: SCREEN_HEIGHT_PERCENT_BREAKDOWN * totalProgress },
				]}
			/>
		</View>
	)
}
