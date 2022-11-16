# Mantine with Tailwind

## Installation

Setup Mantine with Next:

- [https://mantine.dev/guides/next/](https://mantine.dev/guides/next/)

Setup Tailwind with Mantine:

Remove `@tailwind/base` to avoid conflicts with Mantine styles:

```css
/* @tailwind base; */
@url ('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@tailwind components;
@tailwind utilities;
```

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
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

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
   <Text size='xl'>Extra large text</Text>
  </div>
 );
}
```
