# React exercise

- [React exercise](#react-exercise)
	- [Resources](#resources)
	- [Installation](#installation)
		- [Vite+Tailwind](#vitetailwind)

## Resources

## Installation

### Vite+Tailwind

Install Vite and Tailwind:

```bash
yarn create vite
yarn
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add the paths to all of your template files in your `tailwind.config.cjs` file.

```javascript
//....
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.


```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`App.tsx`:

```typescript
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

Run your build process with `yarn dev`.
