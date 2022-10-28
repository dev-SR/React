---
title: 'Learning Next.js + MDX stack; Generating static blog content with next.js'
date: 2019-01-01
tags: [mdx, next.js]
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus.'
author: 'John Doe'
url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---

<Container>
**Lorem ipsum dolor sit amet,** consectetur adipiscing elit, *sed do eiusmod tempor incididunt* ut labore et dolore magna aliqua. Ut enim ad minim veniam `console.log('Hello World')`, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Content

- [Content](#content)
- [Topic 1](#topic-1)
  - [Topic 1.1](#topic-11)
    - [Topic 1.1.1](#topic-111)
- [Strikethrough](#strikethrough)
- [Table](#table)
- [Topic 2](#topic-2)
- [Topic 3](#topic-3)

## Topic 1

Lorem ipsum dolor sit ametconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Topic 1.1

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam. Magnis dis parturient montes nascetur ridiculus mus mauris.

#### Topic 1.1.1

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam. Magnis dis parturient montes nascetur ridiculus mus mauris.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| Column1 | Column2 |
| ------- | ------- |
| Row1    |         |
| Row2    |         |

<HelloWorld text="Hello World"/>

<Expandable text="Hello World">

Children List:

- Item 1
- Item 2
  - Sub Item 1
  - Sub Item 2

Lorem ipsum dolor sit amet, **consectetur adipiscing elit**, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. *Diam quam nulla porttitor* massa id neque aliquam.

</Expandable>

```tsx filename="Test.tsx" highlight_lines={[1,2,3]} add_highlight_lines={[10,11,12]} remove_highlight_lines={[16,17,18]}
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

```

<Quiz quiz={
[
  {
   "question": "Using _, the student can solve problems in an unconventional way",
   "answer": "lateral thinking",
   "options": [
    "lateral thinking",
    "critical thinking",
    "creative thinking",
    "analytical thinking"
   ]
  },
  {
"question": "The student should not rely on_ to solve problems",
   "answer": "linear thinking",
   "options": [
    "linear thinking",
    "critical thinking",
    "creative thinking",
    "analytical thinking"
   ]
  }
 ]

}/>

## Topic 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam. Magnis dis parturient montes nascetur ridiculus mus mauris. Sit amet justo donec enim diam vulputate. Id eu nisl nunc mi ipsum faucibus vitae. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Eu mi bibendum neque egestas congue quisque egestas. Placerat duis ultricies lacus sed turpis tincidunt. Fermentum leo vel orci porta non pulvinar neque. Accumsan in nisl nisi scelerisque eu ultrices vitae. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Vel pharetra vel turpis nunc eget lorem dolor. Sed arcu non odio euismod lacinia at quis risus. Quam adipiscing vitae proin sagittis. Erat pellentesque adipiscing commodo elit at. Congue quisque egestas diam in arcu cursus euismod quis viverra. Mi eget mauris pharetra et ultrices. Gravida neque convallis a cras. Auctor eu augue ut lectus arcu bibendum. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec.

## Topic 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam quam nulla porttitor massa id neque aliquam. Magnis dis parturient montes nascetur ridiculus mus mauris. Sit amet justo donec enim diam vulputate. Id eu nisl nunc mi ipsum faucibus vitae. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Eu mi bibendum neque egestas congue quisque egestas. Placerat duis ultricies lacus sed turpis tincidunt. Fermentum leo vel orci porta non pulvinar neque. Accumsan in nisl nisi scelerisque eu ultrices vitae. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Vel pharetra vel turpis nunc eget lorem dolor. Sed arcu non odio euismod lacinia at quis risus. Quam adipiscing vitae proin sagittis. Erat pellentesque adipiscing commodo elit at. Congue quisque egestas diam in arcu cursus euismod quis viverra. Mi eget mauris pharetra et ultrices. Gravida neque convallis a cras. Auctor eu augue ut lectus arcu bibendum. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec.

</Container>