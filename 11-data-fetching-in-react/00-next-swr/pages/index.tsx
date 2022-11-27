import { Container } from '@mantine/core';
import { Post } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
// const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const fetcher = (...args: Parameters<typeof fetch>) =>
	fetch(...args).then((res) => res.json());

export default function Home() {
	// const [posts, setPosts] = useState<Post[] | null>(null);
	// const getPosts = async () => {
	// 	const { data } = await axios('api/posts');
	// 	console.log(data);
	// 	setPosts(data);
	// };
	// useEffect(() => {
	// 	getPosts();
	// }, []);

	const { data: posts, error } = useSWR<Post[]>('api/posts', fetcher);
	if (error) return <div>failed to load</div>;
	return (
		<Container>
			<div className='flex flex-col space-y-4 min-h-screen'>
				<h1 className='text-4xl font-bold'>Posts</h1>
				{!posts && (
					<div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
						Loading posts...
					</div>
				)}
				{posts?.map((post) => (
					<Link href={`/posts/${post.id}`} key={post.id} className='no-underline '>
						<div className='flex flex-col space-y-2 bg-slate-200 p-2 rounded cursor-pointer text-black'>
							<h2 className='text-2xl font-bold  '>{post.title}</h2>
							<p>{post.content?.slice(0, 200)}...</p>
						</div>
					</Link>
				))}
			</div>
		</Container>
	);
}
