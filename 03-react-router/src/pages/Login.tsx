import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Login = () => {
	const navigate = useNavigate();

	const { isLogged, Login } = useAuth();

	useEffect(() => {
		if (isLogged) {
			navigate('/');
		}
	}, [isLogged]);

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(email, password);
		Login();
	};

	return (
		<div className='h-screen flex justify-center items-center'>
			<form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='username'
					onChange={(e) => setEmail(e.target.value)}
					className='h-8 w-64 rounded-md border-2 border-gray-200 pl-2'
				/>
				<input
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
					className='h-8 w-64 rounded-md border-2 border-gray-200 pl-2'
				/>
				<button type='submit' className='h-8 w-64 rounded-md border-2 border-indigo-200 pl-2'>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
