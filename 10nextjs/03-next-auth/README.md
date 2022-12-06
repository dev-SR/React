# Next-Auth

- [Next-Auth](#next-auth)
	- [Getting Started](#getting-started)
		- [Add API route](#add-api-route)
		- [Google OAuth Provider](#google-oauth-provider)
	- [Client](#client)
		- [Session Provider](#session-provider)
		- [Sign in Page](#sign-in-page)
		- [Get session](#get-session)

## Getting Started

- [https://next-auth.js.org/adapters/prisma](https://next-auth.js.org/adapters/prisma)
- [https://next-auth.js.org/getting-started/example](https://next-auth.js.org/getting-started/example)

Install:

```bash
yarn add next-auth
```

Create a file with your Prisma Client:

`lib/prismadb.ts`

```typescript
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
```

### Add API route

`pages/api/auth/[...nextauth].ts`

```typescript
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prismadb';
import { redirect } from 'next/dist/server/api-utils';

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

### Google OAuth Provider

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

## Client

### Session Provider

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

### Sign in Page

`pages/auth/signin.tsx`

```tsx
import { Button, Center, Group, Stack, Title, Text } from '@mantine/core';
import { getProviders, signIn } from 'next-auth/react';

import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const Signin = ({ providers }: any) => {
 return (
  <div>
   {Object.values(providers).map((provider: any) => (
    <Center
     key={provider.name}
     sx={{
      width: '100%',
      height: '100vh'
     }}>
     <Stack spacing='xl'>
      <Title align='center'>Sign in</Title>
      {provider.name === 'Google' && (
       <Button onClick={() => signIn(provider.id)} size='lg' sx={{ alignSelf: 'center' }}>
        <Group>
         <Text size='md'>Sign in with {provider.name}</Text>
         <FaGoogle />
        </Group>
       </Button>
      )}
     </Stack>
    </Center>
   ))}
  </div>
 );
};

export async function getServerSideProps(context: any) {
 const providers = await getProviders();
 return {
  props: { providers }
 };
}

export default Signin;
```

### Get session

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


