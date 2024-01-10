import Link from 'next/link';

export default function Home() {
	const products = [
		{ id: 1, name: 'Product 1', price: 100 },
		{ id: 2, name: 'Product 2', price: 200 },
		{ id: 3, name: 'Product 3', price: 300 }
	];
	return (
		<main className='flex min-h-screen flex-col p-24'>
			<div className='flex flex-col space-y-4 items-center'>
				{products.map((product) => (
					<Link
						key={product.id}
						href={`/product/${product.id}`}
						className='flex flex-col border-2 rounded p-4 '>
						<div className='text-2xl font-bold'>{product.name}</div>
						<div className='text-2xl font-bold'>{product.price}</div>
					</Link>
				))}
			</div>
		</main>
	);
}
