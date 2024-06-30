import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { TaskSlice, createTaskSlice } from './task-store';
import { CartSlice, createCartSlice } from './product-slice';

type Store = TaskSlice & CartSlice;

export const useMyStore = create<Store>()(
	devtools(
		persist(
			immer((...a) => ({
				...createTaskSlice(...a),
				...createCartSlice(...a)
			})),
			{ name: 'task_data' }
		),
		{ enabled: true }
	)
);
