// REACT & EXPO
import { useTheme } from "react-native-paper"
import { Dimensions } from "react-native"

// REDUX
import { persistor, store } from "./app/store"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"

// STYLES
import EStyleSheet from "react-native-extended-stylesheet"
import AsyncStorage from "@react-native-async-storage/async-storage"
import StudyBuddyLayout from "./layouts/StudyBuddyLayout"

const height = Dimensions.get("screen").height

const rem = height > 830 ? 24 : 19

EStyleSheet.build({
	$rem: rem,
})

export default function App() {
  AsyncStorage.clear()
  const theme = useTheme()
	theme.colors.primary = "black"
	theme.colors.secondaryContainer = "transparent"
	theme.colors.background = "white"

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<StudyBuddyLayout/>
			</PersistGate>
		</Provider>
	)
}
