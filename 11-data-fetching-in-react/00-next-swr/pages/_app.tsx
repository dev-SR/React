import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { SWRConfig } from 'swr';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
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
							refreshInterval: 5000
							// revalidateOnFocus: true
						}}> */}
					<Component {...pageProps} />
					{/* </SWRConfig> */}
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}
export default MyApp;
