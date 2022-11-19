import React from 'react';

interface ButtonProps extends React.ComponentProps<'button'> {
	// children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
			{children}
		</button>
	);
};

export default Button;
