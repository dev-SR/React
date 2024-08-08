import { db } from '@/db';
import { DataTable } from './data-table';
import { columns } from './columns';
const ListTable = async () => {
	try {
		const todos = await db.query.Todo.findMany();
		return <DataTable columns={columns} data={todos} />;
	} catch (error) {
		return <div>Error fetching data.</div>;
	}
};

export default ListTable;
