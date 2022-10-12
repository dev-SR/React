import Footer from './Footer';
import Header from './Header';

type Props = {
	children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div className='flex h-screen flex-col justify-between'>
			<Header />
			<main className='flex-shrink-0 flex-grow-0'>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
