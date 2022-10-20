import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
interface CartItem {
	id: number;
	productId: number;
	quantity: number;
	unitPrice: number;
	productName: string;
}
const dummyData: CartItem[] = [
	{
		id: 1,
		productId: 1,
		quantity: 1,
		unitPrice: 100,
		productName: 'Product 1'
	},
	{
		id: 2,
		productId: 2,
		quantity: 1,
		unitPrice: 200,
		productName: 'Product 2'
	}
];

export interface CartItemsState {
	cartItems: CartItem[];
	amount: number;
	// In `status` we will watch
	// if todos are being loaded.
	status: 'loading' | 'idle';

	// `error` will contain an error message.
	error: string | null;
}

const initialState: CartItemsState = {
	cartItems: [],
	status: 'idle',
	amount: 0,
	error: null
};

export const cartItemsSlice = createSlice({
	name: 'cartItems',
	initialState: initialState,
	reducers: {
		clearCart: (state: CartItemsState) => {
			state.cartItems = [];
		},
		removeItem: (state: CartItemsState, action: PayloadAction<number>) => {
			const id = action.payload;
			state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
		},
		increaseQuantity: (state: CartItemsState, action: PayloadAction<number>) => {
			const id = action.payload;
			const cartItem = state.cartItems.find((cartItem) => cartItem.id === id);
			if (cartItem) {
				cartItem.quantity++;
			}
		},
		decreaseQuantity: (state: CartItemsState, action: PayloadAction<number>) => {
			const id = action.payload;
			const cartItem = state.cartItems.find((cartItem) => cartItem.id === id);
			if (cartItem) {
				if (cartItem.quantity > 1) {
					cartItem.quantity--;
				}
			}
		},
		calculateTotal: (state: CartItemsState) => {
			state.amount = state.cartItems.reduce((total, cartItem) => {
				return total + cartItem.quantity * cartItem.unitPrice;
			}, 0);
		}
	}
});
// actions to dispatch
export const { clearCart, removeItem, increaseQuantity, decreaseQuantity, calculateTotal } =
	cartItemsSlice.actions;
// accessing state
export const selectCartItems = (state: RootState) => state.cartItems;
// reducer for configureStore
export const cartItemsReducer = cartItemsSlice.reducer;
