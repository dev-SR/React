import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post, Comment } from '@prisma/client';
import Link from 'next/link';
import { Container } from '@mantine/core';

const PostDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const [comments, setComments] = useState<Comment[]>();
	const [post, setPost] = useState<Post>();
	const getPost = async () => {
		const { data } = await axios(`/api/posts/${id}`);
		setPost(data);
	};
	const getComments = async () => {
		const { data } = await axios(`/api/comments/${id}`);
		setComments(data);
	};

	useEffect(() => {
		const getPostAndComments = async () => {
			await getPost();
			await getComments();
		};
		getPostAndComments();
	}, [id]);

	return (
		<Container>
			<div>
				<Link href='/'>Home</Link>
			</div>

			{id}
			{post && (
				<div>
					<h1 className='m-0'>{post.title}</h1>
					<p className='m-0'>{post.content}</p>
				</div>
			)}
			<div className='flex flex-col min-h-screen items-end'>
				<h1 className='text-2xl font-bold m-0'>Comments</h1>
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
