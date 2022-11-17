import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
// Register dynamic routes statically
export const getStaticPaths: GetStaticPaths = () => {
	// which pages to pre-render
	const routes = ['phones', 'laptops', 'books'];
	return {
		/*
			*path:[
			*	{ params: { id: 'phones' } }, - /category/phones
			*	{ params: { id: 'laptops' } }, - /category/laptops
			*	{ params: { id: 'books' } } - /category/books
			*]
			!	object with `id` key because of the file name [id].tsx
		*/
		paths: routes.map((id) => ({ params: { id } as Params })),
		fallback: true
	};
};
type Props = {
	data: any;
};
type Params = {
	id: string;
};

// tells how each route should be rendered
//  and what data should be passed to the page
export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
	console.log('Fetching Data in GetStaticProps.....');
	// Get the id from the context
	const { id } = context.params!;
	if (!id) {
		return {
			notFound: true
		};
	}
	// prepare the data for the page
	const propsData: Props = {
		data: id
	};

	return {
		props: {
			...propsData
		},
		revalidate: 5
	};
};

const Category = ({ data }: Props) => {
	return (
		<div>
			<h1 className=' text-4xl'>{JSON.stringify(data)}</h1>
			<Link href='/'>
				<span className='text-blue-500 underline cursor-pointer'>Home</span>
			</Link>
		</div>
	);
};
export default Category;
