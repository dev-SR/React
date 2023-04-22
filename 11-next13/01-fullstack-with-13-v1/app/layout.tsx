import './globals.css';

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};
import { Inter } from 'next/font/google';
import Providers from './query/provider';
import ThemeProviders from './ThemeProvider';
import NavBar from '~/components/nav/NavBar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${inter.className} w-screen`}>
				<ThemeProviders>
					<NavBar />
					<Providers>{children}</Providers>
				</ThemeProviders>
			</body>
		</html>
	);
}
