import React from 'react';
import classnames from '../../libs/classnames';
interface ButtonProps extends React.ComponentProps<'button'> {
	// children: React.ReactNode;
	variant?: 'primary' | 'secondary';
}

const Button = ({ children, variant, ...props }: ButtonProps) => {
	return (
		<button
			className={classnames(
				'focus:outline-none focus:ring-2 ring-offset-1 text-white text-sm font-medium rounded-md px-4 py-2',
				variant === 'primary' &&
					'bg-primary hover:bg-primary-600 text-sm font-medium text-white ring-primary-300',
				variant === 'secondary' &&
					'bg-secondary hover:bg-secondary-600 text-sm font-medium text-white ring-secondary-300'
			)}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
