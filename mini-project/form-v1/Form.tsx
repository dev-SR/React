import Input from './components/Input';
import Select from './components/Select';
import CheckBox from './components/CheckBox';
import { useState } from 'react';

type FormState = {
	firstName: string;
	lastName: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	sendUpdates: boolean;
};

type FormContentType = {
	data: FormState;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => void;
};

const FormContent = ({ data, handleChange }: FormContentType) => {
	return (
		<div className='flex flex-col space-y-2 w-full'>
			<div className='flex w-full space-x-2 flex-grow'>
				<Input
					name='firstName'
					value={data.firstName}
					handleChange={handleChange}
					label='First Name'
					placeholder='Jhon'
					pattern='[A-Za-z]{1,32}'
					required
				/>
				<Input
					name='lastName'
					value={data.lastName}
					handleChange={handleChange}
					label='Last Name'
					placeholder='Doe'
					pattern='[A-Za-z]{1,32}'
					required
				/>
			</div>

			<Input
				name='address1'
				value={data.address1}
				handleChange={handleChange}
				label='Address'
				placeholder='Address 1'
				pattern='[A-Za-z]{1,32}'
				required
			/>
			<Input
				name='address2'
				value={data.address2}
				handleChange={handleChange}
				placeholder='Address 2'
				pattern='[A-Za-z]{1,32}'
			/>

			<Input
				name='city'
				value={data.city}
				handleChange={handleChange}
				label='City'
				placeholder='city'
				pattern='[A-Za-z]{1,32}'
				required
			/>
			<Select
				name='state'
				value={data.state}
				handleChange={handleChange}
				label='State'
				placeholder='state'
				pattern='[A-Za-z]{1,32}'
				required
				options={['CA', 'NY', 'TX']}
			/>
			<Input
				name='zip'
				value={data.zip}
				handleChange={handleChange}
				label='Zip'
				placeholder='zip'
				pattern='[A-Za-z]{1,32}'
				required
			/>
			<CheckBox
				name='sendUpdates'
				checked={data.sendUpdates}
				handleChange={handleChange}
				label='Get daily updates'
			/>
		</div>
	);
};

const classnames = (...args: any[]) => args.filter(Boolean).join(' ');

const Form = () => {
	const [data, setData] = useState<FormState>({
		firstName: '',
		lastName: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		zip: '',
		sendUpdates: false
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(JSON.stringify(data, null, 3));
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => {
		const type = e.target.type;
		const name = e.target.name;

		const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

		setData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const { address2, sendUpdates, ...requiredInputs } = data;
	// check if all required field are filled in
	const isAllRequiredFilled = [...Object.values(requiredInputs)].every(Boolean);
	// console.log(isAllRequiredFilled);

	return (
		<div className='flex justify-center items-center h-screen'>
			<form onSubmit={handleSubmit} className='w-1/2'>
				<h2 className='text-2xl font-bold pb-2'>Billing Info</h2>
				<FormContent data={data} handleChange={handleChange} />
				<button
					type='submit'
					disabled={!isAllRequiredFilled}
					className={classnames(
						'mt-2 p-2  rounded-md w-full',
						!isAllRequiredFilled && 'bg-gray-300 text-gray-500',
						isAllRequiredFilled && 'bg-indigo-500 text-white'
					)}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
