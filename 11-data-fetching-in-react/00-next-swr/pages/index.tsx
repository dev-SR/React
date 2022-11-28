import { ActionIcon, Container, Textarea } from '@mantine/core';
import Link from 'next/link';
import useSWR from 'swr';
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import { classnames } from '../utils/classnames';

import { Post } from '@prisma/client';
type OptimisticPost = Post & { optimistic?: boolean };

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
	const { data: posts, error, mutate } = useSWR<OptimisticPost[]>('api/posts');
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
		mutate([OPTIMISTIC_POST, ...(posts as OptimisticPost[])], false);
		// Send request to server
		await axios.post('api/posts', values);
		// revert optimistic update and revalidate with server data
		mutate();
	};

	return (
		<Container>
			<div className='flex flex-col space-y-4 min-h-screen w-full'>
				<div className='h-20' />
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
				<h1 className='text-4xl font-bold'>Posts</h1>
				{!posts && (
					<div className='border-2 border-yellow-500 p-2 rounded border-solid bg-yellow-100 font-bold'>
						Loading posts...
					</div>
				)}
				{posts?.map((post) => (
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
								<h2 className='text-2xl font-bold '>{post.title}</h2>
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
		</Container>
	);
}
