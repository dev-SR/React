---
title: 'Chakra UI Customization'
date: 2019-01-01
tags: [chakra, react]
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus.'
author: 'John Doe'
url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


<Container>

## Content

- [Content](#content)
- [Adding Custom Fonts](#adding-custom-fonts)
- [Overriding Chakra Button](#overriding-chakra-button)

## Adding Custom Fonts


```css filename="globals.css" highlight_lines={[1]}
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx filename="theme.ts" highlight_lines={[9,10,11]}
import {
	extendTheme,
	ThemeOverride,
	theme as baseTheme,
} from '@chakra-ui/react';

export const theme: ThemeOverride = extendTheme(
	{
		fonts: {
			body: `'Inter', ${baseTheme.fonts.heading}`
		}
	}
);


```

## Overriding Chakra Button

We can override the



```tsx filename="Test.tsx" highlight_lines={[1,2,3]}


```


<CodeOutput align="center">
</CodeOutput>


</Container>

