import { InputProps, RestProps } from './type-def';
const classnames = (...args: any[]) => args.filter(Boolean).join(' ');

const Select = ({
	name,
	label,
	value,
	type = 'text',
	handleChange,
	options = [],
	required = false,
	disabled,
	...other
}: InputProps & RestProps) => {
	console.log(required);

	return (
		<div className='flex flex-col space-y-2 w-full '>
			{label && <label htmlFor={name}>{label}</label>}
			<select
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				className={classnames(
					' border-2 border-gray-300 rounded-md px-4 py-2 outline-none  w-full',
					disabled && 'bg-gray-200 cursor-not-allowed',
					!disabled && 'hover:border-gray-400 focus:border-blue-500 focus:outline-none'
				)}
				{...other}>
				{options &&
					options.map((op) => (
						<option value={op} key={op}>
							{op}
						</option>
					))}
			</select>
		</div>
	);
};
export default Select;
