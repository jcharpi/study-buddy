import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import taskSlice from "../reducers/taskSlice"
import totalProgressSlice from "../reducers/totalProgressSlice"

import { combineReducers } from "@reduxjs/toolkit"

import AsyncStorage from "@react-native-async-storage/async-storage"
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
import addTaskSlice from "../reducers/addTaskSlice"

const rootReducer = combineReducers({
  addTaskSlice: addTaskSlice,
	taskSlice: taskSlice,
	totalProgressSlice: totalProgressSlice,
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
