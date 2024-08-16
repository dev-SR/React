import { Suspense } from 'react';
import ClientForm from './ClientForm';
import ListTable from './ListTable';
import db from '@/lib/prisma';

export default async function Home() {
	const p = await db.post.findMany();
	console.log(p);

	return (
		<div className='flex flex-col min-h-screen container mx-auto py-10'>
			<div className='my-4'>
				<ClientForm />
			</div>
			<div>
				<Suspense fallback={<div>Loading...</div>}>
					<ListTable />
				</Suspense>
			</div>
		</div>
	);
}
