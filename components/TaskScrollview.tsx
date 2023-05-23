// REACT
import React from "react"
import { ScrollView } from "react-native"

// STYLES
import styles from "../styles"

// REDUX
import { Status, Task } from "../reducers/taskSlice"

// COMPONENTS
import { TaskCard } from "./TaskCard"

export function TaskScrollview({
	status,
	tasks,
	getTaskProgress,
  navigation,
}: {
	status: Status
	tasks: Task[]
	getTaskProgress: (task: Task) => number
  navigation: any
}) {
	return (
		<ScrollView
			contentContainerStyle={styles.overviewScrollContainer}
			alwaysBounceHorizontal={false}
			showsHorizontalScrollIndicator={false}
			style={styles.overviewScroll}
			horizontal={true}
		>
			{tasks
				.filter((task) => task.status === status)
				.map((task, index) => (
					<TaskCard
						key={`${task.taskName}_${index}}_card`}
						getTaskProgress={getTaskProgress}
						task={task}
            navigation={navigation}
					/>
				))}
		</ScrollView>
	)
}
