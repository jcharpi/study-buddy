// REACT
import { Dimensions, ScrollView, View } from "react-native"
import { Card, Text } from "react-native-paper"

// REDUX
import { Status, Task, selectTasks } from "../reducers/taskSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"

// STYLES
import styles from "../styles"
import { useEffect } from "react"
import { selectTotalProgress, setTotalProgress } from "../reducers/totalProgressSlice"

export default function TaskOverviewPage() {
	const SCREEN_HEIGHT_PERCENT_BREAKDOWN = Dimensions.get("screen").height / 100
	const HEIGHT_SCALE_FACTOR = 1.5

  const dispatch = useAppDispatch()
  const totalProgress = useAppSelector(selectTotalProgress)
	const tasks = useAppSelector(selectTasks)
	const statusTypes = Object.values(Status)

	const testTasks: Task[] = [
		{
			taskName: "task1",
			timeLimit: 20,
      timeElapsed: 0,
			status: Status.INCOMPLETE,
			progress: 100,
		},
		{
			taskName: "task2",
			timeLimit: 45,
      timeElapsed: 0,
			status: Status.INCOMPLETE,
			progress: 100,
		},
		{
			taskName: "task3",
			timeLimit: 10,
      timeElapsed: 0,
			status: Status.INCOMPLETE,
			progress: 100,
		},
	]

	const getTotalProgress = (tasks: Task[]) => {
		const totalPossible = tasks.length * 100
		const current = tasks.reduce((sum, task) => sum + task.progress, 0)
    const percent = current/totalPossible * 100
    return percent
	}

  useEffect(() => {
    dispatch(setTotalProgress(getTotalProgress(testTasks)))
  }, [testTasks])

	return (
		<View style={styles.container}>
			<Text variant="headlineLarge" style={styles.title}>
				Tasks
			</Text>

			{statusTypes.map((status) => {
				return (
					<View key={`${status}_header`}>
						<Text variant="titleLarge" style={styles.label}>
							{status}
						</Text>
						<ScrollView
							contentContainerStyle={styles.overviewScrollContainer}
							alwaysBounceHorizontal={false}
							showsHorizontalScrollIndicator={false}
							style={styles.overviewScroll}
							horizontal={true}
						>
							{testTasks
								.filter((task) => task.status === status)
								.map((task) => (
									<Card
										key={`${task.taskName}_card`}
										mode="contained"
										style={styles.overviewCard}
									>
										<Card.Content style={styles.cardContent}>
											<View style={styles.overviewCardText}>
												<Text variant="titleLarge">{task.taskName}</Text>
												<Text variant="titleMedium">{task.progress}%</Text>
											</View>
											<View
												style={[
													styles.progressOverlay,
													{ height: task.progress * HEIGHT_SCALE_FACTOR },
												]}
											/>
										</Card.Content>
									</Card>
								))}
						</ScrollView>
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
