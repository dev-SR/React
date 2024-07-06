# Nextjs Basic


- [Nextjs Basic](#nextjs-basic)
	- [Next with shadcn](#next-with-shadcn)
	- [Drizzle setup](#drizzle-setup)
	- [Dynamic Route](#dynamic-route)
	- [Loading ui and suspense](#loading-ui-and-suspense)
	- [Server Action](#server-action)
		- [Server action inside client components](#server-action-inside-client-components)
		- [Server action inside client components with - `next-safe-action`](#server-action-inside-client-components-with---next-safe-action)


## Next with shadcn

- [https://nextjs.org/docs/app/api-reference/create-next-app](https://nextjs.org/docs/app/api-reference/create-next-app)
- [https://ui.shadcn.com/docs/installation/next](https://ui.shadcn.com/docs/installation/next)

```bash
pnpm create next-app@latest --typescript --tailwind --eslint --app
pnpm dlx shadcn-ui@latest init

```

## Drizzle setup

Loading env for drizzle in next.js

Install

```bash
pnpm add drizzle-orm postgres @next/env
pnpm add -D drizzle-kit @faker-js/faker
```

`lib\config.ts`

```typescript
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());
```

1. Defile drizzle config

`drizzle.config.ts`

```typescript
import '@/lib/config';
import { defineConfig } from 'drizzle-kit';
// console.log(process.env.DATABASE_URL);

export default defineConfig({
	schema: './db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	verbose: true,
	strict: true
});
```

2. Define schema:

```typescript
import { pgTable, pgEnum, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin', 'guest']);

export const User = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	email: text('email'),
	password: text('password'),
	role: roleEnum('role').default('user').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
```

3. Define query client:

```typescript
import '@/lib/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });
```

4. Define commands:

```json
{
   "scripts": {
        "pg:push": "drizzle-kit push",
        "pg:drop": "drizzle-kit drop",
        "pg:studio": "drizzle-kit studio",
        "pg:generate-migration": "drizzle-kit generate",
        "pg:migrate": "drizzle-kit migrate",
		"pg:seed": "npx tsx db/seed.ts"
  },
}
```

5. Seeding script:

```typescript
import { faker } from '@faker-js/faker';
import { User } from './schema';
import { db } from './drizzle';
import { exit } from 'process';

const main = async () => {
	const data: (typeof User.$inferInsert)[] = [];

	for (let i = 0; i < 2; i++) {
		data.push({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			role: 'admin'
		});
	}

	console.log('Seed start');
	await db.insert(User).values(data);
	console.log('Seed done');
	exit(0);
};

main();

```

Usage:

```tsx
import { db } from '@/db/drizzle';

export default async function Home() {
	const users = await db.query.User.findMany();
	return <pre>{JSON.stringify(users, null, 2)}</pre>;
}

```

## Dynamic Route

- [https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [https://nextjs.org/docs/app/api-reference/file-conventions/page#props](https://nextjs.org/docs/app/api-reference/file-conventions/page#props)

props type def:

```typescript
export type ServerParamsProps = {
 // https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 params: { id: string };
 searchParams: { [key: string]: string | string[] | undefined };
};
```

`app\product\[id]\page.tsx`

```tsx
import { ServerParamsProps } from '@/lib/types/common';
export default function Product(params: ServerParamsProps) {
 return (
  <div>
     Product {params.params.id}
  </div>
 );
}
```

## Loading ui and suspense

`Products.tsx`

```tsx
import { db } from '@/db/drizzle';
const Products = async () => {
	const products = await db.query.Product.findMany();

	return products.map((item) => (<div>Products.......</div>));
};

export default Products;
```

`page.ts`

```tsx
import Products from './Products';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
	return (
		<>
			<h1>Products</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<Products />
			</Suspense>
		</>
	);
}
```


> Beware that the expensive computation mustn't be done in `page.ts` otherwise `Suspense` won't work. The work done should be made in the component that is given to the Suspense.


## Server Action

### Server action inside client components

Client Components can only import actions that use the module-level `"use server"` directive.

`'@/lib/formSchema'`

```ts
import { z } from 'zod';

export const addTaskSchema = z.object({
	title: z
		.string()
		.max(255, { message: 'Title should be less than 255 characters' })
		.min(3, { message: 'Title should be more than 3 characters' }),
	description: z.string().optional()
});

export type TAddTaskSchema = z.infer<typeof addTaskSchema>;
```


`actions\addTask.ts`

```tsx
'use server';

import { db } from '@/db/drizzle';
import { Todo } from '@/db/schema';
import { addTaskSchema, TAddTaskSchema } from '@/lib/formSchema';
import { ZodIssue } from 'zod';

export type ActionResult<T> =
	| {
			status: 'success';
			data: T;
	  }
	| {
			status: 'error';
			error: string | ZodIssue[];
	  };

export async function createTask(data: TAddTaskSchema): Promise<ActionResult<TAddTaskSchema>> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));
		const validation = addTaskSchema.safeParse(data);
		if (!validation.success) {
			return {
				status: 'error',
				error: validation.error.errors
			};
		}
		const taskExists = await db.query.Todo.findFirst({
			where: (Todo, { eq }) => eq(Todo.title, data.title)
		});

		if (taskExists) {
			return {
				status: 'error',
				error: 'Task already exists'
			};
		}

		const [task] = await db.insert(Todo).values(validation.data).returning({
			id: Todo.id,
			title: Todo.title
		});

		return {
			status: 'success',
			data: task
		};
	} catch (e) {
		return {
			status: 'error',
			error: 'Something went wrong'
		};
	}
}
```

`ClientForm.tsx`

```tsx
'use client';

import { addTaskSchema, TAddTaskSchema } from '@/lib/formSchema';
// .........

const ClientForm = () => {
	const form = useForm<TAddTaskSchema>({
		resolver: zodResolver(addTaskSchema), //client side form validation
		mode: 'onTouched'
	});
	const router = useRouter();

	const onSubmit = async (values: TAddTaskSchema) => {
		const result = await createTask(values);
		if (result.status === 'success') {
			router.refresh();
			toast.success(`Task: '${result.data.title}' added`);
			form.reset();
		} else {
			// server side form validation
			if (Array.isArray(result.error)) {
				result.error.forEach((e) => {
					const fieldName = e.path.join('.') as 'title' | 'description';
					form.setError(fieldName, {
						message: e.message
					});
				});
			} else {
				form.setError('root.serverError', {
					message: result.error
				});
			}
		}
	};
	return (
			<Form {...form}>
				<form
					// action={action}
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='Add new task' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Textarea placeholder='Add description' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{form.formState.errors.root?.serverError && (
						<Alert variant='destructive'>
							<AlertCircle className='h-4 w-4' />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>
								{form.formState.errors.root?.serverError.message}
							</AlertDescription>
						</Alert>
					)}
					<Button type='submit' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? (
							<span className='flex items-center'>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Submitting
							</span>
						) : (
							'Submit'
						)}
					</Button>
				</form>
			</Form>

	);
};

export default ClientForm;
```

> It's important to note that zod `formSchema` is being used in both server and client component, hence kept in a separate file. Otherwise, defining `formSchema` in the client component,`ClientForm` and using in server action `createTask` would have resulted in errors.

### Server action inside client components with - `next-safe-action`

define client in `lib\safe-action.ts`


```typescript
import { createSafeActionClient } from 'next-safe-action';

export const AC = createSafeActionClient({
	// Can also be an async function.
	handleServerErrorLog(originalError, utils) {
		// And also log it to the console.
		console.error('Action error:', originalError.message);
	},
	// Can also be an async function.
	handleReturnedServerError(e, utils) {
		if (e.cause == 'custom') {
			return e.message;
		}

		return 'Oh no, something went wrong!';
	}
});
```

Changes in Action:

```typescript
'use server';

import { db } from '@/db/drizzle';
import { Todo } from '@/db/schema';
import { addTaskSchema, TAddTaskSchema } from '@/lib/formSchema';
import { AC } from '@/lib/safe-action';

export const createTask = AC.schema(addTaskSchema).action(async ({ parsedInput }) => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const taskExists = await db.query.Todo.findFirst({
		where: (Todo, { eq }) => eq(Todo.title, parsedInput.title)
	});

	if (taskExists) {
		throw new Error('Task already exists', {
			cause: 'custom'
		});
	}

	const [task] = await db.insert(Todo).values(parsedInput).returning({
		id: Todo.id,
		title: Todo.title
	});

	return task;
});
```

Changes in Component:

```tsx
import { useAction } from 'next-safe-action/hooks';

const ClientForm = () => {
	const [open, setOpen] = useState<boolean>(false);
	const form = useForm<TAddTaskSchema>({
		// resolver: zodResolver(addTaskSchema), //client side form validation
		mode: 'onTouched'
	});
	const router = useRouter();

	const { execute, isExecuting } = useAction(createTask, {
		onError: ({ error }) => {
			console.log(error);
			if (error.serverError) {
				form.setError('root.serverError', {
					message: error.serverError
				});
			}
			if (error.validationErrors) {
				for (const [key, _] of Object.entries(error.validationErrors)) {
					if (key == 'title' || key == 'description')
						form.setError(key, {
							message: error.validationErrors[key]?._errors?.join(',')
						});
				}
			}
		},
		onSuccess: (res) => {
			router.refresh();
			toast.success(`Task: '${res?.data?.title}' added`);
			setOpen(false);
			form.reset();
		}
	});
	const onSubmit = async (values: TAddTaskSchema) => {
		await execute(values);
		// const result = await createTask(values);
		// if (result.status === 'success') {
		// 	router.refresh();
		// 	toast.success(`Task: '${result.data.title}' added`);
		// 	setOpen(false);
		// 	form.reset();
		// } else {
		// 	// server side form validation
		// 	if (Array.isArray(result.error)) {
		// 		result.error.forEach((e) => {
		// 			const fieldName = e.path.join('.') as 'title' | 'description';
		// 			form.setError(fieldName, {
		// 				message: e.message
		// 			});
		// 		});
		// 	} else {
		// 		form.setError('root.serverError', {
		// 			message: result.error
		// 		});
		// 	}
		// }
	};
	return (
		<div className='flex flex-col'>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className='w-min'>+ Add Task</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle> Add Task</DialogTitle>
					</DialogHeader>
					<div>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder='Add new task' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Textarea placeholder='Add description' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{form.formState.errors.root?.serverError && (
									<Alert variant='destructive'>
										<AlertCircle className='h-4 w-4' />
										<AlertTitle>Error</AlertTitle>
										<AlertDescription>
											{form.formState.errors.root?.serverError.message}
										</AlertDescription>
									</Alert>
								)}
								{/* <Button type='submit' disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? (
										<span className='flex items-center'>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Submitting
										</span>
									) : (
										'Submit'
									)}
								</Button> */}

								<Button type='submit' disabled={isExecuting}>
									{isExecuting ? (
										<span className='flex items-center'>
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
											Submitting
										</span>
									) : (
										'Submit'
									)}
								</Button>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ClientForm;
```
