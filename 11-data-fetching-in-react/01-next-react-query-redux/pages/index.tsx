import { ActionIcon, Container, Textarea } from '@mantine/core';
import Link from 'next/link';
import useSWR from 'swr';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import { classnames } from '../utils/classnames';
import { Pagination } from '@mantine/core';
import { prisma } from '../prisma';

import { Post } from '@prisma/client';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import {
	dehydrate,
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
	UseQueryResult
} from '@tanstack/react-query';
import { apiClient } from './_app';
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

type IPosts = {
	posts: OptimisticPost[];
	links: {
		nextPage: string | null;
		prevPage: string | null;
		hasMore: boolean;
		totalPages: number;
	};
};

interface IPost {
	id: string;
	title: string;
	content: string;
}
interface ICreatePerson {
	title: string;
	content: string;
}
const createPost = async (values: ICreatePerson) => {
	const res = await fetch('/api/posts', {
		method: 'POST',
		body: JSON.stringify(values),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return res.json();
};
const fetchPost = (activePage: number) => {
	return fetch(`/api/posts?page=${activePage}`).then((res) => res.json());
};
export default function Home() {
	const [activePage, setPage] = useState(1);

	const queryOptions: UseQueryOptions<IPosts, Error> = {
		queryKey: ['posts', activePage],
		queryFn: () => fetchPost(activePage)
		// using axios
		// queryFn: () => apiClient.get(`/api/posts?page=${activePage}`).then((res) => res.data),
	};

	const { data: _data, error: _error, status } = useQuery(queryOptions);
	// const result = useQuery({
	// 	queryKey: ['posts', 1],
	// 	queryFn: () => fetchPost(1)
	// });

	const queryClient = useQueryClient();

	const mutation = useMutation<IPost, Error, ICreatePerson>({
		mutationFn: (values) => createPost(values),
		// When mutate is called:
		onMutate: (values) => {
			// optimistically update the cache
			const OPTIMISTIC_POST: OptimisticPost = {
				id: String(Math.random()),
				title: values.title,
				content: values.content,
				createdAt: new Date(),
				updatedAt: new Date(),
				optimistic: true
			};
			queryClient.setQueryData<IPosts>(
				['posts', 1], // or ['posts', activePage]
				(oldData) => {
					return {
						posts: [OPTIMISTIC_POST, ...(oldData?.posts || [])],
						links: oldData?.links || {
							nextPage: null,
							prevPage: null,
							hasMore: false,
							totalPages: 0
						}
					};
				}
			);
		},
		// When the mutation is successful:
		onSuccess: (data) => {
			// Invalidate and refetch after successful mutation
			queryClient.invalidateQueries({
				queryKey: ['posts', 1] // or ['posts', activePage]
			});
		}
	});

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

	const addPost = async (values: typeof form.values) => {
		mutation.mutate(values);
	};

	const deletePost = async (id: string) => {
		await fetch(`/api/posts/${id}`, {
			method: 'DELETE'
		});
		queryClient.invalidateQueries({
			queryKey: ['posts', activePage]
		});
	};

	return (
		<Container>
			<div className='flex flex-col min-h-screen w-full '>
				<div style={{ minWidth: 400, marginTop: 20 }}>
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
				<div className='min-h-[400px] flex flex-col space-y-2'>
					<h1 className='text-2xl font-bold m-0'>Posts</h1>
					{status == 'loading' && (
						<div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
							Loading posts...
						</div>
					)}
					{_data?.posts?.map((post) => (
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
							<ActionIcon onClick={async () => deletePost(post.id)}>
								<MdDeleteForever className='h-8 w-8 text-red-500' />
							</ActionIcon>
						</div>
					))}
				</div>
				<Pagination
					page={activePage}
					onChange={setPage}
					total={_data?.links.totalPages as number}
					withEdges
				/>
			</div>
		</Container>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	let page = 1;
	if (context.query.page) {
		page = parseInt(context?.query?.page as string);
	}
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['posts', page], {
		queryFn: () =>
			fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?page=${page}`).then((res) => res.json())
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
}
