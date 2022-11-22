import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const fetchALLCars = createAsyncThunk('cars/getAPI', async () => {
	const response = await axios.get('http://localhost:4000/cars');
	return response.data;
});

export const saveNewCar = createAsyncThunk('cars/createAPI', async (payload) => {
	const response = await axios.post('http://localhost:4000/cars', payload);
	return response.data;
});

export const updateCar = createAsyncThunk<CarData, number>('cars/updateAPI', async (payload) => {
	const response = await axios.put(`http://localhost:4000/cars/${payload.id}`, payload);
	return response.data;
});

export const deleteCar = createAsyncThunk<number, number>('cars/deleteAPI', async (id) => {
	const response = await axios.delete(`http://localhost:4000/cars/${id}`);
	return id;
});

type CarData = {
	id: number;
	name: string;
};
type CarState = {
	carsData: CarData[];
	loading: string;
};

const initialState: CarState = {
	carsData: [],
	loading: 'idle'
};

const carslice = createSlice({
	name: 'cars',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchALLCars.pending, (state, action) => {
			state.loading = 'pending';
		});
		builder.addCase(fetchALLCars.fulfilled, (state, action) => {
			state.loading = 'idle';
			state.carsData = action.payload;
		});
		builder.addCase(saveNewCar.pending, (state, action) => {
			state.loading = 'pending';
		});
		builder.addCase(saveNewCar.fulfilled, (state, action) => {
			state.loading = 'idle';
			state.carsData.unshift(action.payload);
		});
		builder.addCase(updateCar.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(updateCar.fulfilled, (state, action) => {
			state.loading = 'idle';
			state.carsData = state.carsData.filter((_) => _.id !== action.payload.id);
			state.carsData.unshift(action.payload);
		});
		builder.addCase(deleteCar.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(deleteCar.fulfilled, (state, action: any) => {
			state.loading = 'idle';
			state.carsData = state.carsData.filter((item) => item.id !== action.payload);
		});
	}
});

export const getAllCars = (state: RootState) => state.carsItem.carsData;
export const getLoading = (state: RootState) => state.carsItem.loading;
export const getCarById = (id: number) => {
	return (state: RootState) => state.carsItem.carsData.filter((_) => _.id === id)[0];
};
export const carsReducer = carslice.reducer;
