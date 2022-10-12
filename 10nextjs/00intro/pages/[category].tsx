import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
type Props = {
	category: string;
};

const Category = ({ category }: Props) => {
	return (
		<div>
			<h1 className=' text-4xl'>{category}</h1>
			<Link href='/'>
				<span className='text-blue-500 underline cursor-pointer'>Home</span>
			</Link>
		</div>
	);
};

// Handle dynamic routes statically
export const getStaticPaths: GetStaticPaths = () => {
	// which pages to pre-render
	const routes = ['phones', 'laptops', 'books'];
	return {
		paths: routes.map((category) => ({ params: { category } })),
		fallback: true
	};
};

// tells how each route should be rendered
//  and what data should be passed to the page
export const getStaticProps: GetStaticProps<Props> = (context) => {
	const category = context.params?.['category'] as string;
	if (!category) {
		return {
			notFound: true
		};
	}
	console.log('Fetching Data in GetStaticProps.....');

	return {
		props: {
			category
		},
		revalidate: 5
	};
};
export default Category;
