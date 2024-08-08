import { Suspense } from 'react';
import ClientForm from './ClientForm';
import ListTable from './ListTable';

export default async function Home() {
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
