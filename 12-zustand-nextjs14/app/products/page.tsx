import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { db } from '@/db/drizzle';

export default async function Home() {
	const products = await db.query.Product.findMany();
	return (
		<div className='flex min-h-screen flex-col items-center justify-center w-full space-y-4'>
			<div className='mt-4 text-2xl'>Products</div>
			{products.map((item) => (
				<Card key={item.id} className='w-96'>
					<CardHeader>
						<CardTitle className=''>{item.title}</CardTitle>
						<CardDescription>{item.description}</CardDescription>
					</CardHeader>

					<CardFooter className='flex w-full justify-between'>
						<span>${item.price}</span>

						<Button size={'sm'}>Add to cart</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
