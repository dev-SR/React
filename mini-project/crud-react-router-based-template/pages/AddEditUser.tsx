import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const initialState = {
	name: '',
	email: '',
	contact: ''
};

const AddEditUser = () => {
	const [formValue, setFormValue] = useState(initialState);
	const [editMode, setEditMode] = useState(false);
	const { name, email, contact } = formValue;
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			setEditMode(true);
		} else {
			setEditMode(false);
		}
	}, [id]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!name && !email && !contact) {
			toast.error('Please provide value into each input field');
		} else {
			if (!editMode) {
				navigate('/');
				toast.success('Contact Added Successfully');
			} else {
				navigate('/');
				setEditMode(false);
				toast.success('Contact Updated Successfully');
			}
		}
	};

	const handleInputChange = (e: any) => {
		let { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};
	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					id='name'
					name='name'
					placeholder='Your Name...'
					value={name || ''}
					onChange={handleInputChange}
					className='border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500'
				/>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					id='email'
					name='email'
					placeholder='Your Email...'
					value={email || ''}
					onChange={handleInputChange}
					className='border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500'
				/>
				<label htmlFor='contact'>Contact</label>
				<input
					type='text'
					id='contact'
					name='contact'
					placeholder='Your Contact No. ...'
					value={contact || ''}
					onChange={handleInputChange}
					className='border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500'
				/>

				<input
					type='submit'
					value={id ? 'Update' : 'Save'}
					className='bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600'
				/>
			</form>
		</div>
	);
};

export default AddEditUser;
