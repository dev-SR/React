import { useParams, Link } from 'react-router-dom';

const UserInfo = () => {
	const { id } = useParams();
	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<div className='flex flex-col justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<div className='flex flex-col justify-center items-center'>
					<p className='text-2xl font-bold text-gray-800'>User Contact Detail</p>
				</div>
				<div>
					<strong>ID: </strong>
					<span>1</span>
					<br />
					<br />
					<strong>Name: </strong>
					<span>Test</span>
					<br />
					<br />
					<strong>Email: </strong>
					<span>test@gmail.com</span>
					<br />
					<br />
					<strong>Contact: </strong>
					<span>775675673</span>
					<br />
					<br />
					<Link to='/'>
						<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Go Back
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
