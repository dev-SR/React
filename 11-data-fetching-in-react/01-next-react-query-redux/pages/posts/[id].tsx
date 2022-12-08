import { useRouter } from 'next/router';
import React from 'react';
import { Comment, Post } from '@prisma/client';
import Link from 'next/link';
import { Container } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

const PostDetail = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: comments, isLoading: isCommentLoading } = useQuery<Comment[]>(
		[`/api/comments`, id],
		{
			queryFn: () => fetch(`/api/comments/${id}`).then((res) => res.json()),
			enabled: !!id // only fetch if id is defined
		}
	);

	const { data: post, isLoading: isPostLoading } = useQuery<Post>([`/api/posts`, id], {
		queryFn: () => fetch(`/api/posts/${id}`).then((res) => res.json()),
		enabled: !!id // only fetch if id is defined
	});

	return (
		<Container>
			<div>
				<Link href='/'>Home</Link>
			</div>
			{id}
			{isPostLoading && (
				<div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
					Loading post details...
				</div>
			)}
			{post && (
				<div>
					<h1 className='m-0'>{post.title}</h1>
					<p className='m-0'>{post.content}</p>
				</div>
			)}
			<div className='flex flex-col min-h-screen items-end'>
				<h1 className='text-2xl font-bold m-0'>Comments</h1>
				{isCommentLoading && (
					<div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
						Loading comment...
					</div>
				)}
				{comments &&
					comments.map((comment) => (
						<div key={comment.id}>
							<p className='m-0'>{comment.content}</p>
						</div>
					))}
			</div>
		</Container>
	);
};

export default PostDetail;
