import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getMdxPath, getPostFiles } from '../../libs/mdxLibs';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import dynamic from 'next/dynamic';
import React from 'react';
import { CodeSandbox, CodePen } from 'mdx-embed';

type Props = {
	frontMatter: {
		[key: string]: any;
	};
	mdSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
};

const HelloWorld = dynamic(() => import('../../components/MDXcomponent/HelloWorld'));

const customComponents = {
	HelloWorld
};
const components = {
	...customComponents,
	p: (props: any) => <p {...props} className='text-white leading-relaxed text-justify' />,
	h2: (props: any) => <h2 {...props} className='text-2xl font-bold text-white py-2' />,
	h3: (props: any) => <h3 {...props} className='text-xl font-bold text-white py-2' />,
	ul: (props: any) => <ul {...props} className='list-disc list-outside pl-10' />,
	li: (props: any) => <li {...props} className='text-white ' />,
	a: (props: any) => <a {...props} className='text-indigo-400' />,
	pre: (props: any) => (
		<pre
			{...props}
			className='rounded-md py-4 font-code bg-zinc-700 p-3 my-2 h-80 overflow-y-auto'
		/>
	),
	code: (props: any) => <code {...props} className='font-code text-gray-300' />
};

const SingleBlogPost = ({ frontMatter, mdSource }: Props) => {
	return (
		<div className=' bg-zinc-800  px-72  py-10 flex flex-col '>
			<Head>
				<title>{frontMatter.title}</title>
				<meta name='description' content={frontMatter.description} />
			</Head>
			<Link href={'/'}>
				<div className='flex item-center space-x-2 w-full py-2 cursor-pointer'>
					<div className='flex items-center justify-center'>
						<BiArrowBack className='h-4 w-4 text-gray-400' />
					</div>
					<p className='text-gray-400 text-center'>Home</p>
				</div>
			</Link>

			<div>
				<div className='relative w-full h-80'>
					<Image
						src={frontMatter.url}
						alt={frontMatter.title}
						objectFit='cover'
						className='rounded-t-md'
						layout='fill'
						sizes='100%'
					/>
					<h1 className='text-4xl text-white'>{frontMatter.title}</h1>
				</div>
			</div>
			{/* title */}
			<div>
				<h1 className='text-4xl text-white font-bold py-4'>{frontMatter.title}</h1>
			</div>
			<MDXRemote {...mdSource} components={components} />
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const postsPaths = getPostFiles.map((postFile) => {
		return {
			params: {
				slug: postFile.replace('.md', '')
			}
		};
	});

	return {
		paths: postsPaths,
		fallback: false
	};
};

type StaticProps = {
	slug: string;
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
	const slug = context.params?.slug as string;
	const filePath = path.join(getMdxPath, `${slug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data: frontMatter, content } = matter(fileContent);
	const mdSource = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeHighlight, rehypeSlug]
		}
	});

	return {
		props: {
			slug,
			mdSource,
			frontMatter: JSON.parse(JSON.stringify(frontMatter))
		}
	};
};

export default SingleBlogPost;
