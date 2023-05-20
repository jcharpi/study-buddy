// REACT & EXPO
import { useRef } from "react"
import { Keyboard, Pressable } from "react-native"
import { Text, TextInput } from "react-native-paper"
import { ICarouselInstance } from "react-native-reanimated-carousel"
import * as Haptics from "expo-haptics"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  Status,
	addTask,
	selectTasks,
	setTasks,
} from "../reducers/taskSlice"
import { selectAddTask, setTaskName, setTimeLimit } from "../reducers/addTaskSlice"

// STYLES
import styles from "../styles"

// PAGES
import MemoizedShapes from "../components/MemoizedShapes"
import { CarouselView } from "./../components/CarouselView"
import { InputButtonView } from "./../components/InputButtonView"

export default function TaskInputPage() {
	const dispatch = useAppDispatch()
	const tasks = useAppSelector(selectTasks)
  const taskToAdd = useAppSelector(selectAddTask)

	const taskRef = useRef<ICarouselInstance>(null)
	const inputRef = useRef<ICarouselInstance>(null)

	function removeTaskByName(name: string) {
		dispatch(setTasks(tasks.filter((task) => task.taskName !== name)))
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
	}

	function inputHandler() {
		if (
			inputRef.current?.getCurrentIndex() === 0 &&
			(taskToAdd.taskName === "" || taskToAdd.timeLimit === 0)
		) {
			inputRef.current?.next({ animated: true })
		} else {
			dispatch(addTask(taskToAdd))
			dispatch(setTaskName(""))
			dispatch(setTimeLimit("0"))
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
				returnKeyType={taskToAdd.taskName !== "" && taskToAdd.timeLimit !== 0 ? "done" : "next"}
				maxLength={20}
				mode="outlined"
				multiline={false}
				onChangeText={(state) => item.setState(state)}
				onSubmitEditing={inputHandler}
				outlineColor="black"
				outlineStyle={[styles.enterTaskOutline]}
				placeholder={item.placeholder}
				style={[styles.enterTaskInput]}
				value={item.state === "0" ? "" : item.state}
			/>
		)
	}

	return (
		<Pressable onPress={Keyboard.dismiss} style={styles.container}>
			<MemoizedShapes />

			<Text variant="headlineLarge" style={styles.title}>
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
