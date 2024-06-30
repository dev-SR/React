import Products from './Products';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
	return (
		<div className='flex min-h-screen flex-col items-center  w-full space-y-4'>
			<div className='mt-4 text-2xl'>Products</div>
			<Suspense fallback={<div>Loading...</div>}>
				<Products />
			</Suspense>
		</div>
	);
}
