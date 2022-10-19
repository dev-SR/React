import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, addTodo, toggleTodo, deleteTodo } from '../state/todoSlice';
const classNames = (...classes: any[]) => classes.filter(Boolean).join(' ');

const Todo = () => {
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

export default Todo;
