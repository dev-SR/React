'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import apiClient from '@/lib/axios';
import { Post } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

const Posts = () => {
	const { data, isLoading, isError } = useQuery<Post[]>({
		queryKey: ['posts'],
		queryFn: async () => {
			const { data } = await apiClient.get(`api/posts`);
			return data;
		}
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	return data?.map((post, i) => (
		<Card key={i}>
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardContent>{post.body}</CardContent>
		</Card>
	));
};

export default Posts;
