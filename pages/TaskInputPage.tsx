// REACT & EXPO
import { useEffect, useRef, useState } from "react"
import { Keyboard, Pressable, View } from "react-native"
import { IconButton, Text, TextInput } from "react-native-paper"
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"
import * as Haptics from "expo-haptics"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addTask, selectTasks, setTasks } from "../reducers/taskSlice"

// STYLES
import styles from "../styles"

interface Input {
	inputMode: string
	placeholder: string
	state: string
	setState: React.Dispatch<React.SetStateAction<string>>
}

export default function TaskInputPage() {
	const dispatch = useAppDispatch()
	const tasks = useAppSelector(selectTasks)
	const [taskName, setTaskName] = useState("")
	const [timeLimit, setTimeLimit] = useState("")
	const taskRef = useRef<ICarouselInstance>(null)
	const inputRef = useRef<ICarouselInstance>(null)

	const input: Input[] = [
		{
			inputMode: "text",
			placeholder: "Enter task name",
			state: taskName,
			setState: setTaskName,
		},
		{
			inputMode: "numeric",
			placeholder: "Time limit in minutes",
			state: timeLimit,
			setState: setTimeLimit,
		},
	]

  function removeTaskByName(name: string) {
    dispatch(setTasks(tasks.filter(task => task.taskName !== name)))
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

	function inputHandler() {
		if (
			inputRef.current?.getCurrentIndex() === 0 &&
			(taskName === "" || timeLimit === "")
		) {
			inputRef.current?.next({ animated: true })
		} else {
			dispatch(addTask({ taskName: taskName.trim(), timeLimit: parseInt(timeLimit) }))
			setTaskName("")
			setTimeLimit("")
			inputRef.current?.prev({ animated: true })
			Keyboard.dismiss()
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
		}
	}

  const renderTask = ({ item, index }: any) => {
		return (
			<Pressable onLongPress={() => removeTaskByName(item.taskName)} style={styles.task}>
				<Text style={{ fontSize: 25 }}>{item.taskName}</Text>
				<Text style={{ fontSize: 15 }}>
					{item.timeLimit} {item.timeLimit === 1 ? "minute" : "minutes"}
				</Text>
			</Pressable>
		)
	}

	const renderInput = ({ item, index }: any) => {
		return (
			<TextInput
				activeOutlineColor="black"
				autoCapitalize="sentences"
				autoComplete="off"
				clearButtonMode="while-editing"
				inputMode={item.inputMode}
				caretHidden={item.inputMode === "numeric"}
				returnKeyType={taskName !== "" && timeLimit !== "" ? "done" : "next"}
				maxLength={20}
				mode="outlined"
				multiline={false}
				onChangeText={(state) => item.setState(state)}
				onSubmitEditing={inputHandler}
				outlineColor="black"
				outlineStyle={[styles.enterTaskOutline]}
				placeholder={item.placeholder}
				selectionColor="black"
				style={[styles.enterTaskInput]}
				value={item.state}
			/>
		)
	}

	useEffect(() => {
		setTimeout(() => {
			taskRef.current?.scrollTo({
				index: tasks.length - 1,
				animated: false,
			})
		}, 100)
	}, [tasks])

	return (
		<View style={styles.container}>
			<Text variant="headlineLarge" style={styles.enterTaskTitle}>
				Good Morning!
			</Text>

			<View style={styles.taskContainer}>
				<Carousel
					loop
          enabled={tasks.length > 1}
					ref={taskRef}
					vertical={true}
					autoPlay={tasks.length > 1}
					autoPlayInterval={2100}
					height={130}
					data={tasks}
					pagingEnabled={true}
					overscrollEnabled={false}
					snapEnabled={true}
					onSnapToItem={(index) => {}}
					renderItem={renderTask}
				/>
			</View>
			<View style={styles.taskContainer}>
				<Carousel
					loop={false}
					ref={inputRef}
					vertical={false}
					height={70}
					width={320}
					data={input}
					pagingEnabled={true}
					overscrollEnabled={false}
					snapEnabled={true}
					onSnapToItem={(index) => {}}
					renderItem={renderInput}
				/>
			</View>

			<View style={{flexDirection:"row", alignSelf:"center", gap: 5}}>
				<IconButton
					icon="plus"
					mode="contained"
					iconColor="white"
					size={45}
					containerColor="black"
					disabled={taskName === "" || timeLimit === ""}
					onPress={inputHandler}
					style={{ borderRadius: 9, width: 140 }}
				/>
				<IconButton
					icon="arrow-right"
					mode="contained"
					iconColor="white"
					size={45}
					containerColor="black"
					disabled={tasks.length === 0 || taskName !== "" || timeLimit !== ""}
					onPress={() => {}}
					style={{ borderRadius: 9, width: 140 }}
				/>
			</View>
		</View>
	)
}
