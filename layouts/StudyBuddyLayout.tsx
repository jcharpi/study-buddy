// REACT HOOKS & COMPONENTS
import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Text } from "react-native-paper"

// REDUX
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectTasks } from "../reducers/taskSlice"
import { selectNavigation, setInitialRouteName } from "../reducers/navigationSlice"

// PAGES
import TaskInputPage from "../pages/TaskInputPage"
import TaskOverviewPage from "../pages/TaskOverviewPage"

const Stack = createStackNavigator()

export default function StudyBuddyLayout() {
	// REDUX
  const dispatch = useAppDispatch()
	const tasks = useAppSelector(selectTasks)
  const initialRouteName = useAppSelector(selectNavigation).initialRouteName

	useEffect(() => {
		function getInitialRouteName() {
			const tasksExist: boolean = tasks.length > 0

			tasksExist
				? dispatch(setInitialRouteName("TaskOverviewPage"))
				: dispatch(setInitialRouteName("TaskInputPage"))
		}
		getInitialRouteName()
    console.log(initialRouteName)
	}, [tasks])

	if (!initialRouteName) {
		return <Text>Loading</Text>
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={initialRouteName}
				screenOptions={{
					headerShown: true,
				}}
			>
				<Stack.Screen name="TaskInputPage" component={TaskInputPage} />
				<Stack.Screen name="TaskOverviewPage" component={TaskOverviewPage} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}