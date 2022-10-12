import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import Seo from '../components/Seo';
type Props = {
	categories: string[];
};

const Home = () => {
	const categories = ['phones', 'laptops', 'books'];
	return (
		<div>
			<h1 className='text-4xl font-bold'>Welcome to Home Page!</h1>;
			<div className='flex flex-col'>
				{categories.map((category) => (
					<Link href={`/${category}`}>
						<span className='text-blue-500 underline cursor-pointer'>{category}</span>
					</Link>
				))}
			</div>
		</div>
	);
};

Home.getLayout = (Page: ReactElement) => {
	return <Layout>{Page}</Layout>;
};

export default Home;
