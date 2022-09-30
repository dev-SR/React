import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Motion from './component/Motion';

type Item = {
	id: number;
	checked: boolean;
	text: string;
};

const clsx = (...args: any[]) => {
	return args.filter(Boolean).join(' ');
};

type AddItemProp = {
	newItem: string;
	setNewItem: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const AddItem = ({ newItem, setNewItem, handleSubmit }: AddItemProp) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form onSubmit={handleSubmit}>
			<label className='block text-gray-700 text-xl font-bold mb-2'> Todo List </label>
			<div className='flex space-x-2'>
				<input
					autoFocus
					ref={inputRef}
					id='addItem'
					type='text'
					placeholder='Add Item'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-indigo-400  outline outline-2'
					required
					value={newItem}
					onChange={(e) => setNewItem(e.target.value)}
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

type SearchItemProps = {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchItem = ({ search, setSearch }: SearchItemProps) => {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<input
				type='text'
				id='search'
				placeholder='Search'
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-indigo-400 outline outline-2 '
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</form>
	);
};

type ListItemsProps = {
	items: Item[] | null;
	handleCheck: (id: number) => void;
	handleDelete: (id: number) => void;
};

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			type: 'tween',
			duration: 0.5,
			ease: 'easeInOut',
			staggerChildren: 0.3
		}
	}
};

const liVariants = {
	hidden: {
		opacity: 0
	},
	show: {
		opacity: 1
	}
};

// const liVariants = {
// 	hidden: { opacity: 0 },
// 	show: (custom: number) => ({
// 		opacity: 1,
// 		transition: {
// 			delay: custom
// 		}
// 	}),
// 	exit: {
// 		opacity: 0,
// 		x: -100
// 	}
// };

const ListItems = ({ items, handleCheck, handleDelete }: ListItemsProps) => {
	return (
		<motion.ul variants={container} initial='hidden' animate='show'>
			<AnimatePresence>
				{items?.length &&
					items.map((item) => (
						<motion.li
							key={item.id}
							layoutId={item.id.toString()}
							variants={liVariants}
							className='flex justify-between  rounded  mb-2 space-x-4'>
							<div className='flex bg-indigo-200 w-full p-2 shadow rounded-md'>
								<input
									type='checkbox'
									checked={item.checked}
									onChange={() => handleCheck(item.id)}
								/>
								<label
									className={clsx(
										'text-lg pl-2',
										item.checked && 'line-through text-gray-400'
									)}>
									{item.text}
								</label>
							</div>
							<button
								className='text-white font-bold bg-red-500 rounded px-4 text-xl'
								onClick={() => handleDelete(item.id)}>
								X
							</button>
						</motion.li>
					))}
			</AnimatePresence>
		</motion.ul>
	);
};

const TodoList = () => {
	const [items, setItems] = useState<Item[]>(JSON.parse(localStorage.getItem('items') || '[]'));
	//'[]' -> empty array(in json string format)

	const [newItem, setNewItem] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

	const handleCheck = (id: number) => {
		const newItems = items.map((item) =>
			item.id === id
				? {
						...item,
						checked: !item.checked
				  }
				: item
		);
		setItems(newItems);
	};

	const handleDelete = (id: number) => {
		const newItems = items.filter((item) => item.id !== id);
		setItems(newItems);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newItem) return;
		addItem(newItem);
		setNewItem('');
	};

	const addItem = (text: string) => {
		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const newItem = { id, checked: false, text };
		const newItems = [...items, newItem];
		setItems(newItems);
	};

	// const setAndSaveItems = (newItems: Item[]) => {
	//  setItems(newItems);
	//  localStorage.setItem('items', JSON.stringify(newItems));
	// };

	return (
		<div className='h-screen flex items-center justify-center flex-col'>
			<div className='w-1/2 flex flex-col space-y-4'>
				<AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
				<SearchItem search={search} setSearch={setSearch} />
				<ListItems
					items={items.filter((item) =>
						item.text.toLowerCase().includes(search.toLowerCase())
					)}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
				/>
			</div>
		</div>
	);
};

const App = () => {
	return <TodoList />;
	// return <Motion />;
};

export default App;
