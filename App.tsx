// REACT & EXPO
import { useTheme } from 'react-native-paper'
import { Dimensions } from 'react-native'

// REDUX
import { persistor, store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

// PAGES
import TaskInputPage from './pages/TaskInputPage'

// STYLES
import EStyleSheet from 'react-native-extended-stylesheet'
import AsyncStorage from '@react-native-async-storage/async-storage'


const height = Dimensions.get("screen").height

const rem = height > 830 ? 24 : 19


EStyleSheet.build({
  $rem: rem
})

export default function App() {
  const theme = useTheme()
	theme.colors.secondaryContainer = "transparent"
  theme.colors.background = "white"
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TaskInputPage />
      </PersistGate>
    </Provider>
  );
}
