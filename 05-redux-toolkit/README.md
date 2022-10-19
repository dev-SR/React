# Redux-Toolkit

- [Redux-Toolkit](#redux-toolkit)
	- [Core Concept](#core-concept)
	- [Resources](#resources)
	- [Installation](#installation)
	- [Basic Usage](#basic-usage)
		- [Store](#store)
		- [Provider](#provider)
		- [Slice](#slice)
			- [Using Slice](#using-slice)

## Core Concept

- `store` that holds the whole state tree of your application.
- `action` that describes what happened in the application.
  - *For example, a user clicked a button, or a network request returned some data.*
- `reducer` that determines how the state is updated in response to an action.
  - *For example, a reducer might increment a counter value in response to a click action.*

react-redux:

- `selector` that selects a slice of state from the store.
  - *For example, a selector might select a list of todos from the state.*


## Resources

- [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
- [https://www.youtube.com/watch?v=eFh2Kr9hfyo&t=680s](https://www.youtube.com/watch?v=eFh2Kr9hfyo&t=680s)
- [https://www.youtube.com/playlist?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3](https://www.youtube.com/playlist?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3)

## Installation

```bash
yarn add @reduxjs/toolkit react-redux react-router-dom

```

## Basic Usage

### Store

```ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
const store = configureStore({
 reducer: {},
 devTools: true
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
```

### Provider

`main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 // <React.StrictMode>
 <Provider store={store}>
  <App />
 </Provider>
 // </React.StrictMode>
);
```

### Slice

`state/todoSlice.ts`

```ts
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
```

#### Using Slice

Using `todoReducer` inside `store.ts`:

```ts
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
```

Using `Actions and Selectors` in tsx:

```tsx
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, selectTodos, deleteTodo } from './state/todoSlice';
const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ');
const App = () => {
	const todos = useSelector(selectTodos);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const addTodoHandler = () => {
		if (inputRef.current) {
			dispatch(addTodo(inputRef.current.value));
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			{todos.map((todo, index) => (
				<div key={todo.id} className='w-1/2 flex space-x-2'>
					<p
						className={classNames(todo.done && 'line-through')}
						onClick={() => dispatch(toggleTodo(todo.id))}>
						{index + 1}. {todo.text}
					</p>

					<div
						className='flex items-center justify-center w-7 h-7 rounded-full bg-red-500 cursor-pointer text-white'
						onClick={() => dispatch(deleteTodo(todo.id))}>
						X
					</div>
				</div>
			))}
			<input
				type='text'
				placeholder='Add todo'
				ref={inputRef}
				className='border border-gray-300 rounded-md p-2'
			/>
			<button onClick={addTodoHandler} className='bg-blue-500 text-white rounded-md p-2 mt-2'>
				Add Todo
			</button>
		</div>
	);
};

export default App;

```
