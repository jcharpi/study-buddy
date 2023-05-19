// REACT & EXPO
import { useRef } from "react"
import { Keyboard, Pressable, View } from "react-native"
import { Text, TextInput } from "react-native-paper"
import { ICarouselInstance } from "react-native-reanimated-carousel"
import * as Haptics from "expo-haptics"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
	addTask,
	selectTasks,
	setTaskName,
	setTasks,
	setTimeLimit,
} from "../reducers/taskSlice"

// STYLES
import styles from "../styles"

// PAGES
import MemoizedShapes from "../components/MemoizedShapes"
import { CarouselView } from "./../components/CarouselView"
import { InputButtonView } from "./../components/InputButtonView"

export default function TaskInputPage() {
	const dispatch = useAppDispatch()
	const tasks = useAppSelector(selectTasks).tasks
	const taskName = useAppSelector(selectTasks).taskName
	const timeLimit = useAppSelector(selectTasks).timeLimit

	const taskRef = useRef<ICarouselInstance>(null)
	const inputRef = useRef<ICarouselInstance>(null)

	function removeTaskByName(name: string) {
		dispatch(setTasks(tasks.filter((task) => task.taskName !== name)))
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
	}

	function inputHandler() {
		if (
			inputRef.current?.getCurrentIndex() === 0 &&
			(taskName === "" || timeLimit === "")
		) {
			inputRef.current?.next({ animated: true })
		} else {
			dispatch(addTask({ taskName: taskName.trim(), timeLimit: +timeLimit }))
			dispatch(setTaskName(""))
			dispatch(setTimeLimit(""))
			inputRef.current?.prev({ animated: true })
			Keyboard.dismiss()
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
		}
	}

	const renderTask = ({ item }: any) => {
		return (
			<Pressable
				onLongPress={() => removeTaskByName(item.taskName)}
				style={styles.task}
			>
				<Text style={{ fontSize: 25 }}>{item.taskName}</Text>
				<Text style={{ fontSize: 20 }}>
					{item.timeLimit} {item.timeLimit === 1 ? "minute" : "minutes"}
				</Text>
			</Pressable>
		)
	}

	const renderInput = ({ item }: any) => {
		return (
			<TextInput
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
				style={[styles.enterTaskInput]}
				value={item.state}
			/>
		)
	}

	return (
		<Pressable onPress={Keyboard.dismiss} style={styles.container}>
			<MemoizedShapes />

			<Text variant="headlineLarge" style={styles.enterTaskTitle}>
				Good Morning!
			</Text>

			<CarouselView
				taskRef={taskRef}
				renderTask={renderTask}
				inputRef={inputRef}
				renderInput={renderInput}
			/>

			<InputButtonView inputHandler={inputHandler} />
		</Pressable>
	)
}
