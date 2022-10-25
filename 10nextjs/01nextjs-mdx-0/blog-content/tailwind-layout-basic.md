---
title: 'Basic Response Layout with Tailwind CSS'
date: 2019-01-01
tags: [mdx, next.js]
description: 'This is my first post on my new blog'
author: 'John Doe'
url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
---


<Container>

## Content

- [Content](#content)
- [Responsive Design](#responsive-design)

## Responsive Design

Tailwind provides five breakpoints by default, inspired by common device resolutions:


| Breakpoint prefix | Minimum width | CSS |
| ----------------- | ------------- | --- |
| `sm`              | 640px         |     |
| `md`              | 768px         |     |
| `lg`              | 1024px        |     |
| `xl`              | 1280px        |     |
| `2xl`             | 1536px        |     |




By default, Tailwind uses a **mobile-first breakpoint system**. What this means is that **unprefixed** utilities (like `uppercase`) *take effect on all screen sizes*, while **prefixed** utilities (like `md:uppercase`) only *take effect at the specified breakpoint and above*.

Therefore, don't use `sm:` to target **mobile devices**. Use **unprefixed utilities** to target mobile, and override them at larger breakpoints

```tsx
// This will `center` text on mobile, and `left align` it on screens 640px and wider
<div className="text-center sm:text-left">Demo Text</div>
```

</Container>

<CodeOutput>

 <div className="text-center sm:text-left text-white">Demo Text</div>

</CodeOutput>

<Container>

Let's take an example:

```tsx highlight_lines={[3,12]}
const usedClasses = {
 container: "max-w-md mx-auto md:max-w-2xl rounded-xl overflow-hidden",
 responsive_blockAtSmall_FlexFromMedium: "block md:flex",
 box1: "h-48 w-full md:w-48 ...",
 box2: "h-48 w-full ..."

}

const App = () =>{
 return (
  <div className={usedClasses.container}>
   <div className={usedClasses.responsive_blockAtSmall_FlexFromMedium}>
     <div className={usedClasses.box1} >
      Box 1
     </div>
     <div className={usedClasses.box2}>
      Box 2
     </div>
   </div>
  </div>
 )
}
```

</Container>

<CodeOutput>
<div className="max-w-md md:max-w-2xl mx-auto rounded-xl overflow-hidden">
  <div className="flex flex-col md:flex-row">
    <div className="h-48 w-full md:w-48 bg-indigo-800 " >
     <p className="text-white">Box 1</p>
    </div>
    <div className="h-48 w-full  bg-teal-600">
     <p className="text-white">Box 2</p>
    </div>
  </div>
</div>
</CodeOutput>

<Container>

Here’s how the example above works:

- The first `div` with `container` class is used as the placeholder. From `0px` to `768px` or the `md` break point the max width of the whole container is specified by `max-w-md` class that is `max-width: 28rem/* 448px */` and from `md` breakpoint the max width is defined `md:max-w-2xl` or `max-width: 42rem/* 672px */`. Additionally, `mx-auto` class denote card stays in the center, `rounded-xl` for card to be rounded, `overflow-hidden` to hide children to overflow.
- The second `div` with the `responsive_blockAtSmall_FlexFromMedium` class is used to make the card responsive. From `0px` to `768px` or the `md` break point the card is displayed as a `block` and from `md` breakpoint the card is displayed as a `flex`.
  - Optionally, we can just use `"md:flex"`. That means before `md` break point the card will be displayed as a `block` (by default) and from `md` breakpoint the card will be displayed as a `flex`.
  - Also, you can use `flex-col` class to make the card responsive vertically by using `"flex flex-col md:flex-row"`. This will make the card responsive vertically before `md` break point and responsive horizontally from `md` breakpoint.

</Container>
