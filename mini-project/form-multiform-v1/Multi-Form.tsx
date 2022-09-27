import { useMultiStepFormContext } from './context/MultiStepContext';
const classnames = (...args: any[]) => args.filter(Boolean).join(' ');
import Input from './components/Input';
import Select from './components/Select';
import CheckBox from './components/CheckBox';

const MultiForm = () => {
	const {
		title,
		page,
		setPage,
		handleSubmit,
		canSubmit,
		disablePrev,
		disableNext,
		hidePrev,
		hideNext,
		hideSubmit
	} = useMultiStepFormContext();

	const handleNext = () => setPage((prev) => prev + 1);
	const handlePrev = () => setPage((prev) => prev - 1);

	return (
		<div className='flex justify-center items-center h-screen'>
			<form onSubmit={handleSubmit} className='w-1/2'>
				<div className='flex justify-between mb-4'>
					<h2 className='text-2xl font-bold pb-2'>{title[page]}</h2>
					<div className='flex space-x-2'>
						<button
							type='button'
							onClick={handlePrev}
							disabled={disablePrev}
							className={classnames(
								'px-4 py-2 rounded-md',
								hidePrev && 'hidden',
								disablePrev && 'cursor-not-allowed bg-gray-200',
								!disablePrev && 'bg-indigo-500 text-white'
							)}>
							Prev
						</button>
						<button
							type='button'
							onClick={handleNext}
							disabled={disableNext}
							className={classnames(
								'px-4 py-2 rounded-md',
								hideNext && 'hidden',
								disableNext && 'cursor-not-allowed bg-gray-200 text-gray-500',
								!disableNext && 'bg-indigo-500 text-white'
							)}>
							Next
						</button>

						<button
							type='submit'
							disabled={!canSubmit}
							className={classnames(
								'px-4 py-2 rounded-md',
								hideSubmit && 'hidden',
								!canSubmit && 'cursor-not-allowed bg-gray-200 text-gray-500',
								canSubmit && 'bg-indigo-500 text-white'
							)}>
							Submit
						</button>
					</div>
				</div>

				<FormInputs />
			</form>
		</div>
	);
};

const FormInputs = () => {
	const { page } = useMultiStepFormContext();
	switch (page) {
		case 0:
			return <Billing />;
		case 1:
			return <Shipping />;
		case 2:
			return <SendUpdates />;
		default:
			return <div>Thank you for your submission</div>;
	}
};

const Billing = () => {
	const { data, handleChange } = useMultiStepFormContext();

	return (
		<div className='flex flex-col space-y-2 w-full'>
			<div className='flex w-full space-x-2 flex-grow'>
				<Input
					name='billFirstName'
					value={data.billFirstName}
					handleChange={handleChange}
					label='First Name'
					placeholder='Jhon'
					pattern='[A-Za-z]{1,32}'
					required
				/>
				<Input
					name='billLastName'
					value={data.billLastName}
					handleChange={handleChange}
					label='Last Name'
					placeholder='Doe'
					pattern='[A-Za-z]{1,32}'
					required
				/>
			</div>

			<Input
				name='billAddress1'
				value={data.billAddress1}
				handleChange={handleChange}
				label='Address'
				placeholder='Address 1'
				pattern='[A-Za-z]{1,32}'
				required
			/>
			<Input
				name='billAddress2'
				value={data.billAddress2}
				handleChange={handleChange}
				placeholder='Address 2'
				pattern='[A-Za-z]{1,32}'
			/>

			<Input
				name='billCity'
				value={data.billCity}
				handleChange={handleChange}
				label='City'
				placeholder='city'
				pattern='[A-Za-z]{1,32}'
				required
			/>
			<Select
				name='billState'
				value={data.billState}
				handleChange={handleChange}
				label='State'
				placeholder='state'
				pattern='[A-Za-z]{1,32}'
				required
				options={['CA', 'NY', 'TX']}
			/>
			<Input
				name='billZip'
				value={data.billZip}
				handleChange={handleChange}
				label='Zip'
				placeholder='billZip'
				pattern='[A-Za-z]{1,32}'
				required={true}
			/>
		</div>
	);
};

const Shipping = () => {
	const { data, handleChange } = useMultiStepFormContext();

	return (
		<div className='flex flex-col space-y-2 w-full'>
			<CheckBox
				name='sameAsBilling'
				checked={data.sameAsBilling}
				handleChange={handleChange}
				label='Same as Billing Info'
			/>
			<div className='flex w-full space-x-2 flex-grow'>
				<Input
					name='shipFirstName'
					value={data.shipFirstName}
					handleChange={handleChange}
					label='First Name'
					placeholder='Jhon'
					pattern='[A-Za-z]{1,32}'
					required
					disabled={data.sameAsBilling}
				/>
				<Input
					name='shipLastName'
					value={data.shipLastName}
					handleChange={handleChange}
					label='Last Name'
					placeholder='Doe'
					pattern='[A-Za-z]{1,32}'
					required
					disabled={data.sameAsBilling}
				/>
			</div>

			<Input
				name='shipAddress1'
				value={data.shipAddress1}
				handleChange={handleChange}
				label='Shipping Address'
				placeholder='Shipping Address 1'
				pattern='[A-Za-z]{1,32}'
				required
				disabled={data.sameAsBilling}
			/>
			<Input
				name='shipAddress2'
				value={data.shipAddress2}
				handleChange={handleChange}
				placeholder='Shipping Address 2'
				pattern='[A-Za-z]{1,32}'
				disabled={data.sameAsBilling}
			/>

			<Input
				name='shipCity'
				value={data.shipCity}
				handleChange={handleChange}
				label='City'
				placeholder='city'
				pattern='[A-Za-z]{1,32}'
				required
				disabled={data.sameAsBilling}
			/>
			<Select
				name='shipState'
				value={data.shipState}
				handleChange={handleChange}
				label='State'
				placeholder='state'
				pattern='[A-Za-z]{1,32}'
				required
				options={['CA', 'NY', 'TX']}
				disabled={data.sameAsBilling}
			/>
			<Input
				name='shipZip'
				value={data.shipZip}
				handleChange={handleChange}
				label='Zip'
				placeholder='billZip'
				pattern='[A-Za-z]{1,32}'
				required
				disabled={data.sameAsBilling}
			/>
		</div>
	);
};

const SendUpdates = () => {
	const { data, handleChange } = useMultiStepFormContext();
	return (
		<div className='flex flex-col space-y-2 w-full'>
			<CheckBox
				name='sendUpdates'
				checked={data.sendUpdates}
				handleChange={handleChange}
				label='Receive our newsletter by email'
			/>
			<a href='/save'>Save 10% Now</a>
		</div>
	);
};

export default MultiForm;
