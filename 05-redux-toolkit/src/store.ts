import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoReducer } from './state/todoSlice';

const store = configureStore({
	reducer: {
		todos: todoReducer
	},
	devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
