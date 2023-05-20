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
}: {
	inputHandler: () => void
}) {
	const tasks = useAppSelector(selectTasks)
	const taskName = useAppSelector(selectAddTask).taskName
	const timeLimit = useAppSelector(selectAddTask).timeLimit

	return (
		<View style={styles.buttonContainer}>
			<IconButton
				icon="plus"
				mode="contained"
				iconColor="white"
				size={45}
				containerColor="black"
				disabled={taskName === "" || timeLimit === 0}
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
				disabled={tasks.length === 0 || taskName !== "" || timeLimit !== 0}
				onPress={() => {}}
				style={{
					borderRadius: 9,
					width: 140,
				}}
			/>
		</View>
	)
}
