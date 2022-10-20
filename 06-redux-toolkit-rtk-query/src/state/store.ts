import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { contactsApi } from '../services/contactsApi';

const store = configureStore({
	reducer: {
		[contactsApi.reducerPath]: contactsApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApi.middleware),
	devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
