import { formSchema } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
export async function GET(request: NextRequest) {
	const posts = [
		{
			userId: 1,
			id: 1,
			title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
			body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
		},
		{
			userId: 1,
			id: 2,
			title: 'qui est esse',
			body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
		},
		{
			userId: 1,
			id: 3,
			title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
			body: 'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut'
		}
	];

	// delay 2 sec
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return NextResponse.json(posts);
}

export async function POST(request: Request) {
	const body = await request.json();

	try {
		const parsedBody = formSchema.parse(body);
		// Perform actions with the validated data
		return NextResponse.json({ message: `Post created successfully!!` });
	} catch (error) {
		if (error instanceof ZodError) {
			// Handle Zod validation errors
			return NextResponse.json(
				{
					error_message: 'Validation error occurred'
				},
				{ status: 400 }
			);
		} else {
			return NextResponse.json({ error_message: 'An unexpected error occurred' }, { status: 500 });
		}
	}
}
