'use client';

import { useMyStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const Cart = () => {
	const { products, removeProduct, increaseQty, decreaseQty, total, reset } = useMyStore(
		useShallow((state) => ({
			products: state.products,
			removeProduct: state.removeProduct,
			increaseQty: state.increaseQty,
			decreaseQty: state.decreaseQty,
			total: state.total,
			reset: state.reset
		}))
	);
	return (
		<div className=' flex flex-col space-y-4'>
			{products.map((product) => (
				<Card key={product.id}>
					<CardHeader>
						<CardTitle>{product.title}</CardTitle>
						<CardDescription>{product.description}</CardDescription>
					</CardHeader>
					<CardFooter>
						<div className='flex justify-between items-center w-full'>
							<div>Price: {product.price}</div>
							<div className='flex space-x-2  items-center'>
								<Button onClick={() => decreaseQty(product.id)}>-</Button>
								<p className='text-2xl'>{product.qty}</p>
								<Button onClick={() => increaseQty(product.id)}>+</Button>
								<Button onClick={() => removeProduct(product.id)} variant={'destructive'}>
									<Trash2 className='w-4 h-4' />
								</Button>
							</div>
						</div>
					</CardFooter>
				</Card>
			))}
			{products.length == 0 && <p className='text-2xl text-center'>Cart is empty</p>}
		</div>
	);
};

export default Cart;
