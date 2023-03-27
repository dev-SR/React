# Create T3 App

- [Create T3 App](#create-t3-app)
  - [Initial Setups](#initial-setups)
    - [daisyui (Optional)](#daisyui-optional)
    - [prisma](#prisma)
    - [clerk auth](#clerk-auth)


## Initial Setups

1. Install: [T3 Stack](https://create.t3.gg/) with `npm create t3-app@latest`.

### daisyui (Optional)

[https://daisyui.com/docs/install/](https://daisyui.com/docs/install/)

- Install daisyUI:`yarn add daisyui`
- Then add daisyUI to your tailwind.config.js files:

```javascript
module.exports = {
  //...
  plugins: [require("daisyui")],
}
```

### prisma

1. Update `DATABASE_URL` in `.env`
2. Update prisma `prisma.schema`. (Remove all, add bellow lines only)

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider     = "mysql"
    url          = env("DATABASE_URL")
    relationMode = "prisma"
}

model Example {
    id        String   @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

3. push database: `npx prisma db push`
4. open studio: `npx prisma studio`

### clerk auth

[https://clerk.com/docs/nextjs/overview](https://clerk.com/docs/nextjs/overview)

1. Install @clerk/nextjs: `yarn add @clerk/nextjs`
2. Set Environment Keys
3. Configure `<ClerkProvider/>`
4. Add signin and signout buttons [ui components](https://clerk.com/docs/component-reference/sign-in-button)


```tsx
import { SignInButton, useUser, SignOutButton } from "@clerk/nextjs";
const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <main>
        <div>
          <div>{user.user?.username}</div>
          {!user.isSignedIn && (
            <SignInButton>
              <button className="btn-primary btn-sm btn">Sign in</button>
            </SignInButton>
          )}
          {user.isSignedIn && (
            <SignOutButton>
              <button className="btn-secondary btn-sm btn">Sign out</button>
            </SignOutButton>
          )}
        </div>
      </main>
    </>
  );
};
export default Home;
```
