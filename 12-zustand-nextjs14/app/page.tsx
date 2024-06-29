import { db } from '@/db/drizzle';

export default async function Home() {
	const users = await db.query.User.findMany();
	return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
