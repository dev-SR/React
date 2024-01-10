This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Dynamic Route](#dynamic-route)

## Dynamic Route

- [https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [https://nextjs.org/docs/app/api-reference/file-conventions/page#props](https://nextjs.org/docs/app/api-reference/file-conventions/page#props)

props type def:

```typescript
export type ServerParamsProps = {
 // https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 params: { id: string };
 searchParams: { [key: string]: string | string[] | undefined };
};
```

`app\product\[id]\page.tsx`

```tsx
import { ServerParamsProps } from '@/lib/types/common';
export default function Product(params: ServerParamsProps) {
 return (
  <div>
     Product {params.params.id}
  </div>
 );
}
```
