import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/login';
import menuReducer from './slices/menu';
import entityReducer from './slices/entities';

import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: 'root',
	version: 5,
	storage: AsyncStorage,
};
const reducers = combineReducers({
	login: loginReducer,
	entity: entityReducer,
	menu: menuReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
	reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDespatch = typeof store.dispatch;
