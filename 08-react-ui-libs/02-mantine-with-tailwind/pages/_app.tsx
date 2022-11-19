import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
	ButtonProps,
	ButtonStylesParams,
	TextStylesParams
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
const ButtonDefaultProps: Partial<ButtonProps> = {
	color: 'brand.3'
	// color: 'brand'
};

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
					theme={{
						colorScheme: colorScheme,
						fontFamily: 'Inter, sans-serif',
						colors: {
							brand: [
								'#f0f9ff',
								'#e0f2fe',
								'#bae6fd',
								'#38bdf8',
								'#0ea5e9',
								'#0284c7',
								'#0369a1',
								'#075985',
								'#0c4a6e'
							]
						},
						primaryShade: {
							dark: 4,
							light: 6
						},
						components: {
							Button: {
								// defaultProps: ButtonDefaultProps,
								styles: (theme, params: ButtonStylesParams) => ({
									root: {
										fontFamily: 'Poppins, sans-serif',
										backgroundColor:
											params.variant === 'filled'
												? theme.colorScheme === 'dark'
													? theme.colors.brand[5]
													: theme.colors.brand[3]
												: undefined,
										'&:hover': {
											backgroundColor:
												params.variant === 'filled'
													? theme.colorScheme === 'dark'
														? theme.colors.brand[5]
														: theme.colors.brand[3]
													: undefined
										}
									}
								})
							},
							Text: {
								styles: (theme, params: TextStylesParams) => ({
									root: {
										fontFamily: params.size === 'xl' ? 'Poppins, sans-serif' : undefined
									}
								}),
								classNames: { root: 'text-4xl' }
							}
						}
					}}
					withGlobalStyles
					withNormalizeCSS>
					<Component {...pageProps} />
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}

export default MyApp;
