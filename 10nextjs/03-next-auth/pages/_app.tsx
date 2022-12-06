import '../styles/globals.css';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Center, Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CustomAppProps } from '../types/CustomNextType';

const AuthGuard = ({ children }: { children: React.ReactNode }): any => {
	const { data, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === 'unauthenticated')
			if (router.pathname !== '/auth/signin') router.push('/auth/signin');
	}, [data, status]);
	if (status === 'loading') {
		return (
			<Center
				sx={{
					height: '100vh',
					width: '100vw'
				}}>
				<Loader size={'lg'} />
			</Center>
		);
	}
	if (status === 'authenticated') return <>{children}</>;
};

function MyApp(props: CustomAppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps }
	} = props;
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
					theme={{ colorScheme: colorScheme, fontFamily: 'Poppins, sans-serif' }}
					withGlobalStyles
					withNormalizeCSS>
					<SessionProvider session={session}>
						{Component.auth ? (
							<AuthGuard>
								<Component {...pageProps} />
							</AuthGuard>
						) : (
							<Component {...pageProps} />
						)}
					</SessionProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}
export default MyApp;
