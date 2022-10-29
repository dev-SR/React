import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
	if (typeof window === 'undefined') {
		return <></>;
	} else {
		return (
			// <ThemeProvider>
			<Component {...pageProps} />
			// </ThemeProvider>
		);
	}
}

export default MyApp;
