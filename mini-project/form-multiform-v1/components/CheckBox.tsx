import { CheckBoxProps, RestProps } from './type-def';

const CheckBox = ({ name, label, checked, handleChange, ...other }: CheckBoxProps & RestProps) => {
	return (
		<div className='flex space-x-2 items-center'>
			<input
				type='checkbox'
				name={name}
				id={name}
				checked={checked}
				onChange={handleChange}
				{...other}
			/>
			<span>{label && label}</span>
		</div>
	);
};
export default CheckBox;
