# Next.js

- [Next.js](#nextjs)
  - [Installation](#installation)
    - [TypeScript + Tailwind](#typescript--tailwind)

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