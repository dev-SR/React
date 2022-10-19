import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Todo {
	id: number;
	done: boolean;
	text: string;
}
interface TodoSliceState {
	todos: Todo[];
}

const initialState: TodoSliceState = {
	todos: []
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState: initialState,
	reducers: {
		addTodo: (state: TodoSliceState, action: PayloadAction<string>) => {
			state.todos.push({
				id: state.todos.length,
				done: false,
				text: action.payload
			});
		},
		toggleTodo: (state: TodoSliceState, action: PayloadAction<number>) => {
			state.todos[action.payload].done = !state.todos[action.payload].done;
		},
		deleteTodo: (state: TodoSliceState, action: PayloadAction<number>) => {
			// state.todos.splice( action.payload, 1 );
			//or
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		}
	}
});
// actions to dispatch
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
// accessing state
export const selectTodos = (state: RootState) => state.todos.todos;
// reducer for configureStore
export const todoReducer = todoSlice.reducer;
