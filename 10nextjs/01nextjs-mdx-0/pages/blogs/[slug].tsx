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
import dynamic from 'next/dynamic';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { JSXElementConstructor, ReactElement } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
const HelloWorld = dynamic(() => import('../../components/MDXcomponent/HelloWorld'));
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import remarkGfm from 'remark-gfm';

const classNames = (...classes: any[]) => {
	return classes.filter(Boolean).join(' ');
};

type Props = {
	frontMatter: {
		[key: string]: any;
	};
	mdSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
};

type ProcessedCodeText = {
	codeString: string;
	language: string;
	filename: string;
	hl_lines: number[] | null;
	copy: boolean;
};

export const preToCodeBlock = (preProps: any): ProcessedCodeText => {
	const { filename, hl_lines, copy } = preProps;
	const meta = { filename, hl_lines, copy };

	const children = preProps.children as
		| ReactElement<any, string | JSXElementConstructor<any>>
		| undefined;
	// if (children && children.props) {

	const { children: codeString, className = '' } = children?.props;
	const matches = className.match(/language-(?<lang>.*)/);
	return {
		codeString: codeString.trim() as string,
		language:
			matches && matches.groups && matches.groups.lang
				? (matches.groups.lang as string)
				: ('' as string),
		...meta
	};
	// }
};
const customComponents = {
	HelloWorld
};

export interface HighlightedCodeTextProps {
	codeString: string;
	language: Language;
	highlightLine?: (index: number) => boolean;
}
const className = {
	// Line: ' table-row w-full',
	// LineNo: ' table-cell select-none pr-4',
	// LineContent: ' table-cell'
	Line: 'flex w-full',
	LineNo: 'select-none pr-4',
	LineContent: ''
};
const HighlightedCodeText = (props: any) => {
	const { codeString, language, filename, hl_lines, ...other } = preToCodeBlock(props);
	// console.log(hl_lines);
	return (
		<Highlight
			{...defaultProps}
			code={codeString}
			language={language as Language}
			theme={dracula}>
			{({ className: defaultClasses, style, tokens, getLineProps, getTokenProps }) => (
				<pre
					className={classNames(
						defaultClasses,
						'p-4 h-80 overflow-y-scroll text-left mt-4 scroll-p-4 font-code'
					)}
					style={style}>
					{tokens.map((line, i) => {
						const lineNo = i + 1;

						return (
							<div
								{...getLineProps({
									line,
									key: i,
									className: classNames(
										className.Line,
										hl_lines?.includes(lineNo) && 'bg-gradient-to-r from-indigo-700'
									)
								})}
								// className={ }
							>
								<span className={className.LineNo}>{lineNo}</span>
								{hl_lines?.includes(lineNo) && (
									<span className='w-2 pr-4 select-none'>+</span>
								)}
								{!hl_lines?.includes(lineNo) && <span className='w-2 pr-4 select-none' />}
								<span className={className.LineContent}>
									{line.map((token, key) => (
										<span {...getTokenProps({ token, key })} />
									))}
								</span>
							</div>
						);
					})}
				</pre>
			)}
		</Highlight>
	);
};

const components = {
	...customComponents,
	p: (props: any) => <p {...props} className='text-white leading-relaxed text-justify' />,
	h2: (props: any) => <h2 {...props} className='text-2xl font-bold text-white py-4' />,
	h3: (props: any) => <h3 {...props} className='text-xl font-bold text-white py-4' />,
	ul: (props: any) => <ul {...props} className='list-outside pl-10' />,
	li: (props: React.HTMLAttributes<HTMLLIElement>) => {
		const children = props.children as
			| ReactElement<any, string | JSXElementConstructor<any>>
			| ReactElement<any, string | JSXElementConstructor<any>>[]
			| undefined;

		if ((children as ReactElement)?.props) {
			return (
				<li className='flex items-center space-x-2'>
					<AiOutlineArrowRight className='text-green-400' />
					<a
						className=' text-indigo-200 hover:text-indigo-400'
						href={(children as ReactElement).props.href}>
						{(children as ReactElement).props.children}
					</a>
				</li>
			);
		} else {
			if (children && typeof children !== 'string') {
				const children_list = children as ReactElement<
					any,
					string | JSXElementConstructor<any>
				>[];
				return children_list.map((child, i) => {
					console.log(child.props);
					if (child.props?.href) {
						return (
							<li className='flex items-center space-x-2' key={i}>
								<AiOutlineArrowRight className='text-green-400' />
								<a
									className=' text-indigo-200 hover:text-indigo-400'
									href={child.props.href}>
									{child.props.children}
								</a>
							</li>
						);
					}
					return <li>{child}</li>;
				});
			}
		}
	},
	a: (props: any) => <a {...props} className='text-indigo-200 hover:text-indigo-400 ' />,
	pre: HighlightedCodeText,
	table: (props: any) => (
		<table {...props} className='border-collapse border border-slate-500 text-white' />
	),
	tr: (props: any) => <tr {...props} className='border border-slate-500' />,
	td: (props: any) => <td {...props} className='border border-slate-500' />
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
			{/*@ts-ignore */}
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

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.slug as string;
	const filePath = path.join(getMdxPath, `${slug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data: frontMatter, content } = matter(fileContent);
	const mdSource = await serialize(content, {
		mdxOptions: {
			remarkPlugins: [
				remarkMdxCodeMeta,
				remarkAutolinkHeadings,
				remarkSlug,
				remarkGfm
				// remarkSectionize
			]
			// rehypePlugins: []
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
