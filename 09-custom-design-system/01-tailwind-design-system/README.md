# Design System with Tailwind CSS

- [Design System with Tailwind CSS](#design-system-with-tailwind-css)
	- [Installation](#installation)
		- [Next.js + Tailwind](#nextjs--tailwind)
		- [Storybook](#storybook)
			- [Initializing Storybook](#initializing-storybook)
			- [Installing PostCSS Add-ons](#installing-postcss-add-ons)
			- [Adding Webpack as a resolution dependency](#adding-webpack-as-a-resolution-dependency)
			- [Replace `.storybook/main.js`](#replace-storybookmainjs)
			- [Replace `.storybook/preview.js`](#replace-storybookpreviewjs)
			- [Start Storybook](#start-storybook)

## Installation

### Next.js + Tailwind

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
 "extends": ["next/babel", "next/core-web-vitals"]
}
```

Add the `@tailwind` directives for each of Tailwind’s layers to your `./styles/globals.css` file.

```css
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

### Storybook

- [https://storybook.js.org/blog/get-started-with-storybook-and-next-js/](https://storybook.js.org/blog/get-started-with-storybook-and-next-js/)
- [https://theodorusclarence.com/blog/nextjs-storybook-tailwind](https://theodorusclarence.com/blog/nextjs-storybook-tailwind)
- [https://getfishtank.ca/blog/configuring-nextjs-typescript-tailwind-storybook](https://getfishtank.ca/blog/configuring-nextjs-typescript-tailwind-storybook)

#### Initializing Storybook

This command will install the storybook to your Next.js repository, there will be a prompt asking if you want to additionally install an eslint plugin, I suggest you to accept.

```sh
npx -y sb init --builder webpack5
```

#### Installing PostCSS Add-ons

Tailwind CSS needs PostCSS to work, so we need to integrate it with Storybook using one of their pre-built add-ons.

```sh
yarn add -D @storybook/addon-postcss
```

#### Adding Webpack as a resolution dependency

We need this to ensure the webpack is installed as a dependency, somehow this will cause a bug if we don’t install it

Append this to your package.json

// package.json

```sh
"resolutions": {
    "webpack": "^5"
}
```

Then install the webpack resolutions with

```sh
yarn
```

#### Replace `.storybook/main.js`

Here is the custom main.js config that you can use

```js
// .storybook/main.js
module.exports = {
 stories: ['../components/**/*.stories.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
 addons: [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  {
   /**
    * Fix Storybook issue with PostCSS@8
    * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
    */
   name: '@storybook/addon-postcss',
   options: {
    postcssLoaderOptions: {
     implementation: require('postcss')
    }
   }
  }
 ],
 framework: '@storybook/react',
 core: {
  builder: '@storybook/builder-webpack5'
 }
};
```

#### Replace `.storybook/preview.js`

```javascript
// .storybook/preview.js
import '../styles/globals.css';

export const parameters = {
 actions: { argTypesRegex: '^on[A-Z].*' },
 controls: {
  matchers: {
   color: /(background|color)$/i,
   date: /Date$/
  }
 }
};
```

This file will load the Tailwind CSS from `globals.css` and mock NextImage to work with Storybook.

#### Start Storybook

```sh
yarn storybook
```
