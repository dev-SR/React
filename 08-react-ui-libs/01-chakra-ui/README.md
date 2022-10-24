# Chakra UI

## Setup

- Install dependencies: [https://chakra-ui.com/getting-started/vite-guide](https://chakra-ui.com/getting-started/vite-guide)


Provider Setup

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
```