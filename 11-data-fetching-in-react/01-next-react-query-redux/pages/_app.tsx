import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { SWRConfig } from 'swr';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import axios from 'axios';
import { useState } from 'react';
// axios.defaults.baseURL = 'http://localhost:3000';
export const apiClient = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-type': 'application/json'
	}
});
// axios fetcher
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function MyApp(props: AppProps) {
	const { Component, pageProps } = props;
	// https://mantine.dev/guides/dark-theme/
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true
	});
	const toggleColorScheme = (value?: ColorScheme) => {
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	};
	const [queryClient] = useState(() => new QueryClient());

	return (
		<>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					theme={{ colorScheme: colorScheme, fontFamily: 'Inter, sans-serif' }}
					withGlobalStyles
					withNormalizeCSS>
					{/* <SWRConfig
						value={{
							fetcher,
							refreshInterval: 10000,
							revalidateOnFocus: true,
							fallback: pageProps.fallback
						}}> */}
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<Component {...pageProps} />
							<ReactQueryDevtools initialIsOpen={false} />
						</Hydrate>
					</QueryClientProvider>
					{/* </SWRConfig> */}
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}
export default MyApp;
