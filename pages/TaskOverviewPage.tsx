// REACT
import { Dimensions, View } from "react-native"
import { Text } from "react-native-paper"

// REDUX
import {
	Status,
	Task,
	resetTasks,
	selectTasks,
	setTasks,
} from "../reducers/taskSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"

// STYLES
import styles from "../styles"
import { useCallback, useEffect } from "react"
import {
	resetTotalProgress,
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

	const sortTasks = useCallback(
		(tasks: Task[]) => {
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
		},
		[getTaskProgress, tasks]
	)

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
		if (tasks.length > 0) {
			dispatch(setTotalProgress(getTotalProgress(tasks)))
			sortTasks(tasks)
		}
	}, [tasks])

	useEffect(() => {
		//Clear stack and set initial route name at midnight
		const now = new Date()
		const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
		const millisecondsUntilMidnight: number = midnight.getTime() - now.getTime()

		setTimeout(() => {
		  // Clear stack
		  navigation.reset({
				index: 0,
				routes: [{ name: "TaskInputPage" }],
			})
			dispatch(resetTotalProgress())
			dispatch(resetTasks())
		}, millisecondsUntilMidnight)
	}, [])

  return (
		<View style={styles.container}>
			<View style={styles.overviewContainer}>
				<Text variant="headlineLarge" style={styles.title}>
					{totalProgress === 100 ? "Tasks complete! 🥳️" : "Tasks"}
				</Text>
				<Text variant="headlineLarge" style={styles.title}>
					{totalProgress === 100 ? "" : `${totalProgress}%`}
				</Text>
			</View>
			{totalProgress === 100 ? (
				<View key={`${Status.COMPLETE}_header`}>
					<Text variant="titleLarge" style={styles.label}>
						Check back tomorrow morning!
					</Text>
					<Text variant="titleLarge" style={styles.label}>
						{Status.COMPLETE}
					</Text>
					<TaskScrollview
						status={Status.COMPLETE}
						tasks={tasks}
						getTaskProgress={getTaskProgress}
						navigation={navigation}
					/>
				</View>
			) : (
				statusTypes.map((status) => {
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
				})
			)}
			<View
				style={[
					styles.totalProgressOverlay,
					{
						height:
							tasks.length > 0
								? SCREEN_HEIGHT_PERCENT_BREAKDOWN * totalProgress
								: 0,
					},
				]}
			/>
		</View>
	)
}
