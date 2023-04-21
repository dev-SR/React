import Link from 'next/link';
import { prisma } from '~/lib/prisma';
import Posts from './Posts';
import getQueryClient from './query/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import Hydrate from './query/HydrateClient';

const getPosts = async () => {
	const posts = await prisma.post.findMany();
	return JSON.parse(JSON.stringify(posts));
	// Warning: Only plain objects can be passed to Client Components from Server Components.
};

export default async function Home() {
	const queryClient = getQueryClient(); //not useQueryClient
	await queryClient.prefetchQuery(['posts'], getPosts);
	const dehydratedState = dehydrate(queryClient);

	return (
		<main className='p-12'>
			<h1 className='text-4xl font-bold'>Welcome</h1>
			<Link href={'/dashboard'} className='text-blue-700'>
				Go to dashboard 🎯
			</Link>
			<div className=' space-y-2 w-1/2 mx-auto'>
				<Hydrate state={dehydratedState}>
					<Posts />
				</Hydrate>
			</div>
		</main>
	);
}
