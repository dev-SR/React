import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'highlight.js/styles/atom-one-dark.css';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
