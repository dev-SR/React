# Next.js

- [Next.js](#nextjs)
  - [Installation](#installation)
    - [TypeScript + Tailwind](#typescript--tailwind)
    - [Must have libraries](#must-have-libraries)
    - [Mantine.dev UI + tailwind](#mantinedev-ui--tailwind)

## Installation

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

### Must have libraries

```bash
yarn add react-icons react-hot-toast react-hook-form
```

`utils/classnames.ts`:

```ts
export const classnames = (...args: any[]) => args.filter(Boolean).join(' ');
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