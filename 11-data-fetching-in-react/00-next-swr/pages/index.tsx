import { ActionIcon, Container, Textarea } from '@mantine/core';
import Link from 'next/link';
import useSWR from 'swr';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import { classnames } from '../utils/classnames';
import { Pagination } from '@mantine/core';

import { Post } from '@prisma/client';
import { useState } from 'react';
type OptimisticPost = Post & { optimistic?: boolean };

type PostResponse = {
	posts: OptimisticPost[];
	links: {
		nextPage: string | null;
		prevPage: string | null;
		hasMore: boolean;
		totalPages: number;
	};
};

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

	const form = useForm({
		initialValues: {
			title: '',
			content: ''
		},
		validate: {
			title: (value) => (value.length > 0 ? null : 'Title is required'),
			content: (value) => (value.length > 0 ? null : 'Content is required')
		}
	});
	const [activePage, setPage] = useState(1);

	const { data, error, mutate } = useSWR<PostResponse>(`/api/posts?page=${activePage}`);
	if (error) return <div>failed to load</div>;
	const addPost = async (values: typeof form.values) => {
		// Optimistic update
		const OPTIMISTIC_POST: OptimisticPost = {
			id: String(Math.random()),
			title: values.title,
			content: values.content,
			createdAt: new Date(),
			updatedAt: new Date(),
			optimistic: true
		};
		mutate(
			{
				posts: [OPTIMISTIC_POST, ...(data?.posts || [])],
				links: data?.links || {
					nextPage: null,
					prevPage: null,
					hasMore: false,
					totalPages: 1
				}
			},
			false
		);
		// Send request to server
		await axios.post('api/posts', values);
		// revert optimistic update and revalidate with server data
		mutate();
	};
	console.log(data);

	return (
		<Container>
			<div className='flex flex-col space-y-2 min-h-screen w-full'>
				<div style={{ minWidth: 400, margin: 'auto' }}>
					<form onSubmit={form.onSubmit((values) => addPost(values))}>
						<TextInput
							withAsterisk
							label='Title'
							placeholder='Title'
							{...form.getInputProps('title')}
						/>
						<Textarea
							withAsterisk
							label='Content'
							placeholder='content'
							{...form.getInputProps('content')}
						/>
						<Group position='right' mt='md'>
							<Button type='submit'>Submit</Button>
						</Group>
					</form>
				</div>
				<div className='min-h-[400px]'>
					<h1 className='text-4xl font-bold m-0'>Posts</h1>
					{!data?.posts && (
						<div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
							Loading posts...
						</div>
					)}
					{data?.posts?.map((post) => (
						<div
							className='flex w-full items-center'
							key={post.id}
							style={post.optimistic ? { opacity: 0.5 } : {}}>
							<Link href={`/posts/${post.id}`} className='no-underline w-full'>
								<div
									className={classnames(
										'flex flex-col space-y-2 p-2 rounded cursor-pointer text-black w-full ',
										post.optimistic && 'bg-yellow-200',
										!post.optimistic && 'bg-gray-200 hover:bg-gray-300'
									)}>
									<h2 className='text-2xl font-bold m-0 '>{post.title?.slice(0, 50)}...</h2>
									<p>{post.content?.slice(0, 200)}...</p>
								</div>
							</Link>
							<ActionIcon
								onClick={async () => {
									await axios.delete(`api/posts/${post.id}`);
									mutate();
								}}>
								<MdDeleteForever className='h-8 w-8 text-red-500' />
							</ActionIcon>
						</div>
					))}
				</div>
				<Pagination
					page={activePage}
					onChange={setPage}
					total={data?.links.totalPages as number}
					withEdges
				/>
				;
			</div>
		</Container>
	);
}
