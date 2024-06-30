'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useMyStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';

const AddToCart = ({ id }: { id: string }) => {
	const { addProduct, getProductById } = useMyStore(
		useShallow((state) => ({
			addProduct: state.addProduct,
			getProductById: state.getProductById
		}))
	);
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
