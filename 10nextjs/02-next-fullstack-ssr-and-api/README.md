# Fullstack Next.js v1

- [Fullstack Next.js v1](#fullstack-nextjs-v1)
  - [Database with Prisma](#database-with-prisma)
  - [SSR in Next.js with Prisma](#ssr-in-nextjs-with-prisma)
  - [SSR crud with Prisma](#ssr-crud-with-prisma)
    - [Page](#page)
    - [Api Routes for creating, updating and deleting categories](#api-routes-for-creating-updating-and-deleting-categories)
      - [Middlewares](#middlewares)
    - [Controllers](#controllers)
    - [Router](#router)

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

## SSR crud with Prisma

### Page

```tsx
import { Category, PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { prisma } from '../../prisma';
import { ActionIcon, Box, Button, Group, Modal, Pagination, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MdDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

export async function getServerSideProps(context: GetServerSidePropsContext) {
 // paginate categories
 const page = context.query.page ? parseInt(context.query.page as string) : 1;
 const limit = 5;
 const offset = (page - 1) * limit;
 const [total, categories] = await prisma.$transaction([
  prisma.category.count(),
  prisma.category.findMany({
   skip: offset,
   take: limit,
   orderBy: {
    updatedAt: 'desc'
   },
   include: {
    _count: {
     select: {
      Products: true
     }
    }
   }
  })
 ]);
 const nextPage = total > page * limit ? page + 1 : null;
 const prevPage = page > 1 ? page - 1 : null;
 // page count
 const pageCount = Math.ceil(total / limit);

 const res = {
  total,
  categories,
  nextPage,
  prevPage,
  pageCount
 };
 console.log('res', JSON.stringify(res, null, 2));

 return {
  props: JSON.parse(JSON.stringify(res))
 };
}

type ImprovisedCategory = Category & {
 _count: {
  Products: number;
 };
};

type CategoryProps = {
 categories: ImprovisedCategory[];
 total: number;
 nextPage: number | null;
 prevPage: number | null;
 pageCount: number;
};

const Category = ({ categories, ...props }: CategoryProps) => {
 const [isRefreshing, setIsRefreshing] = React.useState(false);
 // Refreshing Server-Side Props
 // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
 const router = useRouter();
 const refreshData = () => {
  router.replace(router.asPath);
  setIsRefreshing(true);
 };
 React.useEffect(() => {
  setIsRefreshing(false);
  toast.dismiss();
 }, [categories]);
 const [opened, setOpened] = useState(false);

 // client-side pagination: Not Recommended for large data
 const [activePage, setPage] = useState(1);
 // change router as page change
 const handlePageChange = (page: number) => {
  setPage(page);
  router.push(`/admin/category?page=${page}`);
 };
 const rows = categories.map((category, index) => (
  <tr key={index}>
   <td>{category.name}</td>
   <td>{category._count.Products}</td>
   <td
    style={{
     width: '10%'
    }}>
    <div className='flex space-x-2'>
     <ActionIcon
      onClick={async () => {
       setOpened(true);
       getCategory(category.id);
      }}>
      <AiOutlineEdit className='h-7 w-7 p-1 text-sky-200 bg-sky-600/30 rounded ' />
     </ActionIcon>
     <ActionIcon
      onClick={async () => {
       toast.loading('Refreshing...');
       await axios.delete(`/api/category/${category.id}`);
       refreshData();
      }}>
      <MdDeleteOutline className='h-7 w-7 p-1 text-red-200 bg-red-600/30 rounded ' />
     </ActionIcon>
    </div>
   </td>
  </tr>
 ));
 // register add category form
 const form = useForm<{
  name: string;
 }>({
  initialValues: {
   name: ''
  },
  validate: (values) => ({
   name: values.name.length < 2 ? 'Too short name' : null
  })
 });
 // register edit category form
 const updateForm = useForm<{
  name_update: string;
 }>({
  validate: (values) => ({
   name_update: values.name_update.length < 2 ? 'Too short name' : null
  })
 });

 const handleAdd = async (values: typeof form.values) => {
  toast.loading('Refreshing...');
  await axios.post('/api/category', values);
  form.reset();
  refreshData();
 };

 const [selectedCategory, setSelectedCategory] = useState<{
  id: string;
  data: Category;
 } | null>(null);

 const getCategory = async (id: string) => {
  const category = await axios.get(`/api/category/${id}`);
  setSelectedCategory({
   id,
   data: category.data
  });
  // initialize form values
  updateForm.setValues({
   name_update: category.data.name
  });
 };

 const updateCategory = async (id: string, values: typeof updateForm.values) => {
  toast.loading('Refreshing...');
  await axios.put(`/api/category/${id}`, {
   name: values.name_update
  });
  form.reset();
  refreshData();
 };

 return (
  <Layout>
   <Toaster />
   {/* Product Update Modal */}
   <Modal
    opened={opened}
    onClose={() => {
     setOpened(false);
     selectedCategory && setSelectedCategory(null);
    }}
    overlayBlur={3}
    overlayOpacity={0.55}
    title='Update Product'>
    {selectedCategory && (
     <Box sx={{ maxWidth: 500, minWidth: 350 }} mx='auto'>
      <form
       onSubmit={updateForm.onSubmit((values) => {
        updateCategory(selectedCategory.id, values);
        setOpened(false);
       })}>
       <TextInput {...updateForm.getInputProps('name_update')} />
       <Group position='right' mt='md'>
        <Button type='submit' color={'yellow'}>
         Update
        </Button>
       </Group>
      </form>
     </Box>
    )}
   </Modal>
   {/* Content */}
   <div className='flex flex-col space-y-4'>
    <Box sx={{ maxWidth: 500, minWidth: 350 }} mx='auto'>
     <form onSubmit={form.onSubmit((values) => handleAdd(values))}>
      <TextInput
       label='Add a category'
       placeholder='Category name'
       {...form.getInputProps('name')}
       withAsterisk
      />
      <Group position='right' mt='md'>
       <Button type='submit'>Add</Button>
      </Group>
     </form>
    </Box>
    {/* table for category list */}
    <Table fontSize='md'>
     <thead>
      <tr>
       <th>Category Name</th>
       <th>Products</th>
       <th>Actions</th>
      </tr>
     </thead>
     <tbody>{rows}</tbody>
    </Table>
    {/* control pagination */}
    <Pagination
     page={activePage}
     onChange={handlePageChange}
     total={props.pageCount}
     position='right'
    />
   </div>
  </Layout>
 );
};

export default Category;
```

### Api Routes for creating, updating and deleting categories

#### Middlewares

`middlewares\catchAsyncErrors.ts`

```ts
import { NextApiRequest, NextApiResponse } from 'next';
export default (func: any) => (req: NextApiRequest, res: NextApiResponse, next: () => void) =>
 Promise.resolve(func(req, res, next)).catch(next);
```

`middlewares\errors.ts`

```typescript
import { NextApiRequest, NextApiResponse } from 'next';

export default async function onError(
 error: Error,
 req: NextApiRequest,
 res: NextApiResponse,
 next: () => void
) {
 console.log(error);

 res.status(500).end(error.toString());
 next();
}

```

`middlewares\logger.ts`

```typescript
import { NextApiRequest, NextApiResponse } from "next";

export const Logger = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
 console.log('Request: ', req.method, req.url);
 next();
}
```

### Controllers

`controllers\category\index.ts`

```typescript
import { createCategory } from './create';
import { deleteCategory } from './delete';
import { updateCategory } from './update';
import { getSingleCategory } from './getOne';
export { createCategory, deleteCategory, updateCategory, getSingleCategory };
```

`controllers\category\create.ts`

```typescript
import catchAsyncErrors from '../../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';
export const createCategory = catchAsyncErrors(
 async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const { name } = req.body;

  const category = await prisma.category.create({
   data: {
    name
   }
  });
  res.status(201).json(category);
 }
);

```

`controllers\category\delete.ts`

```typescript
import catchAsyncErrors from '../../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export const deleteCategory = catchAsyncErrors(
 async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
   return res.status(400).json({ message: 'Missing id' });
  }
  const category = await prisma.category.delete({
   where: {
    id: id as string
   }
  });

  res.status(201).json({
   success: true,
   message: 'Category deleted successfully'
  });
 }
);
```

`controllers\category\getOne.ts`

```typescript
import catchAsyncErrors from '../../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export const getSingleCategory = catchAsyncErrors(
 async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (!id) {
   return res.status(400).json({ message: 'Missing id' });
  }
  const category = await prisma.category.findUnique({
   where: {
    id: id as string
   }
  });
  console.log(category);

  res.status(200).json({
   success: true,
   ...category
  });
 }
);
```

`controllers\category\update.ts`

```typescript
import catchAsyncErrors from '../../middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export const updateCategory = catchAsyncErrors(
 async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };
  const { name } = req.body;
  console.log(name);

  const category = await prisma.category.update({
   where: { id },
   data: { name }
  });

  res.status(200).json({
   success: true,
   category
  });
 }
);
```

### Router

`pages\api\category\index.ts`

```typescript
import nc from 'next-connect';
import onError from '../../../middlewares/errors';
import { createCategory } from '../../../controllers/category';

const handler = nc({ onError });
handler.post(createCategory);

export default handler;

```

`pages\api\category\[id].ts`

```typescript
import nc from 'next-connect';
// handle server error middleware
import onError from '../../../middlewares/errors';
import { deleteCategory, getSingleCategory, updateCategory } from '../../../controllers/category';
import { Logger } from '../../../middlewares/logger';
// initiate next-connect with error middleware
const handler = nc({ onError });
handler.use(Logger);
handler.delete(deleteCategory);
handler.put(updateCategory);
handler.get(getSingleCategory);

export default handler;
```
