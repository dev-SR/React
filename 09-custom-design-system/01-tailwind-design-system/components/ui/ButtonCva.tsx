import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
const buttonStyles = cva(
	'focus:outline-none focus:ring-2 ring-offset-1 text-white text-sm font-medium rounded-md px-4 py-2',
	{
		variants: {
			variant: {
				primary: 'bg-primary hover:bg-primary-600 text-sm font-medium text-white ring-primary-300',
				secondary:
					'bg-secondary hover:bg-secondary-600 text-sm font-medium text-white ring-secondary-300'
			},
			fullWidth: {
				true: 'w-full'
			}
		},
		defaultVariants: {
			variant: 'primary'
		}
	}
);

interface Props extends VariantProps<typeof buttonStyles>, React.ComponentProps<'button'> {}

const Button = ({ children, variant, fullWidth, ...props }: Props) => {
	return (
		<button
			className={buttonStyles({
				variant,
				fullWidth
			})}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
