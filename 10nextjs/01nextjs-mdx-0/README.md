
# Next.js + MDX

- [Next.js + MDX](#nextjs--mdx)
  - [Intro](#intro)
  - [Installation](#installation)
  - [Reading FrontMatter from MDX](#reading-frontmatter-from-mdx)

## Intro

## Installation

```bash
yarn add gray-matter date-fns next-mdx-remote rehype-slug rehype-highlight highlight.js
```

- [https://github.com/remarkjs/remark/blob/main/doc/plugins.md](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)

## Reading FrontMatter from MDX

- `front matter` : Everything in a book that comes before the story begins is its front matter. the pages of a book, such as the title page and contents, before the main text.

Create a mdx file containing the following `frontmatter` in the biginning of the file:

`blog-content\nextjs-mdx-v0.mdx`:

```md
---
title: 'My first Post'
date: 2019-01-01
tags: [mdx, next.js]
description: 'This is my first post on my new blog'
author: 'John Doe'
url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---

# Introduction to Next.js + MDX

lorem ipsum dolor sit amet..........
<!-- Rest of markdown content -->

```

Other's mdx will be following the same format.

`pages\index.tsx`:

```tsx
import { GetStaticProps } from 'next/types';
import { getMdxPath, getPostFiles } from '../libs/mdxLibs';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

type PostsType = {
 title: string;
 date: string;
 tags: string[];
 description: string;
 author: string;
 slug: string;
 url: string;
};

type PostListProps = {
 posts_metadata: PostsType[];
};

const className = {
 flexArea:
  'flex md:space-x-4 space-x-0 md:space-y-0 space-y-4  justify-center items-center  md:flex-nowrap flex-wrap ',
 cardContainer: 'shadow rounded-md shadow-zinc-700',
 cardBody: 'flex flex-col space-y-2 px-4 pb-4',
 chips: 'px-2 rounded-md outline outline-1 outline-gray-400 text-gray-400  cursor-pointer text-sm'
};

export default function Home({ posts_metadata }: PostListProps) {
 return (
  <div
   className='flex flex-col space-y-4 h-screen w-screen justify-center
     items-center bg-zinc-800 '>
   <div className={className.flexArea}>
    {posts_metadata.map((post) => (
     <div key={post.slug} className={className.cardContainer}>
      <div>
       <Image
        src={post.url}
        alt={post.title}
        width={300}
        height={150}
        objectFit='cover'
        className='rounded-t-md'
       />
      </div>
      <div className={className.cardBody}>
       <Link href={`blogs/${post.slug}`}>
        <h2 className='text-xl font-bold truncate text-white cursor-pointer'>
         {post.title}
        </h2>
       </Link>
       <p className=' text-gray-400'>{format(new Date(post.date), 'PPP')}</p>
       <div className='flex space-x-2'>
        {post.tags.map((tag) => (
         <Link href={`tags/${tag}`}>
          <p className={className.chips} key={tag}>
           {tag}
          </p>
         </Link>
        ))}
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}

export const getStaticProps: GetStaticProps = async () => {
 console.log('[getStaticProps]');

 const posts_metadata = getPostFiles.map((postFile) => {
  // read all the mdx files
  const content = fs.readFileSync(path.join(getMdxPath, postFile), 'utf-8');
  // parse the frontmatter
  const { data: postFrontMatterMetaData } = matter(content);
  return {
   ...postFrontMatterMetaData,
   slug: postFile.replace('.mdx', '')
  };
 });
 return {
  props: {
   posts_metadata: JSON.parse(JSON.stringify(posts_metadata))
  }
 };
};

```

<div align="center">
<img src="img/fmatter.jpg" alt="fmatter.jpg" width="800px">
</div>
