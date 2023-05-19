// REACT
import React from "react"
import { View } from "react-native"
import { IconButton } from "react-native-paper"

// REDUX
import { useAppSelector } from "../app/hooks"
import { selectTasks } from "../reducers/taskSlice"

// STYLES
import styles from "../styles"

export function InputButtonView({
	inputHandler,
}: {
	inputHandler: () => void
}) {
	const tasks = useAppSelector(selectTasks).tasks
	const taskName = useAppSelector(selectTasks).taskName
	const timeLimit = useAppSelector(selectTasks).timeLimit

	return (
		<View style={styles.buttonContainer}>
			<IconButton
				icon="plus"
				mode="contained"
				iconColor="white"
				size={45}
				containerColor="black"
				disabled={taskName === "" || timeLimit === ""}
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
				disabled={tasks.length === 0 || taskName !== "" || timeLimit !== ""}
				onPress={() => {}}
				style={{
					borderRadius: 9,
					width: 140,
				}}
			/>
		</View>
	)
}
