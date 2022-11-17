import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
// Handle dynamic routes statically
export const getStaticPaths: GetStaticPaths = () => {
	// which pages to pre-render
	const routes = [
		'post1',
		'post2',
		'react/post1',
		'react/post2',
		'next/post1',
		'next/post2',
		'next/post2',
		'ai/intro/post1',
		'ai/intro/post3',
		'ai/advanced/post1',
		'ai/advanced/post3'
	];
	return {
		paths: routes.map((slug) => ({ params: { slug: slug.split('/') } })),
		/*
			paths =  [
				{ params: { slug: ['blogs', 'post1'] } }, - /blogs/post1
				{ params: { slug: ['blogs', 'post2'] } }, - /blogs/post2
				{ params: { slug: ['blogs', 'react', 'post1'] } }, - /blogs/react/post1
			 ]

			! object with `slug` key because of the file name [...slug].tsx

		*/
		fallback: true
	};
};
type Props = {
	data: any;
};
type Params = {
	slug: string[];
};

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
	const fileContents: {
		filePath: string;
		title: string;
	}[] = [
		{
			filePath: 'post1',
			title: 'Post 1'
		},
		{
			filePath: 'post2',
			title: 'Post 2'
		},
		{
			filePath: path.join('react', 'post1.md'),
			title: 'react Post 1'
		},
		{
			filePath: path.join('next', 'post1.md'),
			title: 'react Post 1'
		},
		{
			filePath: path.join('ai', 'advanced', 'post1.md'),
			title: 'ai\\advanced\\post1'
		}
	];

	let filePath = '';
	const { slug } = context.params!;
	if (slug.length === 1) {
		const p = slug[0];
		filePath = path.join(`${p}.md`);
		console.log(filePath);
	} else if (slug.length > 1) {
		// upto last element | drop last element
		const dirs = slug.slice(0, slug.length - 1).join('/');
		const file = `${slug[slug.length - 1]}.md`;
		filePath = path.join(dirs, file);
	}

	if (!slug.length) {
		return {
			notFound: true
		};
	}
	console.log('Fetching Data in GetStaticProps.....');

	return {
		props: {
			data: fileContents.find((d) => d.filePath === filePath) || {}
		}
	};
};

const Blogs = ({ data }: Props) => {
	return (
		<div>
			<div>{JSON.stringify(data)}</div>
		</div>
	);
};

export default Blogs;
