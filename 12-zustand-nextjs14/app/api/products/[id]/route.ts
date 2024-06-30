import { db } from '@/db/drizzle';
export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const productId = params.id;

	if (!productId) {
		return new Response(JSON.stringify({ error: 'Product ID is required' }), { status: 400 });
	}

	try {
		const product = await db.query.Product.findFirst({
			where: (Product, { eq }) => eq(Product.id, productId)
		});

		if (!product) {
			return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
		}

		return new Response(JSON.stringify(product));
	} catch (error) {
		console.error('Failed to fetch product:', error);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	}
}
