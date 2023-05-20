// REACT
import { ScrollView, View } from "react-native"
import { Card, Text } from "react-native-paper"

// REDUX
import { Status, selectTasks } from "../reducers/taskSlice"
import { useAppSelector } from "../app/hooks"

// STYLES
import styles from "../styles"

export default function TaskOverviewPage() {
	const tasks = useAppSelector(selectTasks).tasks
	const statusTypes = Object.values(Status)

	const HEIGHT_SCALE_FACTOR = 1.5
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
							{tasks
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
		</View>
	)
}
