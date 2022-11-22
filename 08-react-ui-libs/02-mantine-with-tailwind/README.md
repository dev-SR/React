# Mantine with Tailwind

## Installation

Next.js + Tailwind:

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

## Basic Usage with Tailwind.css

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

## Custom Default Theme

### Define custom colors and use them in components

```tsx
import {
 MantineProvider,
 ColorSchemeProvider,
 ColorScheme,
 ButtonProps,
 ButtonStylesParams
} from '@mantine/core';

const ButtonDefaultProps: Partial<ButtonProps> = {
   color: 'brand'
};

<MantineProvider
     theme={{
      colorScheme: colorScheme,
      fontFamily: 'Inter, sans-serif',
      colors: {
       brand: [
        '#f0f9ff',
        '#e0f2fe',
        '#bae6fd',
        '#38bdf8',
        '#0ea5e9',
        '#0284c7',
        '#0369a1',
        '#075985',
        '#0c4a6e'
       ]
      },
      components: {
       Button: {
        defaultProps: ButtonDefaultProps
       }
      }
     }}
     withGlobalStyles
     withNormalizeCSS
     >
      <Button>Click Me</Button>
   <Button variant='outline'>Click Me</Button>
</MantineProvider>
```

#### Changing Color Shades

```tsx
// 1. using index
const ButtonDefaultProps: Partial<ButtonProps> = {
 color: 'brand.3'
 // color: 'brand'
};

<MantineProvider
     theme={{
      colorScheme: colorScheme,
      fontFamily: 'Inter, sans-serif',
      colors: {
       brand: [...   ]
      },
      // 2. defining global shade
      primaryShade: {
       dark: 4,
       light: 6
      },
      components: {
       Button: {
        defaultProps: ButtonDefaultProps
       }
      }
     }}
     withGlobalStyles
     withNormalizeCSS
     >
      <Button>Click Me</Button>
   <Button variant='outline'>Click Me</Button>
</MantineProvider>
```

### Define custom styles for components

```tsx
    <MantineProvider
     theme={{
      colorScheme: colorScheme,
      fontFamily: 'Inter, sans-serif',
      colors: {
       brand: [...]
      },
      components: {
       Button: {
        // defaultProps: ButtonDefaultProps,
        styles: (theme, params: ButtonStylesParams) => ({
         root: {
          fontFamily: 'Poppins, sans-serif',
          backgroundColor:
           params.variant === 'filled'
            ? theme.colorScheme === 'dark'
             ? theme.colors.brand[5]
             : theme.colors.brand[3]
            : undefined,
          '&:hover': {
           backgroundColor:
            params.variant === 'filled'
             ? theme.colorScheme === 'dark'
              ? theme.colors.brand[5]
              : theme.colors.brand[3]
             : undefined
          }
         }
        })
       },
       Text: {
        styles: (theme, params: TextStylesParams) => ({
         root: {
          fontFamily: params.size === 'xl' ? 'Poppins, sans-serif' : undefined
         }
        }),
        classNames: { root: 'text-4xl' }
       }
      }
     }}
     withGlobalStyles
     withNormalizeCSS>
     <Component {...pageProps} />
</MantineProvider>
```
