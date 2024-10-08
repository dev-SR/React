# Nextjs14 + ReactQueryV5

- [Nextjs14 + ReactQueryV5](#nextjs14--reactqueryv5)
	- [Setup](#setup)
	- [Query Basic](#query-basic)
	- [Mutation Basic](#mutation-basic)


## Setup

Install dependencies:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools axios
```

`lib\rquery-provider.tsx`

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
```

`layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import ReactQueryProvider from '@/lib/rquery-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
				<ReactQueryProvider>
					{children}
					<Toaster richColors />
				</ReactQueryProvider>
			</body>
		</html>
	);
}

```

Next.js env loader: `pnpm install @next/env`

```ts
import axios from 'axios';
// console.log("apiClient:",process.env.BASE_URL);

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export default apiClient;
```


## Query Basic


```tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import apiClient from '@/lib/axios';
import { Post } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

const Posts = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			const { data } = await apiClient.get(`api/posts`);
			return data as Post[];
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
```


## Mutation Basic

Example route:

```typescript
export async function POST(request: Request) {
	const body = await request.json();
	try {
		const parsedBody = formSchema.parse(body);
		// Perform actions with the validated data
		return NextResponse.json({ message: `Post created successfully!!` });
	} catch (error) {
		if (error instanceof ZodError) {
			// Handle Zod validation errors
			return NextResponse.json(
				{
					error_message: 'Validation error occurred'
				},
				{ status: 400 }
			);
		} else {
			return NextResponse.json({ error_message: 'An unexpected error occurred' }, { status: 500 });
		}
	}
}
```




```tsx
'use client';
import { z } from 'zod';
export const formSchema = z.object({
	title: z.string().min(1),
	body: z.string().min(1)
});
export type CreatePost = z.infer<typeof formSchema>;
export type ISuccessResponse = {
	message: string;
};
export type MyErrorResponse = {
	error_message: string;
};
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

```