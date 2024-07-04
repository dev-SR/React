# Nextjs Basic


- [Nextjs Basic](#nextjs-basic)
	- [Next with shadcn](#next-with-shadcn)
	- [Drizzle setup](#drizzle-setup)
	- [Dynamic Route](#dynamic-route)


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