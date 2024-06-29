import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function NavBar() {
	return (
		<div className='bg-primary h-16 w-full flex items-center flex-row-reverse'>
			<div className='flex space-x-4 mr-20'>
				<Link href={'/'} className='text-white underline'>
					Home
				</Link>
				<Link href={'/products'} className='text-white underline'>
					Products
				</Link>
				<Link href={'/task'} className='text-white underline'>
					Task
				</Link>
				<ShoppingCart className='text-white' />
			</div>
		</div>
	);
}
