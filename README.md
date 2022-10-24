# React exercise

- [React exercise](#react-exercise)
	- [Resources](#resources)
	- [Installation 🌼](#installation-)
		- [Vite+Tailwind 🔥](#vitetailwind-)
		- [🏹 Tailwind Css IntelliSense custom config](#-tailwind-css-intellisense-custom-config)
	- [VsCode Snippets for React TypeScript](#vscode-snippets-for-react-typescript)

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

### 🏹 Tailwind Css IntelliSense custom config

```json
{
	"tailwindCSS.emmetCompletions": true,
	"tailwindCSS.includeLanguages": {
		"html": "html",
		"javascript": "javascriptreact",
		"typescript": "typescriptreact"
	},
	// disable built-in css validation for tailwind specific syntax i.e @apply...
	"css.validate": false,
	// for first time triggering inside string
	"editor.quickSuggestions": {
		"strings": "on"
	}
}
```

Tailwind IntelliSense within objects and variables:


```json
{
"tailwindCSS.experimental.classRegex": [
		["Classes \\=([^;]*);", "'([^']*)'"],
		["Classes \\=([^;]*);", "\"([^\"]*)\""],
		["Classes \\=([^;]*);", "\\`([^\\`]*)\\`"]
	]
}
```

Tailwind IntelliSense will now recognize all of the following strings:

```typescript
const defaultClasses = `text-grey`;

const componentClasses = {
  default: 'text-grey',
  danger: `text-red`,
  warning: "text-yellow",
};
```

- [https://stackoverflow.com/questions/66614875/how-can-i-enable-tailwind-intellisense-outside-of-classname](https://stackoverflow.com/questions/66614875/how-can-i-enable-tailwind-intellisense-outside-of-classname
)


## VsCode Snippets for React TypeScript

<table>
<thead>
  <tr>
    <th>Trigger</th>
    <th>Content</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>c</code>,<code>cc</code></td>
    <td>Creates a stateless React component without PropTypes</td>
  </tr>
  <tr>
    <td><code>cp</code>,<code>ccp</code></td>
    <td>Creates a stateless React component with Typed Props using <code>Type</code></td>
  </tr>
   <tr>
    <td><code>cpi</code></td>
    <td>Creates a stateless React component with Typed Props using <code>interface</code></td>
  </tr>
   <tr>
    <td><code>cm</code></td>
    <td>Creates a memoized stateless React component without PropTypes</td>
  </tr>

 <tr>
    <td><code>cmp</code></td>
    <td>Creates a memoized stateless React component with PropTypes</td>
  </tr>
 <tr>
    <td><code>us</code></td>
    <td>Creates <code>useState</code></td>
  </tr>
   <tr>
    <td><code>uf</code>,<code>ufd</code>,<code>ufu</code></td>
    <td>Adds useEffect</td>
  </tr>
   <tr>
    <td><code>um</code></td>
    <td>Adds useMemo</td>
  </tr>
  <tr>
    <td><code>ucb</code></td>
    <td>Adds useCallback</td>
  </tr>
   <tr>
    <td><code>im..</code></td>
    <td>Imports from React</td>
  </tr>
</tbody>
</table>

Creating Snippets for React:

- Go to `Setting` -> `Configure User Snippets` -> type `typescriptreact`
- Now paste the following code or create new one from [https://snippet-generator.app/](https://snippet-generator.app/)

```json
{
	"importUseState": {
		"prefix": "imus",
		"body": ["import React, { useState } from 'react'"],
		"description": "Import useState"
	},
	"importUseStateAndEffect": {
		"prefix": "imusf",
		"body": ["import React, { useState, useEffect } from 'react'"],
		"description": "importUseStateAndEffect"
	},

	"useState<T>": {
		"prefix": "us",
		"body": ["const [${1:state},set${1/(.*)/${1:/capitalize}/}] =  useState<${2:T}>(${3:init});"],
		"description": "Creates useState"
	},
	"useEffectDidMount": {
		"prefix": "ufd",
		"body": ["useEffect(() => {", "  $0", "},[]);"],
		"description": "Adds useEffectDidMount"
	},
	"useEffectUnMount": {
		"prefix": "ufu",
		"body": ["useEffect(() => {", "  $1", "return () => {", "  $2", "}},[$3]);"],
		"description": "Adds useEffectUnMount"
	},
	"useEffect": {
		"prefix": "uf",
		"body": ["useEffect(() => {", "  $1", "},[$2]);"],
		"description": "Adds useEffect"
	},
	"useCallback": {
		"prefix": "ucb",
		"body": ["const ${1:fn} = useCallback(() => {", "  ${2:fnbody};", "}, [${3:depd.}]);", ""],
		"description": "useCallback"
	},
	"useMemo": {
		"prefix": "um",
		"body": ["const ${1:fn}= useMemo(() => {", "  return ${2:fnbody};", " }, [${3:depd.}]);"],
		"description": "useMemo"
	},
	"RFC": {
		"prefix": "fc",
		"body": [
			"import React from 'react';",
			"",
			"const ${1:${TM_FILENAME_BASE}} = () => {",
			"    return (",
			"      <div>",
			"        $2",
			"      </div>",
			"    );",
			"};",
			"",
			"export default ${1:${TM_FILENAME_BASE}};"
		],
		"description": "Creates a stateless React component without PropTypes"
	},
	"RFC capitalize": {
		"prefix": "fccap",
		"body": [
			"import React from 'react';",
			"",
			"const ${1:${TM_FILENAME_BASE/(.*)/${1:/capitalize}/}} = () => {",
			"    return (",
			"      <div>",
			"        $2",
			"      </div>",
			"    );",
			"};",
			"",
			"export default ${1:${TM_FILENAME_BASE}};"
		],
		"description": "Creates a stateless React component without PropTypes"
	},
	"RFC CustomName": {
		"prefix": "fcc",
		"body": [
			"const ${1:component} = () => {",
			"    return (",
			"      <div>",
			"        $2",
			"      </div>",
			"    );",
			"};",
			""
		],
		"description": "Creates a stateless React component without PropTypes with CustomName"
	},
	"reactStatelessWithTypePropsCustomName": {
		"prefix": "fccp",
		"body": [
			"type ${1:component}Props = {",
			"    $2",
			"};",
			"const ${1:component} = ({$3}:${1:component}Props) => {",
			"  return (",
			"    <div>",
			"      $4",
			"    </div>",
			"  );",
			"};"
		],
		"description": "Creates a stateless React component as a named function with Typed Props using Type"
	},
	"reactStatelessWithTypeProps": {
		"prefix": "fcp",
		"body": [
			"import React from 'react';",
			"type ${1:${TM_FILENAME_BASE}}Props = {",
			"    $2",
			"};",
			"const ${1:${TM_FILENAME_BASE}} = ({$3}:${1:${TM_FILENAME_BASE}}Props) => {",
			"  return (",
			"    <div>",
			"      $4",
			"    </div>",
			"  );",
			"};",
			"export default ${1:${TM_FILENAME_BASE}};"
		],
		"description": "Creates a stateless React component as a named function with Typed Props using Type with Custom Name"
	},
	"reactStatelessWithTypePropsUsingInterface": {
		"prefix": "fcpi",
		"body": [
			"import React from 'react';",
			"interface ${1:${TM_FILENAME_BASE}}Props{",
			"    $2",
			"};",
			"const ${1:${TM_FILENAME_BASE}} = ({$3}:${1:${TM_FILENAME_BASE}}Props) => {",
			"  return (",
			"    <div>",
			"      $4",
			"    </div>",
			"  );",
			"};",
			"export default ${1:${TM_FILENAME_BASE}};"
		],
		"description": "Creates a stateless React component as a named function with Typed Props using interface"
	},
	"reactMemo": {
		"prefix": "fcm",
		"body": [
			"import React, { memo } from 'react'",
			"",
			"const ${1:${TM_FILENAME_BASE}} = memo(() => {",
			"  return (",
			"    <div>",
			"      $2",
			"    </div>",
			"  );",
			"});",
			"export default ${1:${TM_FILENAME_BASE}};"
		],
		"description": "Creates a memoized stateless React component without PropTypes and ES6 module system"
	},
	"reactMemoWithProps": {
		"prefix": "fcmp",
		"body": [
			"import React, { memo } from 'react'",
			"type ${1:${TM_FILENAME_BASE}}Props = {",
			"    $2",
			"};",
			"const ${1:${TM_FILENAME_BASE}} = memo(({$3}:${1:${TM_FILENAME_BASE}}Props) => {",
			"  return (",
			"    <div>",
			"      $4",
			"    </div>",
			"  );",
			"});",
			"export default ${1:${TM_FILENAME_BASE}};"
		],
		"description": "Creates a memoized stateless React component with PropTypes"
	}
}

```
