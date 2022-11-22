import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export type Todo = {
	id: number;
	title: string;
	completed: boolean;
};

type TodoSliceState = {
	status: 'loading' | 'idle';
	error: string | null;
	items: Todo[];
};
// createAsyncThunk<ReturnedType, PayloadType>
export const fetchTodos = createAsyncThunk<Todo[]>(
	'todos/fetch',
	async (payload: any, thunkAPI) => {
		try {
			const response = await axios.get<Todo[]>('http://localhost:3500/todos');
			return response.data;
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);
export const deleteTodo = createAsyncThunk<number, number>(
	'todos/delete',
	async (id: number, thunkAPI) => {
		try {
			await axios.delete<number>(`http://localhost:3500/todos/${id}`);
			return id;
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);
export const addTodo = createAsyncThunk<Todo, string>(
	'todos/add',
	async (title: string, thunkAPI) => {
		try {
			const state = thunkAPI.getState() as RootState;
			const items = state.todos.items;

			const id = items.length ? items[items.length - 1].id + 1 : 1;
			const newItem = { id, completed: false, title };
			const response = await axios.post<Todo>(`http://localhost:3500/todos`, newItem);
			return response.data;
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);
export const updateTodo = createAsyncThunk<Todo, Todo>(
	'todos/update',
	async (todo: Todo, thunkAPI) => {
		try {
			const response = await axios.put<Todo>(`http://localhost:3500/todos/${todo.id}`, todo);
			return response.data;
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

const initialState: TodoSliceState = {
	items: [],
	status: 'idle',
	error: null
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state: TodoSliceState) => {
				state.status = 'loading';
			})
			.addCase(fetchTodos.fulfilled, (state: TodoSliceState, action: PayloadAction<Todo[]>) => {
				state.status = 'idle';
				state.items = action.payload;
			})
			.addCase(fetchTodos.rejected, (state: TodoSliceState, action: PayloadAction<any>) => {
				state.status = 'idle';
				state.error = action.payload;
			})
			.addCase(deleteTodo.pending, (state: TodoSliceState) => {
				state.status = 'loading';
			})
			.addCase(deleteTodo.fulfilled, (state: TodoSliceState, action: PayloadAction<number>) => {
				state.status = 'idle';
				state.items = state.items.filter((todo) => todo.id !== action.payload);
			})
			.addCase(deleteTodo.rejected, (state: TodoSliceState, action: PayloadAction<any>) => {
				state.status = 'idle';
				state.error = action.payload;
			})
			.addCase(addTodo.pending, (state: TodoSliceState) => {
				state.status = 'loading';
			})
			.addCase(addTodo.fulfilled, (state: TodoSliceState, action: PayloadAction<Todo>) => {
				state.status = 'idle';
				state.items.push(action.payload);
			})
			.addCase(addTodo.rejected, (state: TodoSliceState, action: PayloadAction<any>) => {
				state.status = 'idle';
				state.error = action.payload;
			})
			.addCase(updateTodo.pending, (state: TodoSliceState) => {
				state.status = 'loading';
			})
			.addCase(updateTodo.fulfilled, (state: TodoSliceState, action: PayloadAction<Todo>) => {
				state.status = 'idle';
				state.items = state.items.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo
				);
			})
			.addCase(updateTodo.rejected, (state: TodoSliceState, action: PayloadAction<any>) => {
				state.status = 'idle';
				state.error = action.payload;
			});
	}
});
// accessing state
export const selectTodos = (state: RootState) => state.todos;
// reducer for configureStore
export const todoReducer = todoSlice.reducer;
