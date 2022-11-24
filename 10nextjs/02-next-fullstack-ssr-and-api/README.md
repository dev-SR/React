# Fullstack Next.js v1

- [Fullstack Next.js v1](#fullstack-nextjs-v1)
  - [Database with Prisma](#database-with-prisma)
  - [SSR in Next.js with Prisma](#ssr-in-nextjs-with-prisma)

## Database with Prisma

Prisma Setup [https://www.prisma.io/nextjs](https://www.prisma.io/nextjs)

```bash
yarn add -D prisma
npx prisma init
```

Setup SQLite

```prisma
datasource db {
  // provider = "postgresql"
  // url      = env("DATABASE_URL")
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Define Models and Push to database

```bash
npx prisma db push
```

Open Prisma Studio

```bash
npx prisma studio
```

Prisma Client Setup:

```bash
yarn add @prisma/client
npx prisma generate
```

Setup Seeding:

```bash
yarn add @faker-js/faker --dev
```

`prisma/seed.ts`

```ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
 console.log(`Start seeding ...`);
 await prisma.products.deleteMany();
 await prisma.category.deleteMany();
 for (let i = 0; i < 10; i++) {
  const category = await prisma.category.create({
   data: {
    name: faker.name.firstName()
   }
  });
  for (let j = 0; j < 10; j++) {
   await prisma.products.create({
    data: {
     name: faker.name.firstName(),
     price: Number(faker.random.numeric(2)),
     categoryId: category.id
    }
   });
  }
 }
 /*
 await prisma.products.create({
   data: {
    name: faker.commerce.productName(),
    price: Number(faker.random.numeric(2)),
    category: {
     create: {
      name: faker.commerce.department()
     }
    }
   }
  });

 */
 console.log(`Seeding finished.`);
}

main()
 .catch((e) => {
  console.error(e);
  process.exit(1);
 })
 .finally(async () => {
  await prisma.$disconnect();
 });

```

`package.json`

```json
 "prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
 },
```

```bash
 yarn add @faker-js/faker --dev
```

## SSR in Next.js with Prisma


Instantiating PrismaClient with Next.js:

- [prisma.io/guides/nextjs-prisma-client-dev-practices](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)

`~/prisma.ts`

```ts
import { PrismaClient } from '@prisma/client';

declare global {
 // allow global `var` declarations
 // eslint-disable-next-line no-var
 var prisma: PrismaClient | undefined;
}

export const prisma =
 global.prisma ||
 new PrismaClient({
  log: ['query']
 });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
```

`~/pages/index.tsx`

Server Side Rendering with Prisma:

```tsx
import { Users } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { prisma } from '../prisma';
export async function getServerSideProps(context: GetServerSidePropsContext) {
 const users: Users[] = await prisma.users.findMany();
 return {
  props: {
   users: JSON.parse(JSON.stringify(users))
  }
 };
}

export default function Home({ users }: { users: Users[] }) {
 return (
  <>
   <div className='flex flex-col h-screen justify-center items-center'>
    {users.map((user) => {
     return (
      <div key={user.id}>
       <h1>{user.name}</h1>
       <p>{user.email}</p>
      </div>
     );
    })}
   </div>
  </>
 );
}
```
