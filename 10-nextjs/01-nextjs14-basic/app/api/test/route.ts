import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
// 	const token = request.headers.get('token');
// 	// const token = request.cookies.get('token');
// 	const user = {
// 		name: 'Jhon',
// 		role: 'Admin',
// 		token,
// 	};
// 	return NextResponse.json(user, {
// 		status: 200,
// 		headers: { 'Set-Cookie': `token=${token}; sameSite=strict; httpOnly=true; maxAge=60*60*24` }
// 	});
// }

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	console.log(searchParams);

	const query = searchParams.get('query');
	const categories = searchParams.getAll('category'); // Get all values for 'category'
	const prices = searchParams.getAll('price'); // Get all values for 'price'

	return NextResponse.json({ query, categories, prices });
}

import { z, ZodError } from 'zod';

const userSchema = z.object({
	name: z.string().min(3),
	email: z.string().email()
});

export async function POST(request: NextRequest) {
	const body = await request.json();

	try {
		const parsedBody = userSchema.parse(body);
		// Perform actions with the validated data
		return NextResponse.json({ message: `User ${parsedBody.name} created successfully` });
	} catch (error) {
		if (error instanceof ZodError) {
			// Handle Zod validation errors
			return NextResponse.json(
				{
					errors: error.errors.map((e) => ({
						path: e.path[0],
						message: e.message
					}))
				},
				{ status: 400 }
			);
		} else {
			return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
		}
	}
}
