// REACT
import { Animated, Dimensions, Pressable, View } from "react-native"
import { Text } from "react-native-paper"

// REDUX
import { Task, selectTasks, setTasks } from "../reducers/taskSlice"

// STYLES
import styles from "../styles"
import { useRoute } from "@react-navigation/native"
import Countdown from "react-countdown"
import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"

type TaskActivePageRouteParams = {
	task: Task
}

export default function TaskActivePage({ navigation }: any) {
	const SCREEN_HEIGHT_PERCENT_BREAKDOWN = Dimensions.get("screen").height / 100

	const route = useRoute()
	const { task } = route.params as TaskActivePageRouteParams

	const TIME = 60000 * (task.timeLimit - task.timeElapsed)
	const height = useRef(new Animated.Value(0)).current

	const dispatch = useAppDispatch()
	const tasks = useAppSelector(selectTasks)

	let secondsElapsedCount = 0

	const secToMinElapsed = () => {
		const minutes = Math.floor(secondsElapsedCount / 60) // Get the whole number of minutes
		const remainingSeconds = secondsElapsedCount % 60 // Get the remaining seconds

		const decimalMinutes = minutes + remainingSeconds / 60 // Calculate the decimal minutes

		return decimalMinutes + task.timeElapsed
	}

	const renderer = ({
		hours,
		minutes,
		seconds,
	}: {
		hours: number
		minutes: number
		seconds: number
	}) => {
		return (
			<Text variant="headlineMedium" style={styles.title}>
				{hours > 0 ? hours + ":" : ""}
				{minutes < 10 && hours > 0 ? "0" + minutes : minutes}:
				{seconds < 10 ? "0" + seconds : seconds}
			</Text>
		)
	}

	const updateTaskTimeElapsed = () => {
		const updatedTasks = tasks.map((taskCheck) => {
			if (task === taskCheck) {
				return {
					...taskCheck,
					timeElapsed: secToMinElapsed(),
				}
			}
			return taskCheck
		})
		dispatch(setTasks(updatedTasks))
	}

	function handleExit() {
		navigation.navigate("TaskOverviewPage")

		setTimeout(() => {
			updateTaskTimeElapsed()
		}, 400)
	}

	function handleComplete() {
		secondsElapsedCount++
		handleExit()
	}

	function handleTick() {
		secondsElapsedCount++
	}

	const getTaskProgress = useCallback(
		(task: Task) => {
			const timeElapsed = task.timeElapsed
			const timeLimit = task.timeLimit
			const progress = Math.round((timeElapsed / timeLimit) * 100)
			return SCREEN_HEIGHT_PERCENT_BREAKDOWN * progress
		},
		[tasks]
	)

	useEffect(() => {
		Animated.timing(height, {
			toValue: Dimensions.get("screen").height - getTaskProgress(task),
			duration: TIME,
			useNativeDriver: false,
		}).start()
	}, [])

	return (
		<Pressable style={styles.container} onPress={handleExit}>
			<View style={styles.overviewContainer}>
				<Text variant="headlineLarge" style={styles.title}>
					{task.taskName}
				</Text>
				<Countdown
					overtime={false}
					onTick={handleTick}
					onComplete={handleComplete}
					date={Date.now() + TIME}
					renderer={renderer}
				/>
			</View>
			<Animated.View
				style={[
					styles.totalProgressOverlay,
					{
						height: Animated.add(getTaskProgress(task), height),
						backgroundColor: "#ABBEA5",
					},
				]}
			/>
		</Pressable>
	)
}
