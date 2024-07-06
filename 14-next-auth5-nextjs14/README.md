# Next-auth-v5

- [Next-auth-v5](#next-auth-v5)
  - [Setup](#setup)
  - [Configure](#configure)
  - [Provider](#provider)
    - [GITHUB Provider](#github-provider)
    - [Credentials Provider](#credentials-provider)

## Setup

```bash
pnpm add next-auth@beta @auth/drizzle-adapter
```

Then add it to your `.env` file:

```properties
AUTH_SECRET=secret
```

## Configure

1. Start by creating a new `auth.ts` file at the root of your app with the following content.

2. Add a Route Handler under `app/api/auth/[...nextauth]/route.ts`

3. Add database adapter

- [https://authjs.dev/getting-started/adapters/drizzle](https://authjs.dev/getting-started/adapters/drizzle)

## Provider

### GITHUB Provider

To setup github oauth go to: `Setting>Developer Setting>OAuth Apps`

Environment Variables:

```properties
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

Configuration:

```typescript
import GitHub from "next-auth/providers/github"
export const { handlers, auth, signIn, signOut } = NextAuth({
    // ...
  providers: [GitHub],
})
```

- get provider details: `http://localhost:3000/api/auth/providers` and add callback url in github oauth app.




### Credentials Provider


