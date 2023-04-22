// app/providers.jsx
'use client';

import { ThemeProvider } from 'next-themes';
import { ReactChildren } from '~/types/common';

function ThemeProviders({ children }: ReactChildren) {
	return (
		<ThemeProvider defaultTheme='dark' attribute='class'>
			{children}
		</ThemeProvider>
	);
}
export default ThemeProviders;
