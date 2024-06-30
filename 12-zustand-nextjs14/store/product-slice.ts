import { InferSelectModel } from 'drizzle-orm';
import { Product } from '@/db/schema';

import { StateCreator } from 'zustand';

export type ProductType = InferSelectModel<typeof Product>;
export type CartProduct = ProductType & { qty: number };

export type CartState = {
	products: CartProduct[];
	totalPrice: number;
};
export type CartActions = {
	addProduct: (product: CartProduct) => 'new' | 'existing';
	removeProduct: (productId: string) => void;
	increaseQty: (productId: string) => void;
	decreaseQty: (productId: string) => void;
	getProductById: (productId: string) => Promise<CartProduct | undefined>;
	setTotalPrice: (total: number) => void;
	reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
	products: [],
	totalPrice: 0
};

export const createCartSlice: StateCreator<CartSlice, [['zustand/immer', never]], [], CartSlice> = (
	set,
	get
) => ({
	...initialState,
	increaseQty: (productId) =>
		set((state) => {
			const foundProduct = state.products.find((product) => product.id === productId);
			if (foundProduct) {
				foundProduct.qty += 1;
			}
		}),
	decreaseQty: (productId) =>
		set((state) => {
			const foundIndex = state.products.findIndex((product) => product.id === productId);

			if (foundIndex != -1) {
				if (state.products[foundIndex].qty === 1) {
					state.products.splice(foundIndex, 1);
				} else {
					state.products[foundIndex].qty -= 1;
				}
			}
		}),
	addProduct: (product: CartProduct) => {
		let result: 'new' | 'existing' = 'new';
		set((state) => {
			const existingProduct = state.products.find((p) => p.id === product.id);
			if (existingProduct) {
				existingProduct.qty += 1;
				result = 'existing';
			} else {
				state.products.push(product);
			}
		});
		return result;
	},
	removeProduct: (productId: string) =>
		set((state) => {
			state.products = state.products.filter((product) => product.id !== productId);
		}),
	getProductById: async (productId: string) => {
		const existingProduct = get().products.find((product) => product.id === productId);
		if (existingProduct) {
			return existingProduct;
		}

		try {
			const response = await fetch(`http://localhost:3000/api/products/${productId}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const product: ProductType = await response.json();
			return { ...product, qty: 1 } as CartProduct;
		} catch (error) {
			console.error('Failed to fetch product:', error);
			return undefined;
		}
	},
	setTotalPrice: (total: number) =>
		set((state) => {
			state.totalPrice = total;
		}),
	reset: () => set(() => initialState)
});
