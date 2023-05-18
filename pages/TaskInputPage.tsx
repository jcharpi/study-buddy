// REACT & EXPO
import { useState } from "react"
import { Alert, View } from "react-native"
import { IconButton, Text, TextInput } from "react-native-paper"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addTask, selectTasks } from "../reducers/taskSlice"

// STYLES
import styles from "../styles"
import Carousel from "react-native-reanimated-carousel"

export default function TaskInputPage() {
	const dispatch = useAppDispatch()
	const tasks = useAppSelector(selectTasks)
	const [taskName, setTaskName] = useState("")
	const [timeLimit, setTimeLimit] = useState("")
	const [timeLimitInputVisible, setTimeLimitInputVisible] = useState(false)

	function taskNameHandler() {
		if (taskName === "") {
			Alert.alert("Please enter a task name.")
		} else {
			setTimeLimitInputVisible(true)
		}
	}

	function addTaskHandler() {
		if (timeLimit === "") {
			Alert.alert("Please enter a time limit.")
		} else {
			dispatch(addTask({ taskName: taskName, timeLimit: parseInt(timeLimit) }))
			setTaskName("")
			setTimeLimit("")
			setTimeLimitInputVisible(false)
		}
	}

	const renderItem = ({
		item,
		index,} : any) => {
		const task = item
		return (
			<View
				style={{
					borderRadius: 5,
					borderWidth: 2,
					marginVertical: 20,
					padding: 10,
					backgroundColor: "white",
					width: "100%",
					height: 80,
					alignSelf: "center",
				}}
			>
				<Text style={{ fontSize: 30 }}>{task.taskName}</Text>
				<Text style={{ fontSize: 20 }}>
					{task.timeLimit} {task.timeLimit === 1 ? "minute" : "minutes"}
				</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text variant="titleLarge" style={styles.enterTaskTitle}>
				Good Morning!
			</Text>

			<View style={styles.task}>
      <Carousel
        loop
        vertical={true}
        width={100}
        height={100}
        style={{ width: "100%" }}
        data={tasks}
        pagingEnabled={true}
        onSnapToItem={index => console.log("current index:", index)}
        renderItem={renderItem}
      />
      </View>

			<TextInput
				activeOutlineColor="black"
				autoCapitalize="sentences"
				autoComplete="off"
				autoCorrect={true}
				clearButtonMode="while-editing"
				maxLength={25}
				mode="outlined"
				multiline={false}
				onChangeText={(taskName) => setTaskName(taskName)}
				onSubmitEditing={taskNameHandler}
				onEndEditing={taskNameHandler}
				outlineColor="black"
				outlineStyle={[
					styles.enterTaskOutline,
					{
						borderBottomLeftRadius: timeLimitInputVisible ? 0 : 9,
						borderBottomRightRadius: timeLimitInputVisible ? 0 : 9,
					},
				]}
				placeholder="Enter task name"
				selectionColor="black"
				style={[styles.enterTaskInput, { marginVertical: "10%" }]}
				value={taskName}
			/>
			<TextInput
				activeOutlineColor="black"
				clearButtonMode="while-editing"
				editable={timeLimitInputVisible}
				inputMode="numeric"
				keyboardType="numeric"
				maxLength={3}
				mode="outlined"
				multiline={false}
				onChangeText={(timeLimit) => setTimeLimit(timeLimit)}
				outlineColor="black"
				placeholder="Time limit in minutes"
				selectionColor="black"
				style={[
					styles.enterTaskInput,
					styles.enterTaskLimitInput,
					{ opacity: timeLimitInputVisible ? 1 : 0 },
				]}
				outlineStyle={[
					styles.enterTaskOutline,
					styles.enterTaskLimitInputOutline,
				]}
				value={timeLimit}
			/>
			<IconButton
				icon="plus"
				mode="contained"
				iconColor="white"
				size={50}
				containerColor="black"
				disabled={!timeLimitInputVisible}
				onPress={addTaskHandler}
				style={{ alignSelf: "center", marginTop: "5%", borderRadius: 9 }}
			/>
			<ExpoStatusBar style="auto" />
		</View>
	)
}
