# React exercise

- [React exercise](#react-exercise)
	- [Resources](#resources)
	- [Installation 🌼](#installation-)
		- [Vite+Tailwind 🔥](#vitetailwind-)

## Resources

## Installation 🌼

### Vite+Tailwind 🔥

Install Vite and Tailwind:

```bash
yarn create vite
yarn
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add the paths to all of your template files in your `tailwind.config.cjs` file.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  extend: {}
 },
 plugins: []
};

```

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`App.tsx`:

```typescript
const App = () => {
 return (
  <>
   <h1 className='text-3xl font-bold underline'>Hello world!</h1>
  </>
 );
};
export default App;

```

Run your build process with `yarn dev`.
