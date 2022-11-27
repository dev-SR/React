import { Container } from '@mantine/core';
import { Post } from '@prisma/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
	const [posts, setPosts] = useState<Post[] | null>(null);
	const getPosts = async () => {
		const { data } = await axios('api/posts');
		console.log(data);
		setPosts(data);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<Container>
			<div className='flex flex-col space-y-4 min-h-screen'>
				<h1 className='text-4xl font-bold'>Posts</h1>
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
