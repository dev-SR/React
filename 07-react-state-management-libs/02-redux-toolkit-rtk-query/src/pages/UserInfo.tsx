import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { useGetSingleContactQuery } from '../services/contactsApi';

const UserInfo = () => {
	const { id } = useParams();
	const { data, error, isLoading, isSuccess } = useGetSingleContactQuery(Number(id));
	useEffect(() => {
		if (error) {
			toast.error('Something went wrong');
		}
	}, [error]);

	let content: React.ReactNode = <></>;
	if (isLoading) {
		content = <BeatLoader color='#36d7b7' />;
	} else if (error) {
		content = <p className='text-center text-2xl text-red-500 font-semibold'>Failed to fetch</p>;
	} else if (isSuccess && data) {
		content = (
			<div className='flex flex-col justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<div className='flex flex-col justify-center items-center'>
					<p className='text-2xl font-bold text-gray-800'>User Contact Detail</p>
				</div>
				<div>
					<strong>ID: </strong>
					<span>{id}</span>
					<br />
					<br />
					<strong>Name: </strong>
					<span>{data.name}</span>
					<br />
					<br />
					<strong>Email: </strong>
					<span>{data.email}</span>
					<br />
					<br />
					<strong>Contact: </strong>
					<span>{data.contact}</span>
					<br />
					<br />
					<Link to='/'>
						<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Go Back
						</button>
					</Link>
				</div>
			</div>
		);
	}

	return <div className='flex flex-col justify-center items-center h-screen'>{content}</div>;
};

export default UserInfo;
