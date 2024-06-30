import { db } from '@/db/drizzle';
export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request) {
	const products = await db.query.Product.findMany();
	// await 2 sec ; testing suspense Loading
	return new Response(JSON.stringify(products));
}
