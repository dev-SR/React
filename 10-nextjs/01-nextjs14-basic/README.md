# Nextjs Basic


- [Nextjs Basic](#nextjs-basic)
	- [Next with shadcn](#next-with-shadcn)
	- [Prisma](#prisma)
		- [setup prisma](#setup-prisma)
	- [Drizzle setup](#drizzle-setup)
		- [Sqlite](#sqlite)
		- [Postgresql](#postgresql)
	- [Dynamic Route](#dynamic-route)
	- [Streaming with Suspense](#streaming-with-suspense)
	- [Api Route Handlers](#api-route-handlers)
		- [GET](#get)
			- [Basic](#basic)
			- [Dynamic Route Segments](#dynamic-route-segments)
			- [URL Query Parameters](#url-query-parameters)
		- [POST](#post)
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

## Prisma

### setup prisma

First, we need to add Prisma to our project as a development dependency:

```bash
pnpm install prisma -D
pnpm install @prisma/client@latest
```

Next, we initialize Prisma:

```bash
npx prisma init
```

To actually create the tables in your database, you now can use the following command of the Prisma CLI:


```bash
npx prisma db push
npx prisma studio
```

Before you can access your database from Next.js using Prisma, you first need to install Prisma Client in your app. You can install it via npm as follows:

```bash
pnpm install @prisma/client
```

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

```bash
npx prisma generate
```

You'll use a single `PrismaClient` instance that you can import into any file where it's needed. The instance will be created in a prisma.ts file inside the `lib/` directory. Go ahead and create the missing directory and file:

`lib\prisma.ts`

```ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db;
````



## Drizzle setup

### Sqlite

```bash
pnpm add drizzle-orm better-sqlite3
pnpm add -D drizzle-kit @types/better-sqlite3 @faker-js/faker
```

1. Create a db file `sqlite.db` at the root level
2. Define drizzle config `drizzle.config.ts` at the root level. (config is required for database migration purposes, running commands like `push`, `generate`, `migrate` etc. and enable workings of drizzle studio )


```bash
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	schema: './db/sqlite-schema.ts',
	out: './drizzle-sqlite',
	dialect: 'sqlite',
	dbCredentials: {
		url: './sqlite.db'
	}
});
```

3. define schema `db\sqlite-schema.ts`:

```typescript
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	firstName: text('first_name'),
	lastName: text('last_name'),
	age: integer('age')
});

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
```

4. Define queryClient `db\index.ts`

```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './sqlite-schema';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });
```

5. Usage

```tsx
import { db } from '@/db';

export default async function Home() {
	const users = await db.query.User.findMany();
	return <pre>{JSON.stringify(users, null, 2)}</pre>;
}

```

### Postgresql

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

1. Define drizzle config `drizzle.config.ts` at the root level. (config is required for database migration purposes, running commands like `push`, `generate`, `migrate` etc. and enable workings of drizzle studio )

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
	// strict: true
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

3. Define query client: `db\index.ts`

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
        "db:push": "drizzle-kit push",
        "db:drop": "drizzle-kit drop",
        "db:studio": "drizzle-kit studio",
        "db:generate-migration": "drizzle-kit generate",
        "db:migrate": "drizzle-kit migrate",
		"db:seed": "npx tsx db/seed.ts"
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
import { db } from '@/db';

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

## Streaming with Suspense

In addition to `loading.ts`, you can also manually create Suspense Boundaries for your own UI components.

`<Suspense>` works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it's happening, and then swapping in your component once the action completes.


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
			<Suspense fallback={<div>Loading products...</div>}>
				<Products />
			</Suspense>
		</>
	);
}
```


`Products.tsx`

```tsx
import { db } from '@/db/drizzle';
const Products = async () => {
	const products = await db.query.Product.findMany();

	return products.map((item) => (<div>Products.......</div>));
};

export default Products;
```

> Beware that the expensive computation mustn't be done in `page.ts` otherwise `Suspense` won't work. The work done should be made in the component that is given to the Suspense.


## Api Route Handlers

- [https://nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### GET


#### Basic

`app\api\test\route.ts` -> `http://localhost:3000/api/test`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const token = request.headers.get('token');
	// const token = request.cookies.get('token');

	const user = {
		name: 'Jhon',
		role: 'Admin',
		token
	};
	return NextResponse.json(user, {
		status: 200,
		headers: { 'Set-Cookie': `token=${token}; sameSite=strict; httpOnly=true; maxAge=60*60*24` }
	});
}

```

#### Dynamic Route Segments

`app\api\test\[id]\route.ts` -> `http://localhost:3000/api/test/[id]`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
	const user = { id, name: 'Jhon' };
	return NextResponse.json(user);
}
```

####  URL Query Parameters

`app\api\test\route.ts`

```typescript
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	console.log(searchParams);

	const query = searchParams.get('query');
	const categories = searchParams.getAll('category'); // Get all values for 'category'
	const prices = searchParams.getAll('price'); // Get all values for 'price'

	return NextResponse.json({ query, categories, prices });
}
```

Now if request is send to `http://localhost:3000/api/test?query=apple&category=electronics&category=smart%20phones&price=1000&price=2000`, the response will be:

```json
{
  "query": "apple",
  "categories": [
    "electronics",
    "smart phones"
  ],
  "prices": [
    "1000",
    "2000"
  ]
}
```

### POST

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

const userSchema = z.object({
	name: z.string().min(3),
	email: z.string().email()
});

export async function POST(request: NextRequest) {
	const body = await request.json();

	try {
		const parsedBody = userSchema.parse(body);
		// Perform actions with the validated data
		return NextResponse.json({ message: `User ${parsedBody.name} created successfully` });
	} catch (error) {
		if (error instanceof ZodError) {
			// Handle Zod validation errors
			return NextResponse.json(
				{
					errors: error.errors.map((e) => ({
						path: e.path[0],
						message: e.message
					}))
				},
				{ status: 400 }
			);
		} else {
			return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
		}
	}
}
```



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

// Define a reusable custom error class
export class ActionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'MyActionError';
		this.cause = 'MyActionError';
	}
}

export const AC = createSafeActionClient({
	// Can also be an async function.
	handleServerErrorLog(originalError, utils) {
		// And also log it to the console.
		// console.log(originalError.cause);

		console.error('Action error:', originalError.message);
	},
	// Can also be an async function.
	handleReturnedServerError(e, utils) {
		if (e instanceof ActionError) {
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
import { AC,ActionError } from '@/lib/safe-action';

export const createTask = AC.schema(addTaskSchema).action(async ({ parsedInput }) => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const taskExists = await db.query.Todo.findFirst({
		where: (Todo, { eq }) => eq(Todo.title, parsedInput.title)
	});

	if (taskExists) {
		throw new ActionError('Task already exists');
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
		mode: 'onChange'
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
			toast.success(`Task: '${res?.data?.title}' added`);
			setOpen(false);
			form.reset();
			router.refresh();
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
