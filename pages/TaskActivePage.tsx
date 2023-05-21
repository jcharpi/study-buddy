// REACT
import { Dimensions, View } from "react-native"
import { Text } from "react-native-paper"

// REDUX
import { Task } from "../reducers/taskSlice"

// STYLES
import styles from "../styles"
import { useRoute } from "@react-navigation/native"

type TaskActivePageRouteParams = {
	task: Task
}

export default function TaskActivePage() {
  const SCREEN_HEIGHT_PERCENT_BREAKDOWN = Dimensions.get("screen").height / 100

	const route = useRoute()
	const { task } = route.params as TaskActivePageRouteParams

	function getTaskProgress(task: Task) {
		const timeElapsed = task.timeElapsed
		const timeLimit = task.timeLimit
		return Math.round((timeElapsed / timeLimit) * 100)
	}

	return (
		<View style={styles.container}>
			<Text variant="headlineLarge" style={styles.title}>
				{task.taskName}
			</Text>

			<View
				style={[
					styles.totalProgressOverlay,
					{ height: SCREEN_HEIGHT_PERCENT_BREAKDOWN * getTaskProgress(task), backgroundColor: "#ABBEA5" },
				]}
			/>
		</View>
	)
}
