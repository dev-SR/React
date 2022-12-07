# Next.js

- [Next.js](#nextjs)
  - [Setups](#setups)
    - [TypeScript + Tailwind](#typescript--tailwind)
    - [Path aliases](#path-aliases)
    - [Must have libraries](#must-have-libraries)
    - [Prisma with next.js](#prisma-with-nextjs)
    - [Mantine.dev UI + tailwind](#mantinedev-ui--tailwind)

## Setups

### TypeScript + Tailwind

```bash
yarn create next-app --typescript
cd...
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add the paths to all of your template files in your `tailwind.config.js` file.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
 theme: {
  extend: {}
 },
 plugins: []
};
```

To resolve `Parsing error : Cannot find module 'next/babel'` error, add the following to your `.eslintrc.json`

```json
{
 "extends": ["next", "prettier", "next/core-web-vitals"],
 "plugins": ["prettier"]
}
```

Also install prettier plugin if you don't have it already

```bash
yarn add -D eslint-config-prettier
```

Add the `@tailwind` directives for each of Tailwind’s layers to your `./styles/globals.css` file.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

```

Start using Tailwind’s utility classes to style your content.

`index.tsx`:

```typescript
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

### Path aliases

```json
{
 "compilerOptions": {
  "baseUrl": ".",
  "paths": {
   "@ui/*": ["components/*"],
   "@libs/*": ["libs/*"]
  }
  }
}
```

### Must have libraries

```bash
yarn add react-icons react-hot-toast react-hook-form
```

`libs/classnames.ts`:

```ts
export const classnames = (...args: any[]) => args.filter(Boolean).join(' ');
```

### Prisma with next.js

Prisma Setup [https://www.prisma.io/nextjs](https://www.prisma.io/nextjs)

```bash
yarn add -D prisma
yarn add @prisma/client
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
npx prisma generate
```

Open Prisma Studio

```bash
npx prisma studio
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
npx prisma db seed
```

Instantiating PrismaClient with Next.js:

- [prisma.io/guides/nextjs-prisma-client-dev-practices](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)

`~/prisma.ts`

```ts
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
```

### Mantine.dev UI + tailwind

Remove `@tailwind/base` to avoid conflicts with Mantine styles:

```css
/* @tailwind base; */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
@tailwind components;
@tailwind utilities;

```

- [Install Mantine Dependency](https://mantine.dev/guides/next/)

Create `pages/_document.tsx` file:

```tsx
import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
 static getInitialProps = getInitialProps;

 render() {
  return (
   <Html>
    <Head />
    <body>
     <Main />
     <NextScript />
    </body>
   </Html>
  );
 }
}
```

Add `MantineProvider`,`ColorSchemeProvider` to `pages/_app.tsx`:

```tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

function MyApp(props: AppProps) {
 const { Component, pageProps } = props;
 // https://mantine.dev/guides/dark-theme/
 const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
  key: 'mantine-color-scheme',
  defaultValue: 'dark',
  getInitialValueInEffect: true
 });
 const toggleColorScheme = (value?: ColorScheme) => {
  setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
 };

 return (
  <>
   <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider
     theme={{ colorScheme: colorScheme, fontFamily: 'Inter, sans-serif' }}
     withGlobalStyles
     withNormalizeCSS>
     <Component {...pageProps} />
    </MantineProvider>
   </ColorSchemeProvider>
  </>
 );
}
export default MyApp;
```

`pages/index.tsx`:

```tsx
import { Text } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaMoon, FaSun } from 'react-icons/fa';
import { classnames } from '../utils/classnames';

export default function Home() {
 const { colorScheme, toggleColorScheme } = useMantineColorScheme();
 const dark = colorScheme === 'dark';

 return (
  <div className='flex flex-col h-screen justify-center items-center'>
   <ActionIcon
    color={dark ? 'yellow' : 'blue'}
    onClick={() => toggleColorScheme()}
    className='h-10 w-10'
    title='Toggle color scheme'>
    {dark ? <FaSun className='h-8 w-8' /> : <FaMoon className='h-8 w-8' />}
   </ActionIcon>
   <Text
    className={classnames('font-normal text-4xl ', dark ? 'text-blue-200' : 'text-blue-800')}>
    Extra large text
   </Text>
  </div>
 );
}

```
