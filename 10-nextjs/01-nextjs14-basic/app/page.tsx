import { db } from '@/db/drizzle';
import { DataTable } from './data-table';
import { columns } from './columns';
import ClientForm from './ClientForm';

export default async function Home() {
	const todos = await db.query.Todo.findMany();
	return (
		<div className='flex flex-col min-h-screen container mx-auto py-10'>
			<div className='my-4'>
				<ClientForm />
			</div>
			<div>
				<DataTable columns={columns} data={todos} />
			</div>
		</div>
	);
}
