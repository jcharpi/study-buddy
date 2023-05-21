// REACT
import React from "react"
import { View } from "react-native"
import { IconButton } from "react-native-paper"

// REDUX
import { useAppSelector } from "../app/hooks"
import { selectTasks } from "../reducers/taskSlice"
import { selectAddTask } from "../reducers/addTaskSlice"

// STYLES
import styles from "../styles"

export function InputButtonView({
	inputHandler,
  navigation
}: {
	inputHandler: () => void,
  navigation: any
}) {
	const tasks = useAppSelector(selectTasks)
	const task = useAppSelector(selectAddTask)

	return (
		<View style={styles.buttonContainer}>
			<IconButton
				icon="plus"
				mode="contained"
				iconColor="white"
				size={45}
				containerColor="black"
				disabled={task.taskName === "" || task.timeLimit === 0}
				onPress={inputHandler}
				style={{
					borderRadius: 9,
					width: 140,
				}}
			/>
			<IconButton
				icon="arrow-right"
				mode="contained"
				iconColor="white"
				size={45}
				containerColor="black"
				disabled={tasks.length === 0 || task.taskName !== "" || task.timeLimit !== 0}
				onPress={() => navigation.navigate("TaskOverviewPage")}
				style={{
					borderRadius: 9,
					width: 140,
				}}
			/>
		</View>
	)
}
