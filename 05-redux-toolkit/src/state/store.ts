import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cartItemsReducer } from './cartItemsSlice';
import { todoReducer } from './todoSlice';
import { carsReducer } from './carslice';
const store = configureStore({
	reducer: {
		todos: todoReducer,
		cartItems: cartItemsReducer
	},
	devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
// enable thunk type support
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
