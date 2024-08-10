'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { toast } from 'sonner';

import { CreatePost, ISuccessResponse, MyErrorResponse } from '@/lib/types';

import { AxiosError } from 'axios';
const AddPost = () => {
	const form = useForm<CreatePost>({
		// resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			title: '',
			body: ''
		}
	});

	const mutation = useMutation<ISuccessResponse, AxiosError<MyErrorResponse>, CreatePost>({
		mutationFn: async (newPost) => {
			const { data } = await apiClient.post('api/posts', newPost);
			return data;
		},
		onSuccess: ({ message }) => {
			form.reset();
			toast.success(message);
		},
		onError: (error) => {
			// toast.error(error.response?.data.error_message);
		}
	});

	function onSubmit(values: CreatePost) {
		mutation.mutate(values);
	}

	return (
		<Card className=''>
			<CardHeader>
				<CardTitle>Add Post</CardTitle>
				{mutation.isError && (
					<div className='p-4 border-2 border-red-300 rounded-lg bg-red-100 text-red-600 text-sm'>
						{mutation.error.response?.data.error_message}
					</div>
				)}
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='shadcn' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='body'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Body</FormLabel>
									<FormControl>
										<Textarea placeholder='shadcn' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Post</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default AddPost;
