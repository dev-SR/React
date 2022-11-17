import '../styles/globals.css';
import Layout from '../components/layout';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
	getLayout?: (Page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// wrap the Component with the custom layout
	const getLayout = Component.getLayout ?? ((Page) => Page);
	return getLayout(<Component {...pageProps} />);
}

export default MyApp;
