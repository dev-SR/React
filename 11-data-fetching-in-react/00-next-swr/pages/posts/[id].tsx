import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Comment, Post } from '@prisma/client';
import Link from 'next/link';
import { Container } from '@mantine/core';
import useSWR from 'swr';
import axios from 'axios';
// const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const fetcher = (...args: Parameters<typeof fetch>) =>
	fetch(...args).then((res) => res.json());
const PostDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	// const [comments, setComments] = useState<Comment[]>();
	// const [post, setPost] = useState<Post>();
	// const getPost = async () => {
	// 	const { data } = await axios(`/api/posts/${id}`);
	// 	setPost(data);
	// };
	// const getComments = async () => {
	// 	const { data } = await axios(`/api/comments/${id}`);
	// 	setComments(data);
	// };

	// useEffect(() => {
	// 	const getPostAndComments = async () => {
	// 		await getPost();
	// 		await getComments();
	// 	};
	// 	getPostAndComments();
	// }, [id]);

	const { data: comments, error: commentsError } = useSWR<Comment[]>(`/api/comments/${id}`);
	if (commentsError) return <div>failed to load</div>;
	const { data: post, error: postError } = useSWR<Post>(`/api/posts/${id}`);
	if (postError) return <div>failed to load</div>;

	return (
		<Container>
			<div>
				<Link href='/'>Home</Link>
			</div>

			{id}
			{!post && (
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
				{!comments && (
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
