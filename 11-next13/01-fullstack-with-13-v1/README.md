This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Setup](#setup)
	- [prisma](#prisma)
	- [React Query](#react-query)
		- [setup](#setup-1)
		- [Prefetching Data Using Hydration and Dehydration](#prefetching-data-using-hydration-and-dehydration)


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

#### setup

```bash
yarn add @tanstack/react-query @tanstack/react-query-devtools
```

- [ssr#using-experimental-app-directory-in-nextjs-13](https://tanstack.com/query/v4/docs/react/guides/ssr#using-experimental-app-directory-in-nextjs-13)
- [https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/](https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/)

Create a Custom Query Client Provider:

`app\query\provider.tsx`

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

Provide the QueryClient Provider to Next.js:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang='en'>
   <body className={inter.className}>
    <Providers>{children}</Providers>
   </body>
  </html>
 );
}
```

Create a Request-scoped Instance of QueryClient:

`app\query\getQueryClient.ts`

```tsx
import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
```

Create a Custom Hydrate Component:

`app\query\HydrateClient.tsx`

```tsx
'use client';

import { Hydrate as RQHydrate, HydrateProps } from '@tanstack/react-query';

function Hydrate(props: HydrateProps) {
 return <RQHydrate {...props} />;
}

export default Hydrate;

```

#### Prefetching Data Using Hydration and Dehydration

👉 Steps: fetch data on the server, hydrate the state, dehydrate the cache, and rehydrate it on the client.

👉 Step 1: fetch data on the server, hydrate the state, dehydrate the cache

`app\page.tsx`

```tsx
import Link from 'next/link';
import { prisma } from '~/lib/prisma';
import Posts from './Posts';
import getQueryClient from './query/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import Hydrate from './query/HydrateClient';

const getPosts = async () => {
 const posts = await prisma.post.findMany();
 return JSON.parse(JSON.stringify(posts));
 // Warning: Only plain objects can be passed to Client Components from Server Components.
};

export default async function Home() {
 const queryClient = getQueryClient(); //not useQueryClient
 await queryClient.prefetchQuery(['posts'], getPosts);
 const dehydratedState = dehydrate(queryClient);

 return (
  <main className='p-12'>
   <h1 className='text-4xl font-bold'>Welcome</h1>
   <Link href={'/dashboard'} className='text-blue-700'>
    Go to dashboard 🎯
   </Link>
   <div className=' space-y-2 w-1/2 mx-auto'>
    <Hydrate state={dehydratedState}>
     <Posts />
    </Hydrate>
   </div>
  </main>
 );
}
```

👉 Step 2: dehydrate the cache

```tsx
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const getPosts = async () => {
 const { data } = await axios.get<PostType[]>('/api/posts');

 return data;
};
const deleteHandler = async (id: string) => {
 const { data } = await axios.delete(`/api/posts/${id}`);
 return data;
};

const Posts = () => {
 const { data: posts } = useQuery({
  queryKey: ['posts'],
  queryFn: getPosts
 });
 const queryClient = useQueryClient(); //not getQueryClient

 const deleteMutation1 = useMutation({
  mutationFn: deleteHandler,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['posts'] });
  }
 });


 return (
  <div>
   {posts?.map((post) => (
    <Card key={post.id}>
     ....
    </Card>
   ))}
  </div>
 );
};

export default Posts;
```
