This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

### prisma

Install  Prisma:

```bash
yarn add -D prisma
yarn add @prisma/client
npx prisma init
```

Define Models and Push to database"

```bash
npx prisma db push
npx prisma generate
```

Open Prisma Studio

```bash
npx prisma studio
```

Instantiating `PrismaClient` with Next.js:

`~/lib/prisma`

```typescript
import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined; // This must be a `var` and not a `let / const`
}

export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
```

### React Query

```bash
yarn add @tanstack/react-query @tanstack/react-query-devtools
```


- [ssr#using-experimental-app-directory-in-nextjs-13](https://tanstack.com/query/v4/docs/react/guides/ssr#using-experimental-app-directory-in-nextjs-13)
- [https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/](https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/)


Create a Custom Query Client Provider:

```tsx
'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ children }: React.PropsWithChildren) {
	const [client] = React.useState(
		new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default Providers;
```
```tsx
Create a Request-scoped Instance of QueryClient

import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
```
