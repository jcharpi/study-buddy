// REACT
import React from "react"
import { Pressable, View } from "react-native"
import { Card, Text } from "react-native-paper"

// STYLES
import styles from "../styles"

// REDUX
import { Task } from "../reducers/taskSlice"

export function TaskCard({
	getTaskProgress,
	task,
	navigation,
}: {
	getTaskProgress: (task: Task) => number
	task: Task
	navigation: any
}) {
	const HEIGHT_SCALE_FACTOR = 1.5

	return (
		<Pressable
			onPress={
				getTaskProgress(task) > 99
					? () => {}
					: () => navigation.navigate("TaskActivePage", { task })
			}
		>
			<Card mode="contained" style={styles.overviewCard}>
				<Card.Content style={styles.cardContent}>
					<View style={styles.overviewCardText}>
						<Text variant="titleLarge">{task.taskName}</Text>
						<Text variant="titleMedium">{getTaskProgress(task)}%</Text>
					</View>
					<View
						style={[
							styles.progressOverlay,
							{
								height: getTaskProgress(task) * HEIGHT_SCALE_FACTOR,
							},
						]}
					/>
				</Card.Content>
			</Card>
		</Pressable>
	)
}
