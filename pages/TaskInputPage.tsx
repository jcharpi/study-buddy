// REACT & EXPO
import { ScrollView, View } from "react-native"
import { Text, TextInput } from "react-native-paper"
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar"

// STYLES
import styles from "../styles"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addTask, selectTasks } from "../reducers/taskSlice"

export default function TaskInputPage() {
	const dispatch = useAppDispatch()
	const tasks = useAppSelector(selectTasks)
	const [text, setText] = useState("")

	return (
		<View style={styles.container}>
			<Text variant="titleLarge" style={styles.enterTaskTitle}>
				Good Morning!
			</Text>

			<ScrollView bounces={false} style={styles.enterTaskLayout}>
				{tasks.map((task, index) => {
					return (
						<TextInput
              key={`${task.taskName}${index}`}
							editable={false}
							maxLength={25}
							multiline={false}
							mode="outlined"
							dense={false}
							outlineColor="black"
							activeOutlineColor="black"
							selectionColor="black"
							value={task.taskName}
							style={[styles.enterTaskInput, { marginVertical: -4 }]}
							outlineStyle={[
								styles.enterTaskOutline,
								{
									borderTopLeftRadius: index === 0 ? 9 : 0,
									borderTopRightRadius: index === 0 ? 9 : 0,
									borderBottomLeftRadius: index === tasks.length - 1 ? 9 : 0,
									borderBottomRightRadius: index === tasks.length - 1 ? 9 : 0,
								},
							]}
						/>
					)
				})}
				<TextInput
					autoCapitalize="sentences"
					autoComplete="off"
					autoCorrect={true}
					clearButtonMode="while-editing"
					maxLength={25}
					multiline={false}
					placeholder="Enter task name"
					mode="outlined"
					dense={false}
					outlineColor="black"
					activeOutlineColor="black"
					selectionColor="black"
					value={text}
					onChangeText={(text) => setText(text)}
          onSubmitEditing={() => dispatch(addTask(text))}
					style={[styles.enterTaskInput, {marginVertical: "10%"}]}
					outlineStyle={styles.enterTaskOutline}
				/>
			</ScrollView>

			<ExpoStatusBar style="auto" />
		</View>
	)
}
