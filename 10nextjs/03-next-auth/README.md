# Next-Auth

- [Next-Auth](#next-auth)
  - [Getting Started](#getting-started)
  - [Google OAuth Provider](#google-oauth-provider)
    - [Add API route for next-auth](#add-api-route-for-next-auth)
    - [Client](#client)
      - [Session Provider](#session-provider)
      - [Sign in Page](#sign-in-page)
      - [Get session](#get-session)
      - [Protecting Routes](#protecting-routes)
        - [Types](#types)
        - [AuthGuard](#authguard)
        - [Protecting Routes in use](#protecting-routes-in-use)
    - [Server](#server)
      - [Protecting API Routes](#protecting-api-routes)
        - [Define middleware](#define-middleware)
        - [Protecting API Routes in use](#protecting-api-routes-in-use)
        - [In `getServerSideProps`](#in-getserversideprops)
    - [Role-Based Authentication](#role-based-authentication)
      - [Config Changes](#config-changes)
      - [AuthGuard Changes](#authguard-changes)
      - [Protecting Pages](#protecting-pages)

## Getting Started

- [https://next-auth.js.org/adapters/prisma](https://next-auth.js.org/adapters/prisma)
- [https://next-auth.js.org/getting-started/example](https://next-auth.js.org/getting-started/example)

Install:

```bash
yarn add next-auth @next-auth/prisma-adapter next-connect
```

Create a file with your Prisma Client:

`libs/prisma.ts`

```typescript
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
```

## Google OAuth Provider

- [https://next-auth.js.org/providers/google](https://next-auth.js.org/providers/google)

Steps:

1. Create a project in Google Cloud Platform
2. To configure OAuth consent screen, go to `APIs & Services` > `OAuth consent screen`
   1. Just give `email` and user type as `External`
3. To configure OAuth client ID, go to `APIs & Services` > `Credentials`
   1. Create a new `Create credentials` > `OAuth client ID`
   2. Select `Web application` as application type
   3. Give a name
   4. Provide `http://localhost:3000` as `Authorized JavaScript origins`
   5. And `http://localhost:3000/api/auth/callback/google` as `Authorized redirect URIs`
   6. Copy the `Client ID` and `Client secret` and paste it in `.env` file

### Add API route for next-auth

`pages/api/auth/[...nextauth].ts`

```typescript
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@libs/prisma';

export const authOptions: NextAuthOptions = {
 adapter: PrismaAdapter(prisma),
 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID || '',
   clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
  })
 ],
 secret: process.env.NEXTAUTH_SECRET,
 session: {
  strategy: 'database',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  updateAge: 60 * 60 * 24 // 1 day
 },
 useSecureCookies: process.env.NODE_ENV === 'production', // NO HTTPS on localhost
 debug: false,
 events: {},
 pages: {
  signIn: '/auth/signin'
 },
 callbacks: {
  async redirect({ url, baseUrl }) {
   return baseUrl;
  },

  async session({ session, user }) {
   if (session?.user) session.user.id = user.id;
   return session;
  }
 }
};
export default NextAuth(authOptions);

```

Add types for `session.user`

`types\next-auth.d.ts`

```typescript
import { DefaultUser } from 'next-auth';
declare module 'next-auth' {
 interface Session {
  user?: DefaultUser & { id: string };
 }
}
```

### Client

#### Session Provider

`pages/_app.tsx`

```tsx
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

#### Sign in Page

`pages/auth/signin.tsx`

```tsx
import { Button, Center, Group, Stack, Title, Text } from '@mantine/core';
import { signIn } from 'next-auth/react';

import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const Signin = () => {
 return (
  <div>
   <Center
    sx={{
     width: '100%',
     height: '100vh'
    }}>
    <Stack spacing='xl'>
     <Title align='center'>Sign in</Title>
     <Button onClick={() => signIn('google')} size='lg' sx={{ alignSelf: 'center' }}>
      <Group>
       <Text size='md'>Sign in with Google</Text>
       <FaGoogle />
      </Group>
     </Button>
    </Stack>
   </Center>
  </div>
 );
};

export default Signin;

```

#### Get session

`pages/index.tsx`

```tsx
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
 const { data, status } = useSession();

 return (
  <div>
   <main>
    {data?.user?.name || <Link href='/auth/signin'>Sign in</Link>}
    {status === 'loading' && <Text>Loading...</Text>}
    {status === 'authenticated' && <Button onClick={() => signOut()}>SIGN OUT</Button>}
   </main>
  </div>
 );
}
```

#### Protecting Routes

##### Types

`types\CustomNextType.ts`

```tsx
import { NextComponentType, NextPage } from 'next';
import { AppProps } from 'next/app';

export type CustomAppProps = AppProps & {
 Component: NextComponentType & {
  auth?: boolean;
 };
};
export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
 auth?: boolean;
};
```

##### AuthGuard

`pages\_app.tsx`

```tsx
const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
 const { data, status } = useSession();
 const router = useRouter();
 useEffect(() => {
  if (status === 'unauthenticated')
   if (router.pathname !== '/auth/signin') router.push('/auth/signin');
 }, [data, status]);
 if (status === 'loading') {
  return (
   <Center
    sx={{
     height: '100vh',
     width: '100vw'
    }}>
    <Loader size={'lg'} />
   </Center>
  );
 }
 if (status === 'authenticated') return <>{children}</>;
};

function MyApp(props: CustomAppProps) {
 const {
  Component,
  pageProps: { session, ...pageProps }
 } = props;


 return (
  <>
     <SessionProvider session={session}>
      {Component.auth ? (
       <AuthGuard>
        <Component {...pageProps} />
       </AuthGuard>
      ) : (
       <Component {...pageProps} />
      )}
     </SessionProvider>
  </>
 );
}
export default MyApp;
```

##### Protecting Routes in use

Let protect the `admin/categories` route.

`pages/admin/categories.tsx`

```tsx
import React from 'react';
import { CustomNextPage } from '../_app';

const Categories: CustomNextPage = () => {
 return <div></div>;
};
// set auth to true to protect this page
Categories.auth = true;

export default Categories;
```

### Server

#### Protecting API Routes

- [https://next-auth.js.org/configuration/nextjs#unstable_getserversession](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)

##### Define middleware

`middleware\auth-protect.ts`

```tsx
import { NextApiRequest, NextApiResponse } from 'next/types';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const protect = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
 const session = await unstable_getServerSession(req, res, authOptions);
 if (!session) {
  res.status(401).json({ message: 'You must be logged in.' });
  return;
 }
 next();
};
```

##### Protecting API Routes in use

`pages/api/hello.ts`

```tsx
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
 name: string;
};

import { protect } from 'middleware/auth-protect';
import nc from 'next-connect';
const handler = nc();
// protect the route with the middleware
handler.use(protect);
// the route is protected
handler.get((req: NextApiRequest, res: NextApiResponse<Data>) => {
 res.status(200).json({ name: 'John Doe' });
});

export default handler;
```

##### In `getServerSideProps`

`pages\index.tsx`

```tsx
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
```

### Role-Based Authentication

- [https://next-auth.js.org/tutorials/role-based-login-strategy](https://next-auth.js.org/tutorials/role-based-login-strategy)

To add role based authentication to your application, you must do three things.

1. Update your database schema
2. Add the `role` to the session object
3. Check for `role` in your pages/components

#### Config Changes

`/prisma/schema.prisma`

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  role          String?  // New Column
  accounts      Account[]
  sessions      Session[]
}
```

`types\next-auth.d.ts`

```typescript
import { DefaultUser } from 'next-auth';
declare module 'next-auth' {
 interface Session {
  user?: DefaultUser & { id: string; role: string };
 }
 interface User extends DefaultUser {
  role: string;
 }
}
```

`pages/api/auth/[...nextauth].ts`

```typescript
export const authOptions: NextAuthOptions = {
 //......
 callbacks: {
  async session({ session, user }) {
   if (session?.user) {
    session.user.id = user.id;
    session.user.role = user.role;
   }
   return session;
  }
 }
};
```

Going forward, when using the getSession hook, check that `session.user.role` matches the required `role`. The example below assumes the role `'admin'` is required.

#### AuthGuard Changes

```typescript
function MyApp(props: CustomAppProps) {
 const {
  Component,
  pageProps: { session, ...pageProps }
 } = props;

 return (
  <>
       <SessionProvider session={session}>
        {Component.auth ? (
         <AuthGuard role={Component.role}>
          <Component {...pageProps} />
         </AuthGuard>
        ) : (
         <Component {...pageProps} />
        )}
        |
       </SessionProvider>
  </>
 );
}
const AuthGuard = ({
 children,
 role
}: {
 children: React.ReactNode;
 role: string | undefined;
}): any => {
 const { data, status } = useSession();
 console.log(role, data);

 const router = useRouter();
 useEffect(() => {
  if (status === 'unauthenticated')
   if (router.pathname !== '/auth/signin') router.push('/auth/signin');
 }, [data, status]);
 if (status === 'loading') {
  return (
   <Center
    sx={{
     height: '100vh',
     width: '100vw'
    }}>
    <Loader size={'lg'} />
   </Center>
  );
 }
 if (status === 'authenticated') {
  if (role) {
   if (data?.user?.role === role) return children;
   else
    return (
     <Center
      sx={{
       height: '100vh',
       width: '100vw'
      }}>
      <h1>Not Authorized</h1>
     </Center>
    );
  }
  return children;
 }
};

export default MyApp;
```

#### Protecting Pages

```tsx
const Home: CustomNextPage = () => {
 const { data, status } = useSession();
 return (
  <AdminLayout>
   <div>
    {data?.user?.name || <Link href='/auth/signin'>Sign in</Link>}
    {status === 'loading' && <Text>Loading...</Text>}
    {status === 'authenticated' && <Button onClick={() => signOut()}>SIGN OUT</Button>}
   </div>
  </AdminLayout>
 );
};
Home.auth = true;
Home.role = 'admin';
export default Home;
```
