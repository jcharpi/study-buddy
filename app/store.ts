// REDUX
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"

// STORAGE
import AsyncStorage from "@react-native-async-storage/async-storage"

// SLICES
import addTaskSlice from "../reducers/addTaskSlice"
import taskSlice from "../reducers/taskSlice"
import totalProgressSlice from "../reducers/totalProgressSlice"
import navigationSlice from "../reducers/navigationSlice"

const rootReducer = combineReducers({
  addTaskSlice: addTaskSlice,
	taskSlice: taskSlice,
	totalProgressSlice: totalProgressSlice,
  navigationSlice: navigationSlice
})

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
