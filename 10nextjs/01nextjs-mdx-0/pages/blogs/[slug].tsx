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
import Highlight, { defaultProps, Language, PrismTheme } from 'prism-react-renderer';
const HelloWorld = dynamic(() => import('../../components/MDXcomponent/HelloWorld'));
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import remarkGfm from 'remark-gfm';
import { myCustomTheme } from '../../libs/theme';
// import dracula from 'prism-react-renderer/themes/dracula';
import { HiArrowCircleRight, HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
// import remarkSectionize from 'remark-sectionize'; // not working
import { remarkSectionize } from '../../libs/remark-sectionize-fork';
import { useCopyToClipboard } from 'react-use';
import { IoCopyOutline } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

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
	highlight_lines?: number[];
	add_highlight_lines?: number[];
	remove_highlight_lines?: number[];
	copy: boolean;
};

export const preToCodeBlock = (preProps: any): ProcessedCodeText => {
	const { filename, highlight_lines, copy, add_highlight_lines, remove_highlight_lines } =
		preProps;
	const meta = { filename, highlight_lines, copy, add_highlight_lines, remove_highlight_lines };

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
const notify = () =>
	toast.success('Code copied to clipboard!', {
		icon: '👏',
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff'
		}
	});

export interface HighlightedCodeTextProps {
	codeString: string;
	language: Language;
	highlightLine?: (index: number) => boolean;
}
const className = {
	Line: 'flex w-full pl-2 items-center',
	LineNo: 'select-none text-gray-500',
	LineContent: 'pl-4',
	LineIndicator: 'w-10 flex items-center  justify-between'
};
const HighlightedCodeText = (props: any) => {
	const {
		codeString,
		language,
		filename,
		highlight_lines,
		add_highlight_lines,
		remove_highlight_lines,
		...other
	} = preToCodeBlock(props);
	// console.log(hl_lines);

	const [state, copyToClipboard] = useCopyToClipboard();

	return (
		<div className='flex flex-col w-full rounded-md my-4 shadow shadow-gray-600 '>
			<div className='flex h-12 bg-gray-900 items-center justify-end border-b-2 rounded-t-lg border-gray-600 px-4  space-x-4'>
				<p className=' text-gray-500 text-xl '>{filename}</p>
				<div>
					<Toaster />
					<IoCopyOutline
						className='text-gray-500 w-5 h-7 hover:text-indigo-500 cursor-pointer'
						onClick={() => {
							copyToClipboard(codeString);
							notify();
						}}
					/>
				</div>
			</div>
			<Highlight
				{...defaultProps}
				code={codeString}
				language={language as Language}
				theme={myCustomTheme as PrismTheme}>
				{({ className: defaultClasses, style, tokens, getLineProps, getTokenProps }) => (
					<pre
						className={classNames(
							defaultClasses,
							'py-4 h-96 overflow-y-scroll text-left scroll-smooth scroll-p-4 font-code min-w-max'
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
											highlight_lines?.includes(lineNo) &&
												'bg-sky-500/[.3] border-l-4 border-sky-300 pl-1',
											add_highlight_lines?.includes(lineNo) &&
												'bg-green-500/[.3] border-l-4 border-green-300 pl-1',
											remove_highlight_lines?.includes(lineNo) &&
												'bg-red-500/[.3] border-l-4 border-red-300 pl-1'
										)
									})}
									// className={ }
								>
									<div className={className.LineIndicator}>
										<span className={className.LineNo}>{lineNo}</span>
										{highlight_lines?.includes(lineNo) && (
											<HiArrowCircleRight className='text-sky-500' />
										)}
										{add_highlight_lines?.includes(lineNo) && (
											<HiPlusCircle className='text-green-500' />
										)}
										{remove_highlight_lines?.includes(lineNo) && (
											<HiMinusCircle className='text-red-500' />
										)}
									</div>

									{!highlight_lines?.includes(lineNo) && (
										<span className='w-2 pr-2 select-none' />
									)}
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
		</div>
	);
};

const components = {
	...customComponents,
	p: (props: any) => (
		<p {...props} className=' text-gray-400 text-lg leading-relaxed text-justify' />
	),
	strong: (props: any) => <strong {...props} className='text-gray-200 text-lg' />,
	em: (props: any) => <em {...props} className='text-gray-200 text-lg italic' />,
	h2: (props: any) => <h2 {...props} className='text-2xl font-bold text-white py-4' />,
	h3: (props: any) => <h3 {...props} className='text-xl font-bold text-white py-4' />,
	h4: (props: any) => <h4 {...props} className='text-lg font-bold text-white py-4' />,
	ul: (props: any) => <ul {...props} className='list-outside pl-10' />,
	li: (props: React.HTMLAttributes<HTMLLIElement>) => {
		const children = props.children as
			| ReactElement<any, string | JSXElementConstructor<any>>
			| ReactElement<any, string | JSXElementConstructor<any>>[]
			| undefined;
		// default list item
		if ((children as ReactElement)?.props) {
			return (
				<li className='flex items-center space-x-2'>
					<HiArrowCircleRight className='text-green-400' />
					<a
						className=' text-indigo-200 hover:text-indigo-400'
						href={(children as ReactElement).props.href}>
						{(children as ReactElement).props.children}
					</a>
				</li>
			);
		} else {
			// nested list
			if (children && typeof children !== 'string') {
				const children_list = children as ReactElement<
					any,
					string | JSXElementConstructor<any>
				>[];
				return children_list.map((child, i) => {
					// nested list parent
					if (child.props?.href) {
						return (
							<li className='flex items-center space-x-2' key={i}>
								<HiArrowCircleRight className='text-green-400' />
								<a
									className=' text-indigo-200 hover:text-indigo-400'
									href={child.props.href}>
									{child.props.children}
								</a>
							</li>
						);
					}
					// nested list child
					return (
						<li key={i} {...props}>
							{child}
						</li>
					);
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
				remarkGfm,
				remarkSectionize // for interactionOnScroll
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
