'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useMyStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

const AddToCart = ({ id }: { id: string }) => {
	const { addProduct, getProductById, setTotalPrice } = useMyStore(
		useShallow((state) => ({
			addProduct: state.addProduct,
			getProductById: state.getProductById,
			setTotalPrice: state.setTotalPrice
		}))
	);

	useEffect(() => {
		const unsubscribe = useMyStore.subscribe(
			(state) => state.products,
			(products) => {
				setTotalPrice(products.reduce((acc, item) => acc + Number(item.price) * item.qty, 0));
			},
			{ fireImmediately: true }
		);

		return unsubscribe;
	}, [setTotalPrice]);

	return (
		<Button
			size={'sm'}
			onClick={async () => {
				const product = await getProductById(id);
				if (product) {
					const result = addProduct(product);
					if (result == 'new') toast.success(`"${product?.title}" Added to cart!'`);
					else toast.info(`"${product?.title}" already exits! Qty increased instead'`);
				} else {
					toast.error('Product not found!');
				}
			}}>
			Add to cart
		</Button>
	);
};

export default AddToCart;
