import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const data = [
	{
		name: 'Adam Marcus',
		email: 'adam123@gmail.com',
		contact: '83673677367635',
		id: 1
	},
	{
		name: 'Tom Cruise',
		email: 'tom@gmail.com',
		contact: '83786646476',
		id: 2
	},
	{
		name: 'James Bond',
		email: 'james@gmail.com',
		contact: '9484785787',
		id: 3
	}
];

const Home = () => {
	const handleDelete = async (id: any) => {
		if (window.confirm('Are you sure that you wanted to delete that user ?')) {
			toast.success('Contact Deleted Successfully');
		}
	};
	return (
		<div className='flex flex-col h-screen justify-center items-center'>
			<h2 className='text-2xl font-bold text-gray-700 mb-4'>
				Redux Toolkit RTK Query CRUD with React and JSON Server{' '}
			</h2>
			<Link to='/add'>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					Add Contact
				</button>
			</Link>
			<br />
			<br />
			<div className='overflow-x-auto relative'>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='ext-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='py-3 px-6 text-center'>
								ID
							</th>
							<th scope='col' className='py-3 px-6 text-center'>
								Name
							</th>
							<th scope='col' className='py-3 px-6 text-center'>
								Email
							</th>
							<th scope='col' className='py-3 px-6 text-center'>
								Contact
							</th>
							<th scope='col' className='py-3 px-6 text-center'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item: any, index: any) => {
								return (
									<tr
										key={item.id}
										className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
										<th
											scope='row'
											className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
											{index + 1}
										</th>
										<td className='py-4 px-6'>{item.name}</td>
										<td className='py-4 px-6'>{item.email}</td>
										<td className='py-4 px-6'>{item.contact}</td>
										<td className='py-4 px-6'>
											<div className='flex w-full space-x-2'>
												<Link to={`/update/${item.id}`}>
													<button className='bg-blue-500 hover:bg-blue-700 text-white text-xs  py-2 px-4 rounded'>
														Edit
													</button>
												</Link>
												<button
													className='bg-red-500 hover:bg-red-700 text-white text-xs py-2 px-4 rounded'
													onClick={() => handleDelete(item.id)}>
													Delete
												</button>
												<Link to={`/view/${item.id}`}>
													<button className='bg-green-500 hover:bg-green-700 text-white text-xs py-2 px-4 rounded'>
														View
													</button>
												</Link>
											</div>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Home;
