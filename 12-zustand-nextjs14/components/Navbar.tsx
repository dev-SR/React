'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import Cart from '@/app/products/Cart';
import { useMyStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';

export default function NavBar() {
	const products = useMyStore(useShallow((state) => state.products));
	return (
		<div className='bg-primary h-16 w-full flex items-center flex-row-reverse'>
			<div className='flex space-x-4 mr-20 items-center'>
				<Link href={'/'} className='text-white underline'>
					Home
				</Link>
				<Link href={'/products'} className='text-white underline'>
					Products
				</Link>
				<Link href={'/task'} className='text-white underline'>
					Task
				</Link>

				<Sheet>
					<SheetTrigger>
						<div className='relative'>
							<span className=' absolute -top-2 right-0  w-4 h-4  rounded-full bg-red-500 text-xs text-white text-center'>
								{products.length}
							</span>
							<ShoppingCart className='text-white' />
						</div>
					</SheetTrigger>
					<SheetContent className='w-[800px] sm:w-[800px]'>
						<SheetHeader>
							<SheetTitle>Cart</SheetTitle>
							<SheetDescription>
								<Cart />
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
