import { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type User = {
	name: string;
	id: string;
};
const UserList = () => {
	console.log('Render: App');

	const [users, setUsers] = useState<User[]>([
		{ id: 'a', name: 'Robin' },
		{ id: 'b', name: 'Dennis' }
	]);

	const [text, setText] = useState('');

	const handleText = (event: ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	const handleAddUser = () => {
		setUsers(users.concat({ id: uuidv4(), name: text }));
	};

	const handleRemove = useCallback(
		(id: string) => setUsers(users.filter((user) => user.id !== id)),
		[users]
	);

	return (
		<div className='flex flex-col space-y-2'>
			<div className='flex space-x-2'>
				<input
					type='text'
					value={text}
					onChange={handleText}
					className='border-2 border-gray-300 rounded-md px-4 py-2'
				/>
				<button
					type='button'
					onClick={handleAddUser}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					Add User
				</button>
			</div>

			<List list={users} onRemove={handleRemove} />
		</div>
	);
};

type ListType = {
	list: User[];
	onRemove: (id: string) => void;
};

const List = memo(({ list, onRemove }: ListType) => {
	console.log('Render: List');

	return (
		<ul className='flex  flex-col space-y-2'>
			{list.map((item) => (
				<ListItem key={item.id} item={item} onRemove={onRemove} />
			))}
		</ul>
	);
});
type ListItemType = {
	item: User;
	onRemove: (id: string) => void;
};
const ListItem = memo(({ item, onRemove }: ListItemType) => {
	console.log('Render: ListItem');

	return (
		<li>
			<div className='flex space-x-2 items-center'>
				<span>{item.name}</span>
				<button
					type='button'
					onClick={() => onRemove(item.id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
					X
				</button>
			</div>
		</li>
	);
});

const functionCounter = new Set();

const Example = () => {
	const [userInput, setUserInput] = useState('');
	const [n1] = useState(1);
	const [n2] = useState(2);

	const sum = useCallback(() => n1 + n2, [n1, n2]);
	// const sum = () => n1 + n2;

	functionCounter.add(sum);
	useEffect(() => {
		console.log(`New sum: ${sum()} | functionCounter: ${functionCounter.size}`);
	}, [sum]);

	return (
		<div>
			<input
				type='text'
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
				className='border-2 border-gray-300 rounded-md px-4 py-2'
			/>
		</div>
	);
};

const App = () => {
	return (
		<div className='flex h-screen justify-center items-center'>
			<UserList />
		</div>
	);
};
export default App;
