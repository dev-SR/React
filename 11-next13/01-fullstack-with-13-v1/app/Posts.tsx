'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { PostType } from '~/types/Post';

const getPosts = async () => {
	const { data } = await axios.get<PostType[]>('/api/posts');

	return data;
};
const deleteHandler = async (id: string) => {
	const { data } = await axios.delete(`/api/posts/${id}`);
	return data;
};

const Posts = () => {
	const { data: posts } = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts
	});
	const queryClient = useQueryClient(); //not getQueryClient

	// Normal Delete
	const deletePost = async (id: string) => {
		deleteHandler(id);
		queryClient.invalidateQueries({ queryKey: ['posts'] });
	};
	// Or
	const deleteMutation1 = useMutation({
		mutationFn: deleteHandler,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		}
	});

	// Vs: Optimistic Delete
	const deleteMutation2 = useMutation({
		mutationFn: deleteHandler,
		onMutate: async (id: string) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ['posts'] });
			// Snapshot the previous value
			const previousPosts = queryClient.getQueryData<PostType[]>(['posts']);
			// Optimistic update the data
			if (previousPosts) {
				queryClient.setQueryData(
					['posts'],
					previousPosts.filter((post) => post.id !== id)
				);
			}
			// Return the snapshotted value
			return { previousPosts };
		},
		onError: (err, variables, context) => {
			if (context?.previousPosts) {
				queryClient.setQueryData(['posts'], context.previousPosts);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		}
	});

	return (
		<div className='flex flex-col space-y-4'>
			{posts?.map((post) => (
				<Card key={post.id}>
					<CardHeader>
						<CardTitle>{post.title}</CardTitle>
						<CardDescription>{post.content}</CardDescription>
						<div className='flex w-full justify-end'>
							<Button variant='destructive' onClick={() => deleteMutation2.mutate(post.id)}>
								Delete
							</Button>
						</div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
};

export default Posts;