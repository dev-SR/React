import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

function MyApp(props: AppProps) {
	const { Component, pageProps } = props;
	// https://mantine.dev/guides/dark-theme/
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'dark',
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
					<Component {...pageProps} />
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}
export default MyApp;
