import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { db } from '@/db/drizzle';
import AddToCart from './AddToCart';

const Products = async () => {
	const products = await db.query.Product.findMany();
	// await 2 sec ; testing suspense Loading
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return products.map((item) => (
		<Card key={item.id} className='w-96'>
			<CardHeader>
				<CardTitle className=''>{item.title}</CardTitle>
				<CardDescription>{item.description}</CardDescription>
			</CardHeader>

			<CardFooter className='flex w-full justify-between'>
				<span>${item.price}</span>
				<AddToCart id={item.id} />
			</CardFooter>
		</Card>
	));
};

export default Products;
