import React, { useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { useAppDispatch } from '../state/store';
import { addTodo, deleteTodo, fetchTodos, selectTodos, updateTodo } from '../state/todoSlice';
const clsx = (...args: any[]) => {
	return args.filter(Boolean).join(' ');
};

const AddItem = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputRef.current) {
			const value = inputRef.current.value;
			if (value) {
				dispatch(addTodo(value));
				inputRef.current.value = '';
				toast.success('Todo added');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label className='block text-gray-700 text-sm font-bold mb-2'> Todo List </label>
			<div className='flex space-x-2 mb-4'>
				<input
					autoFocus
					ref={inputRef}
					id='addItem'
					type='text'
					placeholder='Add Item'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-indigo-400 '
					required
				/>
				<button
					className=' bg-gray-300 rounded px-4 text-lg'
					onClick={() => inputRef.current?.focus()}>
					+
				</button>
			</div>
		</form>
	);
};

const ListItems = () => {
	const { items, status, error } = useSelector(selectTodos);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	let content: React.ReactElement = <div></div>;

	if (status === 'loading') {
		content = (
			<div>
				<BeatLoader color='#36d7b7' />
			</div>
		);
	} else if (status === 'idle' && !error) {
		content = (
			<ul className='mt-4'>
				{items?.length &&
					items.map((item) => (
						<li key={item.id} className='flex justify-between  rounded shadow mb-2 space-x-4'>
							<div className='flex bg-indigo-200 w-full p-2 rounded-md'>
								<input
									type='checkbox'
									checked={item.completed}
									onChange={() => {
										dispatch(
											updateTodo({
												id: item.id,
												completed: !item.completed,
												title: item.title
											})
										);
										toast.success('Todo Updated');
									}}
								/>
								<label
									className={clsx(
										'text-lg pl-2',
										item.completed && 'line-through text-gray-400'
									)}>
									{item.title}
								</label>
							</div>
							<button
								className='text-white font-bold bg-red-500 rounded px-4 text-xl'
								onClick={() => {
									dispatch(deleteTodo(item.id));
									toast.success('Item deleted');
								}}>
								X
							</button>
						</li>
					))}
			</ul>
		);
	} else if (error) {
		content = <div>{error}</div>;
	}

	return content;
};

const TodoList = () => {
	return (
		<div className='h-screen flex items-center justify-center flex-col'>
			<div className='w-1/2'>
				<AddItem />
				<ListItems />
			</div>
		</div>
	);
};
export default TodoList;
